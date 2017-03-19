import {ModuleFulfilments} from './moduleFulfilment';

/** This method handles the creation of new module fulfilment document. It takes in three arguments
  * @param {String} academicYear: academic year of moduleEquivalence
  * @param {String} moduleCode: module code
  * @param {[String]} moduleEquivalentList: list of module that will fulfill the same moduleCode.
  * @return {String} newID of the newly created documents or empty string.
  */
export const createNewModuleFulfilment = function createNewModuleFulfilment(academicYear, moduleCode, moduleEquivalentList) {
  const moduleMapping = {
    moduleEquivalent: moduleEquivalentList
  }

  let fulfilment = getModuleFulfilment(moduleCode);
  let docsID = '';

  if (Object.keys(fulfilment).length > 0) {
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
/** This method handles the updating of the module mapping for the specified module fulfilment document. It takes in three arguments
  * @param {String} academicYear: academic year of moduleEquivalence
  * @param {String} moduleCode: module code
  * @param {[String]} moduleEquivalentList: list of module that will fulfill the same moduleCode.
  */
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

  }

}
/** Return module fulfilment that fits the queried module code
  * @param {string} moduleCode of module fulfilment that you want to find
  * @return {object} empty object or object containing moduleFulfilment information
  */
export const getModuleFulfilment = function getModuleFulfilment(moduleCode) {
  let moduleFulfilment = ModuleFulfilments.findOne({moduleCode: moduleCode});

  if (!moduleFulfilment) {
    moduleFulfilment = {};
  }

  return moduleFulfilment;
}

/** remove module fulfilment with correspoinding ID(if exists) from the document
  * @param {string} ID of the moduleFulfilment document that is going to be removed from collection
  */
export const removeOneModuleFulfilment = function removeOneModuleFulfilment(fulfilmentID) {
  ModuleFulfilments.remove(fulfilmentID);
}
