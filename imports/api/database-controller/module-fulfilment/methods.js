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
  } else {
    const mappingObject = fulfilment.moduleMapping;
    mappingObject[academicYear] = moduleMapping;
    ModuleFulfilments.update(fulfilment._id, {$set: {moduleMapping: mappingObject}});
    docsID = fulfilment._id;
  }

  return docsID;
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
