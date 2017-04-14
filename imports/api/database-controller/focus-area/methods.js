import { FocusArea } from './focusArea';
import { findModuleAvailability } from '../module/methods';

const DEFAULT_MODULE_STATE = false;

/** This Method handles the creation of new Focus Area Document
  *@param {String} name : Name of the Focus Area
  *@param {[String]} listOfPrimary: list of primary module in the focus area
  *@param {[String]} listOfFourThousands: list of level four thousand modules in the focus Area
  *@param {[String]} listOfNonPrimary: list of module that is related to the focus area but is not part of primary module
  *@return {String} empty string on fails or object ID of the new document on success
  *
  * In the process itself, the module will be filtered and check if the same modulecode actually
  * exists in the database. If not, the module will be removed from the lists.
  */
export const createNewFocusArea = function createNewFocusArea(name, listOfPrimary, listOfPrimaryFourThousands, listOfFourThousands, listOfNonPrimary){
  // Uncomment the following lines to do module existence check
  //checkedListPrimary = consolidateModuleArrayValidity(listOfPrimary);
  //checkedListFourThousands = consolidateModuleArrayValidity(listOfFourThousands);
  //checkedListNonPrimary = consolidateModuleArrayValidity(listOfNonPrimary);

  primaryToBeStored = createModuleListObject(listOfPrimary);
  primaryFourThousandsToBeStored = createModuleListObject(listOfPrimaryFourThousands);
  fourThousandsToBeStored = createModuleListObject(listOfFourThousands);
  nonPrimaryToBeStored = createModuleListObject(listOfNonPrimary);

  const newFocusAreaDocument = {
    name : name,
    moduleListPrimary : primaryToBeStored,
    moduleListPrimaryFourThousands: primaryFourThousandsToBeStored,
    moduleListFourThousands: fourThousandsToBeStored,
    moduleListElectives: nonPrimaryToBeStored
  }
  let result = '';

  isValid = Match.test(newFocusAreaDocument, FocusArea.simpleSchema());

  if(isValid){
    result = FocusArea.insert(newFocusAreaDocument);
    return result;
  }

  return result;
}

export const removeFocusArea = function removeFocusArea(focusAreaIDs)  {
  for (var i=0; i < focusAreaIDs.length; i++) {
    FocusArea.remove(focusAreaIDs[i]);
  }
}

/** This method handles the checking of the list of module validity.
  * For a module to be valid, it needs to be inside the module database
  * @param {[String]} moduleArray: array of module code that is going to be included in the focus area document
  */
export const consolidateModuleArrayValidity = function CheckValidityForListOfModule(moduleArray) {
  let checkedModuleArray = [];
  for (var i = 0; i < moduleArray.length; i++ ){
    const isValidModule = findModuleAvailability(moduleArray[i]);

    if(!isValidModule){
      console.log('The following module cannot be found in database: ' + moduleArray[i]);
    } else {
      checkedModuleArray.push(moduleArray[i]);
    }
  }

  return checkedModuleArray;
}

/** This method handles the creation of object list that is  going to be stored in the Focus Area Document
  * The module that is stored in the graduation requirement need to be present in the module database
  * @param {[String]} moduleList: list of module that is going to be stored
  * @return{object} object that is going to be stored under Focus Area Document
  */
export const createModuleListObject = function createNewListOfModuleObject(moduleList) {
  // TO-DO: Check for module validity
  const moduleToBeStored = {};

  for (var i=0; i < moduleList.length; i++){
    let module = moduleList[i];
    moduleToBeStored[module] = DEFAULT_MODULE_STATE;
  }

  return moduleToBeStored;
}
/** This method return all the focus area requirements from array of focus area ID that is supplied to the method
* @param {[String]} focusRequirementIDArray: array of focus area ID
* @return {object} object containing all focus area requirements from the supplied focus Area ID arrays.
*/
export const getFocusAreaRequirement = function getFocusAreaRequirement(getFocusRequirementIDArray)  {
  const allfocusAreaRequirements = {
    focusAreaPrimaryModules: {},
    focusArea4KModules: {},
    focusAreaNonPrimaryModules: {}
  };

  let tempFocusAreaDoc = {};
  for (var i=0; i<getFocusRequirementIDArray.length; i++) {
    tempFocusAreaDoc = FocusArea.findOne(getFocusRequirementIDArray[i]);
    if (tempFocusAreaDoc)  {
      allfocusAreaRequirements.focusAreaPrimaryModules[tempFocusAreaDoc.name] = tempFocusAreaDoc.moduleListPrimary;
      allfocusAreaRequirements.focusArea4KModules[tempFocusAreaDoc.name] = tempFocusAreaDoc.moduleListPrimaryFourThousands;
      allfocusAreaRequirements.focusAreaNonPrimaryModules[tempFocusAreaDoc.name] = tempFocusAreaDoc.moduleListElectives;
    }
  }

  return allfocusAreaRequirements;
}

/** This method return all the focus area primary modules requirements information from array of focus area ID that is supplied to the method
* @param {[String]} focusRequirementIDArray: array of focus area ID
* @return {object} object containing all focus area primary requirements from the supplied focus Area ID arrays.
*
* Note: primary requirement does not involve 4k requirement.
*/
export const getFocusAreaPrimaryRequirement = function getFocusAreaPrimaryRequirement(getFocusRequirementIDArray) {
  const focusAreaPrimaryRequirements = {};
  let tempFocusAreaPrimaryDoc = {};
  for (var i=0; i<getFocusRequirementIDArray.length; i++) {
    tempFocusAreaPrimaryDoc = FocusArea.findOne(getFocusRequirementIDArray[i]);
    if (tempFocusAreaPrimaryDoc)  {
      focusAreaPrimaryRequirements[tempFocusAreaPrimaryDoc.name] = tempFocusAreaPrimaryDoc.moduleListPrimary;
    }
  }
  return focusAreaPrimaryRequirements;
}

/** This method return all level 4000 and above modules that are listed in the focus area from array of focus area ID that is supplied to the method
* @param {[String]} focusRequirementIDArray: array of focus area ID
* @return {object} object containing all level 4000 modules and above from the supplied focus Area ID arrays.
*
*/
export const getFocusArea4KRequirement = function getFocusArea4KRequirement(getFocusRequirementIDArray) {
  const focusArea4KRequirements = {};
  let tempFocusArea4KDoc = {};
  for (var i=0; i<getFocusRequirementIDArray.length; i++) {
    tempFocusArea4KDoc = FocusArea.findOne(getFocusRequirementIDArray[i]);
    if (tempFocusArea4KDoc)  {
      focusArea4KRequirements[tempFocusArea4KDoc.name] = tempFocusArea4KDoc.moduleListFourThousands;
    }
  }
  return focusArea4KRequirements;
}

/** This method return level 4000 and above  primary modules that are listed in the focus area from array of focus area ID that is supplied to the method
* @param {[String]} focusRequirementIDArray: array of focus area ID
* @return {object} object containing all level 4000 primary modules and above from the supplied focus Area ID arrays.
*
*/
export const getFocusAreaPrimary4KRequirement = function getFocusAreaPrimary4KRequirement(getFocusRequirementIDArray) {
  const focusAreaPrimary4KRequirements = {};
  let tempFocusPrimaryArea4KDoc = {};
  for (var i=0; i<getFocusRequirementIDArray.length; i++) {
    tempFocusAreaPrimary4KDoc = FocusArea.findOne(getFocusRequirementIDArray[i]);
    if (tempFocusAreaPrimary4KDoc)  {
      focusAreaPrimary4KRequirements[tempFocusAreaPrimary4KDoc.name] = tempFocusAreaPrimary4KDoc.moduleListPrimaryFourThousands;
    }
  }
  return focusAreaPrimary4KRequirements;
}
/** This method return all electives modules that are listed in the focus area from array of focus area ID that is supplied to the method
* @param {[String]} focusRequirementIDArray: array of focus area ID
* @return {object} object containing all electives module from focus areas which ids are supplied as parameter. 
*
*/
export const getFocusAreaNonPrimaryRequirement = function getFocusAreaNonPrimaryRequirement(getFocusRequirementIDArray) {
  const focusAreaNonPrimaryRequirements = {};
  let tempFocusAreaNonPrimaryDoc = {};
  for (var i=0; i<getFocusRequirementIDArray.length; i++) {
    tempFocusAreaNonPrimaryDoc = FocusArea.findOne(getFocusRequirementIDArray[i]);
    if (tempFocusAreaNonPrimaryDoc)  {
      focusAreaNonPrimaryRequirements[tempFocusAreaNonPrimaryDoc.name] = tempFocusAreaNonPrimaryDoc.moduleListElectives;
    }
  }
  return focusAreaNonPrimaryRequirements;
}
/** This method returns the ID of the queried Focus Area
  * It is safe to assume that there will only be one focus area for each name,
  * i.e. Focus Area name will always be unique.
  * @param {string} name of the focus area that you want to retrieve
  * @param {string} empty string on fail or object id of the relevant focus area on success.
  */
export const getFocusAreaIDByName = function searchFocusAreaByName(focusAreaName){
  let resultCursor = FocusArea.find({name: focusAreaName});

  if(resultCursor.count() > 0){
    let result = resultCursor.fetch()[0];
    return result["_id"];
  }

  return '';
}
