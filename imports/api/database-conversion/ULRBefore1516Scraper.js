//import method to check existence of academic cohort
import {AcademicCohort} from '../database-controller/academic-cohort/acadCohort';
// import method to update existing module fulfilment
import {ModuleFulfilments} from '../database-controller/module-fulfilment/moduleFulfilment';
import { createNewModuleFulfilment,
         updateModuleMappingOfModuleFulfilment } from '../database-controller/module-fulfilment/methods';
// import method to update academic year counting
import { increaseAcadYearByOne } from '../../utils/util';
import { searchByModuleCodeRegex } from '../database-controller/module/methods';

export const scrapeModuleMappingListingForBeforeULR1516 = function scrapeModuleMappingListingForBeforeULR1516(){
  const gemA = "GEM A";
  const gemB = "GEM B";
  const singaporeStudies = "Singapore Studies";
  const breadthOne = "Breadth One";
  const breadthTwo = "Breadth Two";

  const DEFAULT_ACAD_YEAR = "AY 2014/2015";

  const gemA_Array = [];
  const gemB_Array = [];
  const SS = [];
  const breadthArray = [];

  const isNotEmpty = function(string) {
    return string != '';
  }

  // find modules with moduleCode GEK and GEM and SSA in Modules
  const GEKModules = searchByModuleCodeRegex("GEK");
  const GEMModules = searchByModuleCodeRegex("GEM");

  const SSAModules = searchByModuleCodeRegex("SSA");
  const SSSModules = searchByModuleCodeRegex("SSS");
  const SSDModules = searchByModuleCodeRegex("SSD");
  const SSBModules = searchByModuleCodeRegex("SSB");
  const SSYModules = searchByModuleCodeRegex("SSY");

  // parse module code

    // if start with 5 or 9, go to GEM A
    for (var i=0; i<GEKModules.length; i++) {
      let code = GEKModules[i].moduleCode;
      if (GEKModules[i].moduleCode.includes("/")) {
        const modules = GEKModules[i].moduleCode.split(" / ");
        for (var j=0; j<modules.length;j++) {
          if (modules[j].includes("GEK")) {
            code = modules[j];
          }
        }
      }
      if (code[4] == "5") {
        //console.log("5 GEK: " + code);
        gemA_Array.push(code);
      } else if (code[4] == "0") {
        //console.log("0 GEK: " + code);
        gemB_Array.push(code);
      } else {
        //console.log("9 GEK: " + code);
        gemA_Array.push(code);
        gemB_Array.push(code);
      }
    }

    for (var i=0; i<GEMModules.length; i++) {
      let code = GEMModules[i].moduleCode;
      if (GEMModules[i].moduleCode.includes("/")) {
        const modules = GEMModules[i].moduleCode.split(" / ");
        for (var j=0; j<modules.length;j++) {
          if (modules[j].includes("GEM")) {
            code = modules[j];
          }
        }
      }
      if (code[4] == "5") {
        //console.log("5 GEM: " + code);
        gemA_Array.push(code);
      } else if (code[4] == "0") {
        //console.log("0 GEM: " + code);
        gemB_Array.push(code);
      } else {
        //console.log("9 GEM: " + code);
        gemA_Array.push(code);
        gemB_Array.push(code);
      }
    }

    // if SSA, go to Singapore Studies
    for (var i=0; i<SSAModules.length; i++) {
      let code = SSAModules[i].moduleCode;
      if (code.includes("/")) {
        const modules = code.split(" / ");
        for (var j=0; j<modules.length;j++) {
          if (modules[j].includes("SSA"))  {
            code = modules[j];
            break;
          }
        }
      }
      SS.push(code);
    }

    for (var i=0; i<SSSModules.length; i++) {
      let code = SSSModules[i].moduleCode;
      if (code.includes("/")) {
        const modules = code.split(" / ");
        for (var j=0; j<modules.length;j++) {
          if (modules[j].includes("SSS"))  {
            code = modules[j];
            break;
          }
        }
      }
      SS.push(code);
    }

    for (var i=0; i<SSDModules.length; i++) {
      let code = SSDModules[i].moduleCode;
      if (code.includes("/")) {
        const modules = code.split(" / ");
        for (var j=0; j<modules.length;j++) {
          if (modules[j].includes("SSD"))  {
            code = modules[j];
            break;
          }
        }
      }
      SS.push(code);
    }

    for (var i=0; i<SSBModules.length; i++) {
      let code = SSBModules[i].moduleCode;
      if (code.includes("/")) {
        const modules = code.split(" / ");
        for (var j=0; j<modules.length;j++) {
          if (modules[j].includes("SSB"))  {
            code = modules[j];
            break;
          }
        }
      }
      SS.push(code);
    }

    for (var i=0; i<SSYModules.length; i++) {
      let code = SSYModules[i].moduleCode;
      if (code.includes("/")) {
        const modules = code.split(" / ");
        for (var j=0; j<modules.length;j++) {
          if (modules[j].includes("SSB"))  {
            code = modules[j];
            break;
          }
        }
      }
      SS.push(code);
    }

  if (ModuleFulfilments.find({moduleCode: gemA}).count() ==0) {
    createNewModuleFulfilment(DEFAULT_ACAD_YEAR, gemA, gemA_Array);
  }
  if (ModuleFulfilments.find({moduleCode: gemB}).count() ==0) {
    createNewModuleFulfilment(DEFAULT_ACAD_YEAR, gemB, gemB_Array);
  }
  const moduleFulfilment = ModuleFulfilments.findOne({moduleCode: singaporeStudies});
  if (!moduleFulfilment.moduleMapping[DEFAULT_ACAD_YEAR]) {
    updateModuleMappingOfModuleFulfilment(DEFAULT_ACAD_YEAR, singaporeStudies, SS);
  }
  if (ModuleFulfilments.find({moduleCode: breadthOne}).count() ==0) {
    createNewModuleFulfilment(DEFAULT_ACAD_YEAR, breadthOne, breadthArray);
  }
  if (ModuleFulfilments.find({moduleCode: breadthTwo}).count() ==0) {
    createNewModuleFulfilment(DEFAULT_ACAD_YEAR, breadthTwo, breadthArray);
  }

  console.log(ModuleFulfilments.findOne({moduleCode:gemA}));
  console.log(ModuleFulfilments.findOne({moduleCode:gemB}));
  console.log(ModuleFulfilments.findOne({moduleCode:singaporeStudies}));
  console.log(JSON.stringify(ModuleFulfilments.findOne({moduleCode:breadthOne})));
  console.log(JSON.stringify(ModuleFulfilments.findOne({moduleCode:breadthTwo})));


  // Start from default academic year
  /*let currentAcademicYear = DEFAULT_ACAD_YEAR;

  // increment the academic year til you found the academic cohort that exists in the database
  while(AcademicCohort.find({cohortName: currentAcademicYear}).count() == 0){
    currentAcademicYear = increaseAcadYearByOne(currentAcademicYear);
  }
  // keep on adding the module mapping to the modulefulfilments collection til
  // the academic cohort does not exist
  // i.e. stop at the newest academic cohort
  while(AcademicCohort.find({cohortName: currentAcademicYear}).count() != 0){
    // check if the moduleMapping exist, if exist, update the mapping, if not create a new document
    if (ModuleFulfilments.find({moduleCode:gemA}).count() == 0){
      createNewModuleFulfilment(currentAcademicYear,humanCultureModuleFulfilmentDefault, humanCultureModule);
    } else {
      updateModuleMappingOfModuleFulfilment(currentAcademicYear,humanCultureModuleFulfilmentDefault, humanCultureModule);
    }

    if (ModuleFulfilments.find({moduleCode:gemB}).count() == 0){
      createNewModuleFulfilment(currentAcademicYear,reasoningModuleFulfilmentDefault, reasoningModule);
    } else {
      updateModuleMappingOfModuleFulfilment(currentAcademicYear,reasoningModuleFulfilmentDefault, reasoningModule);
    }

    if (ModuleFulfilments.find({moduleCode:singaporeStudies}).count() == 0){
      createNewModuleFulfilment(currentAcademicYear,singaporeModuleFulfilmentDefault, singaporeModule);
    } else {
      updateModuleMappingOfModuleFulfilment(currentAcademicYear,singaporeModuleFulfilmentDefault, singaporeModule);
    }

    currentAcademicYear = increaseAcadYearByOne(currentAcademicYear);
  }
  console.log(currentAcademicYear);

  console.log(ModuleFulfilments.findOne({moduleCode:questionModuleFulfilmentDefault}));
  console.log(ModuleFulfilments.findOne({moduleCode:thinkingModuleFulfilmentDefault}));
  console.log(ModuleFulfilments.findOne({moduleCode:singaporeModuleFulfilmentDefault}));
  console.log(ModuleFulfilments.findOne({moduleCode:humanCultureModuleFulfilmentDefault}));
  console.log(ModuleFulfilments.findOne({moduleCode:reasoningModuleFulfilmentDefault}));*/
}
