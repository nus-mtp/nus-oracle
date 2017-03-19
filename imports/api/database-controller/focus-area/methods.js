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
export const createNewFocusArea = function createNewFocusArea(name, listOfPrimary, listOfFourThousands, listOfNonPrimary){
  //checkedListPrimary = consolidateModuleArrayValidity(listOfPrimary);
  //checkedListFourThousands = consolidateModuleArrayValidity(listOfFourThousands);
  //checkedListNonPrimary = consolidateModuleArrayValidity(listOfNonPrimary);

  primaryToBeStored = createModuleListObject(listOfPrimary);
  fourThousandsToBeStored = createModuleListObject(listOfFourThousands);
  nonPrimaryToBeStored = createModuleListObject(listOfNonPrimary);

  const newFocusAreaDocument = {
    name : name,
    moduleListPrimary : primaryToBeStored,
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

/** This method handles the checking of the list of module validity.
  * For a module to be valid, it needs to be inside the module database
  * @param {[String]} moduleArray: array of module code that is going to be included in the focus area document
  */
export const consolidateModuleArrayValidity = function CheckValidityForListOfModule(moduleArray) {
  for (moduleCode in moduleArray){
    const isValidModule = findModuleAvailability(moduleCode);

    if(!isValidModule){
      console.log('The following module cannot be found in database: ' + moduleCode);
      moduleIndex  = moduleArray.indexOf(moduleCode);
      moduleArray.splice(moduleIndex,1);
    }
  }
}

export const createModuleListObject = function createNewListOfModuleObject(moduleList) {
  // TO-DO: Check for module validity
  const moduleToBeStored = {};

  for (var i=0; i < moduleList.length; i++){
    let module = moduleList[i];
    moduleToBeStored[module] = DEFAULT_MODULE_STATE;
  }

  return moduleToBeStored;
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
