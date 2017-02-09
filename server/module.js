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

  const a = termCollection.find({}).fetch();
  console.log(a);
  moduleCollection.insert(
    {
      moduleName: 'cs1101s',
      modulePreclusion: 'cs1010, cs1010e, cs1010s, and its equivalent',
      moduleCorequisite: 'nonez',
      moduleDescription: 'too Lazy',
      modulePrerequisite: 'none',
      termOffered: a,
    },
  );
  console.log(moduleCollection.findOne({}).termOffered);
};

createModCollection();
testDataNew();
