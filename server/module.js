import { Meteor } from 'meteor/meteor';
// temporary schema for storing module and term whereby the module is offered
// TO-DO: check with the front end regarding student + study plan database.

// this function should only be called if there is no module collection yet to
// be established.
let termCollection;
let moduleCollection;

const createModCollection = function createModuleCollection() {
  termCollection = new Meteor.Collection('termOffered');
  termCollection.Schema = new SimpleSchema(
    {
      termYear: {
        type: String,
      },
      semester: {
        type: String,
      },
    },
  );

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
      termOffered: {
        type: [Object],
      },
    },
  );
};

const testDataNew = function insertTestData() {
  // always remove previous content before inserting
  termCollection.remove({});
  moduleCollection.remove({});
  // start inserting values
  termCollection.insert(
    {
      termYear: '2016/7',
      semester: '1',
    },
  );

  termCollection.insert(
    {
      termYear: '2016/7',
      semester: '2',
    },
  );

  termCollection.insert(
    {
      termYear: '2017/8',
      semester: '1',
    },
  );

  termCollection.insert(
    {
      termYear: '2017/8',
      semester: '2',
    },
  );

  const a = termCollection.find({},{semester:'1'}).fetch();
  console.log(a);
  moduleCollection.insert(
    {
      moduleCode: 'cs1101s',
      moduleName: 'Programming Methodology',
      modulePreclusion: 'cs1010, cs1010e, cs1010s, and its equivalent',
      moduleCorequisite: '-',
      moduleDescription: 'An advance version of cs1010.',
      modulePrerequisite: 'none',
      termOffered: a,
    },
  );
  console.log(moduleCollection.findOne({}).termOffered);
};

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

// For testing purposes
// createModCollection();
// testDataNew();
// const testResult = searchByModuleCode('cs1101s');
// console.log(testResult);
