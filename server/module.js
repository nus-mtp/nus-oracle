import { Meteor } from 'meteor/meteor';
// temporary schema for storing module and term whereby the module is offered
// TO-DO: check with the front end regarding student + study plan database.

let termCollection;
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

const removeAllTerm = function removeAllTerm() {
  termCollection.remove({});
};

const insertToTermCollection = function insertToTermCollection(object) {
  termCollection.insert(object);

  // TO DO:return success/ failure message
};

const insertToModuleCollection = function insertToModuleCollection(object) {
  moduleCollection.insert(object);
  console.log(moduleCollection.find({}).fetch());
  // TO DO:return success/ failure message
};

const removeModuleFromCollection = function removeOneModule(moduleId) {
  moduleCollection.remove({ _id: moduleId });
};

const removeTermFromCollection = function removeTermCollection(termId) {
  // check if the term is used in any of the module
  const checkForTermUseInModule = moduleCollection.find(
    {
      termOffered: {
        _id: termId
      },
    }
  );

  if (checkForTermUseInModule.fetch().empty()) {
    termCollection.remove({
      termOffered: {
        _id: termId
      },
    });

    return true;
  }
  // the term data is in use, forbid data from being deleted
  return false;
};

export {
  createModCollection,
  removeAllTerm,
  removeAllModule,
  insertToTermCollection,
  insertToModuleCollection,
  isEmptyModuleCollection,
};
