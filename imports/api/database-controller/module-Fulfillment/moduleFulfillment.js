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

const fulfillmentSchema = {
  moduleCode: {
    type: String
  },
  moduleMapping: {
    type: [object]
  }
}

ModuleFulfillments.attachSchema(fulfillmentSchema);
