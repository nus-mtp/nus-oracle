import { Meteor } from 'meteor/meteor';
// temporary schema for storing module and term whereby the module is offered

// reference to module collection
let moduleCollection;

// this function should only be called if there is no module collection yet to
// be established.
const createModuleCollection = function createModuleCollection() {
  moduleCollection = new Meteor.Collection('module');
  moduleCollection.schema = new SimpleSchema(
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
const isExistModuleCollection = function checkForCollection() {
  if (typeof moduleCollection != 'undefined'){
    return true;
  }
  return false;
}
// This method try to find module in the collection by the moduleCode
const searchByModuleCode = function retrieveMod(modCode) {
  const searchResult = moduleCollection.findOne({ moduleCode: modCode });

  if (searchResult.length === 0) {
    return {};
  }
  const returnPackage = {
    moduleCode: searchResult.moduleCode,
    moduleID: searchResult._id,
  };

  return returnPackage;
};

// check if the collection of module is empty
const isEmptyModuleCollection = function checkForAnyContent() {
  const searchResult = moduleCollection.find({}).fetch();
  if (searchResult.length == 0) {
    return true;
  }
  return false;
};

const removeAllModule = function removeAllModule() {
  moduleCollection.remove({});
};

// insert one new module collection to the Module Database
const insertToModuleCollection = function insertToModuleCollection(object) {
  moduleCollection.insert(object);
  // TO DO:return success/ failure message
};

const retrieveAllModule = function findAll() {
  return moduleCollection.find({}).fetch();
};

const retrieveModuleReference = function retrieveModuleCollectionReference() {
  if (!isExistModuleCollection){
    return moduleCollection;
  }

  createModuleCollection();
  return moduleCollection;
};


export {
  createModuleCollection,
  removeAllModule,
  insertToModuleCollection,
  isEmptyModuleCollection,
  isExistModuleCollection,
  searchByModuleCode,
  retrieveAllModule,
  retrieveModuleReference,
};
