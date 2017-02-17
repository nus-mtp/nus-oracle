import { Meteor } from 'meteor/meteor';

// temporary schema for storing module and term whereby the module is offered

export const Modules = new Meteor.Collection('module');

// this function should only be called if there is no module collection yet to
// be established.
export const createModuleCollection = function createModuleCollection() {
  Modules.schema = new SimpleSchema(
    {
      moduleCode: {
        type: String,
      },
      moduleName: {
        type: String,
      },
      moduleDescription: {
        type: String,
      },
      modulePrerequisite: {
        type: String,
      },
      moduleCorequisite: {
        type: String,
        optional: true,
      },
      modulePreclusion: {
        type: String,
      },
      moduleMC: {
        type: Number,
      },
      termOffered: {
        type: [Object],
        blackbox: true,
      },
    },
  );
};

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

  if (searchResult.length === 0) {
    return {};
  }

  const returnPackage = {
    moduleCode: searchResult.moduleCode,
    moduleID: searchResult._id,
  };

  return returnPackage;
};

// This method finds all modules with matching substring
export const searchByModuleCodeRegex = function searchByModuleCodeRegex(string) {
  // search by module code
  const searchResult = Modules.find({ moduleCode: { $regex: string, $options: 'i' } }).fetch();
  const resultArray = [];

  // wrap into module name and id
  for (var i=0; i<searchResult.length; i++) {
    const returnPackage = {
      moduleCode: searchResult[i].moduleCode,
      moduleID: searchResult[i]._id,
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

export const removeOneModule = function removeOneModule(moduleID)  {
  Modules.remove(moduleID);
};

// insert one new module collection to the Module Database
export const insertToModuleCollection = function insertToModuleCollection(object) {
  Modules.insert(object);
  // TO DO:return success/ failure message
};

export const retrieveAllModule = function findAll() {
  return Modules.find({}).fetch();
};

export const retrieveModuleReference = function retrieveModuleCollectionReference() {
  if (!isExistModuleCollection){
    return Modules;
  }

  createModuleCollection();
  return Modules;
};
