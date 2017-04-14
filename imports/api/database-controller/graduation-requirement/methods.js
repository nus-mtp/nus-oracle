import { check } from 'meteor/check';
import { GraduationRequirements } from './graduationRequirement';

const DEFAULT_MODULE_STATE = false;

/** This method handles the creation of new graduation requirement document. It takes in three arguments
  * @param {String} name: name of the graduation requirement
  * @param {[String]} listOfRequiredModule: list of module that will fulfill the gradRequirement.
  * @param {int} requirementMCs: total MCs required for the graduation requirement to be fulfilled
  */
export const createNewGradRequirement = function createNewGradRequirementGivenModuleList(name,  listOfRequiredModule, requirementMCs) {
  const moduleObject = createModuleListObject(listOfRequiredModule);

  return insertNewGradRequirementModuleData(name,moduleObject,requirementMCs);
}

/** This method insert the graduation requirement document to the Database
  * @param {String} name: name of the graduation requirement
  * @param {[Object]} moduleListObject: list of module that will fulfill the gradRequirement.
  * @param {int} requirementMCs: total MCs required for the graduation requirement to be fulfilled
  */
export const insertNewGradRequirementModuleData = function insertNewGraduationRequirement(cohortName,moduleListObject,requirementMCs) {
  const gradRequirement = {
    requirementName : cohortName,
    requirementModules: moduleListObject,
    requirementMCs: requirementMCs,
  };

  isValid = Match.test(gradRequirement, GraduationRequirements.simpleSchema());

  if(isValid){
    const newGradId = GraduationRequirements.insert(gradRequirement);
    return newGradId;
  }

  return {};
}

/** This method handles the creation of object list that is  going to be stored in the graduation Requirement Document
  * The module that is stored in the graduation requirement need to be present in the module database
  * @param {[String]} moduleList: list of module that is going to be stored
  * @return{object} object that is going to be stored under requirementModules attributes in the GraduationRequirement Document
  */
export const createModuleListObject = function createModuleListObject(moduleList) {
  // TO-DO: Check for module validity
  const moduleToBeStored = {};

  for (var i = 0; i< moduleList.length; i++){
    let module = moduleList[i];
    moduleToBeStored[module] = DEFAULT_MODULE_STATE;
  }
  return moduleToBeStored;
}

/**
  * Retrieves object containing requirement modules given array of graduationID
  * @param {[string]} array of unique ids of graduation requirement document
  * @return {Object}  object of mappedModuleName-boolean key-pair values
  */
export const getGradRequirementModules = function getGradRequirementModules(gradRequirementIDArray) {
  const gradRequirements = {};
  let tempGradDoc = {};
  for (var i=0; i<gradRequirementIDArray.length; i++) {
    tempGradDoc = GraduationRequirements.findOne(gradRequirementIDArray[i]);
    if (tempGradDoc)  {
      gradRequirements[tempGradDoc.requirementName] = tempGradDoc.requirementModules;
    }
  }
  return gradRequirements;
}
/**
  * Retrieves requirement modules given graduation id and name of requirement
  * @param {string}   unique id of graduation requirement document
  * @return {Object}  object of mappedModuleName-boolean key-pair values
  */
export const getGradRequirementMCs = function getGradRequirementMCs(gradRequirementIDArray) {
  const gradMCs = {};
  let tempGradDoc = {};
  for (var i=0; i<gradRequirementIDArray.length; i++) {
    tempGradDoc = GraduationRequirements.findOne(gradRequirementIDArray[i]);
    if (tempGradDoc)  {
      gradMCs[tempGradDoc.requirementName] = tempGradDoc.requirementMCs;
    }
  }
  return gradMCs;
}
/** Remove graduation rquirement given its ID
  * @param {string} ID of the graduation requirement that you want to delete/remove from the database
  */
export const removeOneGradRequirementModule = function removeGradRequirementModules(gradRequirementID)  {
  GraduationRequirements.remove(gradRequirementID);
}
