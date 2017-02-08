import { Meteor } from 'meteor/meteor';

const moduleCollection = new Meteor.Collection('module');
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
  },
);
