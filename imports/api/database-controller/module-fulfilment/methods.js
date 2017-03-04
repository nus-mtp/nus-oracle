import {ModuleFulfilments} from './moduleFulfilment';

/** This method handles the creation of new module fulfilment document. It takes in three arguments
  * @param {String} academicYear: academic year of moduleEquivalence
  * @param {String} moduleCode: module code
  * @param {[String]} moduleEquivalentList: list of module that will fulfill the same moduleCode.
  */
export const createNewModuleFulfilment = function createNewModuleFulfilment(academicYear, moduleCode, moduleEquivalentList) {
  const moduleMapping = {
    acadYear: academicYear,
    moduleEquivalent: moduleEquivalentList
  }

  let fulfilment = getModuleFulfilment(moduleCode);
  let docsUpdated = 0;

  if (Object.keys(fulfilment).length === 0) {
    mappingArray = []
    mappingArray.push(moduleMapping);
    fulfilment = {
      moduleCode: moduleCode,
      moduleMapping: mappingArray
    }
    docsUpdated = ModuleFulfilments.insert(fulfilment);
  } else {
    const mappingArray = fulfilment.moduleMapping;
    mappingArray.push(moduleMapping);
    docsUpdated = ModuleFulfilments.update(fulfilment._id, {$set: {moduleMapping: mappingArray}});
  }

  return docsUpdated;
}

export const getModuleFulfilment = function getModuleFulfilment(moduleCode) {
  let moduleFulfilment = ModuleFulfilments.findOne(moduleCode);

  if (!moduleFulfilment) {
    moduleFulfilment = {};
  }

  return moduleFulfilment;
}
