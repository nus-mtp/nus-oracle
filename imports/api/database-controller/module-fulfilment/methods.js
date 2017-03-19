import {ModuleFulfilments} from './moduleFulfilment';

/** This method handles the creation of new module fulfilment document. It takes in three arguments
  * @param {String} academicYear: academic year of moduleEquivalence
  * @param {String} moduleCode: module code
  * @param {[String]} moduleEquivalentList: list of module that will fulfill the same moduleCode.
  */
export const createNewModuleFulfilment = function createNewModuleFulfilment(academicYear, moduleCode, moduleEquivalentList) {
  const moduleMapping = {
    moduleEquivalent: moduleEquivalentList
  }

  let fulfilment = getModuleFulfilment(moduleCode);
  let docsID = '';

  if (Object.keys(fulfilment).length === 0) {
    mappingObject = {};
    mappingObject[academicYear] = moduleMapping;
    fulfilment = {
      moduleCode: moduleCode,
      moduleMapping: mappingObject
    }
    docsID = ModuleFulfilments.insert(fulfilment);
  }

  return docsID;
}

export const updateModuleMappingOfModuleFulfilment = function updateModuleMapping(academicYear, moduleCode, updatedModuleMapping){
  const moduleMapping = {
    moduleEquivalent: updatedModuleMapping
  }

  let fulfilment = getModuleFulfilment(moduleCode);
  let result = '';
  if(Object.keys(fulfilment).length === 0){
    return;
  } else {
    const mappingObject = fulfilment.moduleMapping;
    mappingObject[academicYear] = moduleMapping;
    result = ModuleFulfilments.update(fulfilment._id, {$set: {moduleMapping: mappingObject}});

    return result;
  }

}

export const getModuleFulfilment = function getModuleFulfilment(moduleCode) {
  let moduleFulfilment = ModuleFulfilments.findOne({moduleCode: moduleCode});

  if (!moduleFulfilment) {
    moduleFulfilment = {};
  }

  return moduleFulfilment;
}

export const removeOneModuleFulfilment = function removeOneModuleFulfilment(fulfilmentID) {
  ModuleFulfilments.remove(fulfilmentID);
}
