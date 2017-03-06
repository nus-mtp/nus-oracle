import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ModuleFulfilmentCollection extends Mongo.Collection {}

const ModuleFulfilments = new ModuleFulfilmentCollection("modfulfilment");

const fulfilmentSchema = {
  moduleCode: {
    type: String
  },
  academicYearList: {
    type: [String],
    blackbox: true
  },
  moduleEquivalent: {
    type: [String],
    optional: true
  }
};

ModuleFulfilments.attachSchema(fulfilmentSchema);
