import { GraduationRequirements } from './graduationRequirement';

const DEFAULT_MODULE_STATE = false;

/** This method handles the creation of new graduation requirement document. It takes in two arguments
  * @param {String} name: name of the graduation requirement
  * @param {[String]} listOfRequiredModule: list of module that will fulfill the gradRequirement.
  */
export const createNewGradRequirement = function(name,  listOfRequiredModule) {
  const moduleObject = createModuleListObject(listOfRequiredModule);

  const gradRequirement = {
    requirementName : name,
    requirementModules: moduleObject,
  };

  return GraduationRequirements.insert(gradRequirement);
}

/** This method handles the creation of object list that is  going to be stored in the graduation Requirement Document
  * The module that is stored in the graduation requirement need to be present in the module database
  * @param {[String]} moduleList: list of module that is going to be stored
  */
export const createModuleListObject = function(moduleList) {
  // TO-DO: Check for module validity
  const moduleToBeStored = {};

  for (var i = 0; i< moduleList.length; i++){
    let module = moduleList[i];
    moduleToBeStored[module] = DEFAULT_MODULE_STATE;
  }
  return moduleToBeStored;
}

/**
  * Retrieves requirement modules given graduation id and name of requirement
  * @param {string}   unique id of graduation requirement document
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
