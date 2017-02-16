import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export let Modules;
export const instantiateModuleCollection = function() {
  new Mongo.Collection('module')
  Modules.schema = new SimpleSchema({
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
  });

};
