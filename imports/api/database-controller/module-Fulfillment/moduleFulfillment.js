import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ModuleFulfillmentCollection extends Mongo.Collection {}

const ModuleFulfillments = new ModuleFulfillmentCollection("modfulfillment");

/** Schema for the
  * Object in the module Fulfillments
  * [{acadYear:,
      areaFulfilled:},
  *  {acadYear:,
      areaFulfilled:}]
  */
const moduleMappingSchema = {
  acadYear: {
    type: string,
    optional: false
  },
  areaFulfilled: {
    type: string,
    optional: false
  },
  moduleEquivalent: {
    type: [string],
    optional: true
  }
};
const fulfillmentSchema = {
  moduleCode: {
    type: String
  },
  moduleMapping: {
    type: [moduleMappingSchema],
    blackbox: true
  }
};

ModuleFulfillments.attachSchema(fulfillmentSchema);
