import { Modules } from './module';
import { Meteor } from 'meteor/meteor';

// The following component handles the available method of interaction with the Module Collections
export const addNewTermFromModuleDocument = function updateTermModule(moduleCode, newTermOffered) {
  const a = searchByModuleCode(moduleCode);
  const termArray = a.termOffered;

  termArray.push(newTermOffered);
  Modules.update({moduleCode: moduleCode},{$set: {termOffered: termArray}});
}

// to check if the reference to module collection has been made
export const isExistModuleCollection = function checkForCollection() {
  if (typeof Modules != 'undefined'){
    return true;
  }

  return false;
}

// This method try to find module in the collection by the moduleCode
export const searchByModuleCode = function retrieveMod(modCode) {
  const searchResult = Modules.findOne({ moduleCode: modCode });
  const resultArray = [];

  if (!searchResult) {
    return {};
  }

  for (var i=0; i<searchResult.length; i++) {

  }

  const returnPackage = {
    moduleCode: searchResult.moduleCode,
    moduleMC: searchResult.moduleMC,
    moduleDescription: searchResult.moduleDescription
  };

  return returnPackage;
};

export const searchByModuleCodeRegex = function searchByModuleCodeRegex (modCode) {
  const searchResult = Modules.find( {moduleCode: { $regex: modCode, $options: 'i' }} ).fetch();
  if (!searchResult) {
    return {};
  }

  return searchResult;
};

// module is available in database
export const findModuleAvailability = function searchForModule( modCode ) {
  const resultCursor = Modules.find({ moduleCode: modCode });

  if(resultCursor.count() === 0){
    return false;
  }

  return true;
}

// This method finds all module codes with matching substring
export const searchByModuleCodeAndNameRegex = function searchByModuleCodeAndNameRegex(string) {
  // search by module code and name
  const searchResult =
    Modules.find({$or: [
                        { moduleCode: { $regex: string, $options: 'i' } },
                        { moduleName: { $regex: string, $options: 'i' } }
                       ]
                 }).fetch();

  // wrap into module code and name
  const resultArray = [];

  for (var i=0; i<searchResult.length; i++) {
    const returnPackage = {
      moduleCodeAndName: searchResult[i].moduleCode + " " + searchResult[i].moduleName,
      moduleCode: searchResult[i].moduleCode,
      moduleName: searchResult[i].moduleName
    };
    resultArray.push(returnPackage);
  }

  return resultArray;
};

// check if the collection of module is empty
export const isEmptyModuleCollection = function checkForAnyContent() {
  const searchResult = Modules.find({}).fetch();
  if (searchResult.length === 0) {
    return true;
  }
  return false;
};

export const removeAllModule = function removeAllModule() {
  return Modules.remove({});
};

// insert one new module document to the Module Database
export const insertToModuleCollection = function insertToModuleCollection(object) {
  // compare the object to the schema

  return Modules.insert(object);
  // TO DO:return success/ failure message
};

// Retrieves ALL modules from the database
export const retrieveAllModule = function findAll() {
  return Modules.find({}).fetch();
};

/**
 * Wrapper function to wait to retrieve all modules from database before
 * passing the result into a callback.
 *
 * @param  {[func]} doneCallback    Function that runs once the async call
 *                                  to retrieve from DB is done.
 */
export const waitToRetrieveAllModules = function waitToRetrieveAllModules(doneCallback) {
  doneCallback(Modules.find({}).fetch());
}
