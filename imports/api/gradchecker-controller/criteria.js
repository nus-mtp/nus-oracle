import { searchByModuleCode } from '../database-controller/module/methods';
import { getModuleFulfilment } from '../database-controller/module-fulfilment/methods';
import { getStudentAcademicCohort } from '../database-controller/student/methods.js';

/**
* Creates a graduation criteria given the following parameters for the requirement
*  @param {string}  name of the planner
*  @param {object}  a list of all modules added in the planner
*                   modulesCompleted[0]: modules in planner
*                   modulesCompleted[1]: exempted modules in planner
*                   modulesCompleted[2]: waived modules in planner
*  @param {number}  number of MC required to fulfill this criteria
*  @param {boolean}  whether MC must be met for criteria to be fulfilled
*  @param {Array}  a list of all sub-requirements for critera to be fulfilled in the format of [n, {criteria 1}, {criteria2} ...]
*  @param {toUE}  whether difference in MC required and fulfilled MC is factored into UE

*  @param {object}  or simply construct Criteria from Object provided here
*
*/

export function Criteria(object, modulesCompleted){
  var subrequirements;
  if(object){ // construct Critera from Object provided
    this.name = object.name;
    this.requiredMC = object.requiredMC;
    this.isStrictMC = object.isStrictMC;

    if(object.subreq){
      subrequirements = [object.subreq[0]];
      for(var i=1; i<object.subreq.length; i++){
        subrequirements.push(new Criteria(object.subreq[i], modulesCompleted));
      }
    }
    if(subrequirements)
      this.subreq = subrequirements;

    this.modulesCompleted = modulesCompleted;
    this.fulfilledMC = 0;
    this.toUE = object.toUE;
  }

  this.isModule = function() {
    return (this.subreq === undefined || this.subreq === null || this.subreq.length == 0);
  }

  this.isSingular = function(){
    // checks if object is a list
    if(Object.prototype.toString.call(this.subreq) === '[object Array]' && this.subreq.length == 1){
      this.subreq = this.subreq[0];
      return true;
    }
    return !(Object.prototype.toString.call(this.subreq) === '[object Array]');
  }

  // to be performed ONLY AFTER subreq check
  this.checkMC = function(){
    if(this.isStrictMC)
      return (this.fulfilledMC >= this.requiredMC);
    else
      return true;
  }

  this.isFulfilled = function(){

    //  if criteria is a single module check if it is in planner
    if(this.isModule()){
      if(_.contains(modulesCompleted[0], this.name)){
        // assign MC value only if found in planner
        this.fulfilledMC = searchByModuleCode(this.name).moduleMC;
        return true && this.checkMC();
      }
      // check exempted module list (add MC accordingly)
      if(_.contains(modulesCompleted[1], this.name)){
        this.fulfilledMC = searchByModuleCode(this.name).moduleMC;
        return true && this.checkMC();
      }
      // check waived module list (move MC to UE)
      if(_.contains(modulesCompleted[2], this.name)){
        this.fulfilledMC = 0;
        this.toUE = true;
        this.requiredMC = searchByModuleCode(this.name).moduleMC;
        return true && this.checkMC();
      }

      // //else loop through all equivalent modules

      // else {
      //   for(equivalent in getModuleFulfilment(this.name).moduleMapping[getStudentAcademicCohort()].moduleEquivalent){
      //     if(_.contains(modulesCompleted, equivalent)){
      //       this.fulfilledMC = searchByModuleCode(equivalent).moduleMC;
      //       return this.checkMC();
      //     }
      //   }
      // }

      // console.log(this.name);
      // console.log(JSON.stringify(getModuleFulfilment(this.name)));
      // console.log(JSON.stringify(getModuleFulfilment("CS1010")));

      return false;
    }

    // if subreq is singular check if it is fulfilled
    if(this.isSingular()){
      if(this.subreq.isFulfilled()){
        this.fulfilledMC = this.subreq.fulfilledMC;
        return true && this.checkMC();
      }
      this.fulfilledMC = this.subreq.fulfilledMC;
      return false;
    }

    // if subreq is a list of criterias check every one depending on operator in subreq[0]
    else {
      switch(this.subreq[0]){
        case 0: // AND operator
          value = true;
          for(var i=1; i<this.subreq.length; i++){
            value &= this.subreq[i].isFulfilled();
            this.fulfilledMC += this.subreq[i].fulfilledMC;
          }
          return value && this.checkMC();
          break;

        case 1: // OR operator
          value = false;
          for(var i=1; i<this.subreq.length; i++){
            value |= this.subreq[i].isFulfilled();
            this.fulfilledMC += this.subreq[i].fulfilledMC;
          }
          return value && this.checkMC();
          break;

        default: // ANY 'n' operator
          count = 0;
          for(var i=1; i<this.subreq.length; i++){
            if(this.subreq[i].isFulfilled())
              count++;
            this.fulfilledMC += this.subreq[i].fulfilledMC;
          }
          return (count >= this.subreq[0]) && this.checkMC();
          break;
      }
    }
  }

  // Gets all MC in criteria and it's subrequirements to be added to/deducted from UE
  this.getMCforUE = function(){
    if(this.isModule()){
      return (this.toUE ? this.requiredMC - this.fulfilledMC : 0);
    }
    else if(this.isSingular()){
      return (this.toUE ? this.requiredMC - this.fulfilledMC + this.subreq.getMCforUE() : this.subreq.getMCforUE());
    }
    else { // is list of sub requirements
      sum = 0;
      for(i=1; i<this.subreq.length; i++){
        sum += this.subreq[i].getMCforUE();
      }
      return (this.toUE ? this.requiredMC - this.fulfilledMC + sum : sum);
    }
  }
}
