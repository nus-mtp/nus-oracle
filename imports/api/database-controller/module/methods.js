import { Modules } from './module';
import { Meteor } from 'meteor/meteor';

// The following component handles the available method of interaction with the Module Collections
export const createNewModuleDocument = function createModuleDocument() {
}

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
  if (!searchResult) {
    return {};
  }

  const returnPackage = {
    moduleCode: searchResult.moduleCode,
    moduleMC: searchResult.moduleMC,
    moduleDescription: searchResult.moduleDescription
  };

  return returnPackage;
};

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
  if (searchResult.length == 0) {
    return true;
  }
  return false;
};

export const removeAllModule = function removeAllModule() {
  return Modules.remove({});
};

// insert one new module collection to the Module Database
export const insertToModuleCollection = function insertToModuleCollection(object) {
  Modules.insert(object);
  // TO DO:return success/ failure message
};

export const retrieveAllModule = function findAll() {
  console.log("retrieve all: ");
  let modulesRetrieved = Modules.find({}).fetch();
  console.log(modulesRetrieved[0], modulesRetrieved[1], modulesRetrieved[2]);
  return modulesRetrieved;
};
