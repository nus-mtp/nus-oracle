import { FocusArea } from './focusArea';
import { searchByModuleCode } from '../module/methods';
// Insert function describtion
export const createNewFocusArea = function(name, listOfPrimary, listOfFourThousands, listOfNonPrimary){
  checkedListPrimary = consolidateModuleArrayValidity(listOfPrimary);
  checkedListFourThousands = consolidateModuleArrayValidity(listOfFourThousands);
  checkedListNonPrimary = consolidateModuleArrayValidity(listOfNonPrimary);

  const newFocusAreaObject = {
    name : name,
    moduleListPrimary : checkedListPrimary,
    moduleListFourThousands: checkedListFourThousands,
    moduleListNonPrimary: checkedListNonPrimary
  }

  FocusArea.insert(newFocusAreaObject);
}

export const consolidateModuleCodeValidity = function(moduleCode) {
  const validationResult = searchByModuleCode(moduleCode);

  if (validationResult === {}){ return false;}
  return true;
}

export const consolidateModuleArrayValidity = function(moduleArray) {
  for (moduleCode in moduleArray){
    const isValidModule = consolidateModuleCodeValidity(module);

    if(!isValidModule){
      console.log('The following module cannot be found in database: ' + module)
    }
  }
}
