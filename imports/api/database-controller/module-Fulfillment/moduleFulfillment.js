import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ModuleFulfillmentCollection extends Mongo.Collection {}

const ModuleFulfillments = new ModuleFulfillmentCollection("modfulfillment");

const fulfillmentSchema = {
  acadYearList: {
    type: [String]
  },
  moduleMapping: {
    type: String
  }
}

ModuleFulfillments.attachSchema(fulfillmentSchema);
