import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ModuleFulfilmentCollection extends Mongo.Collection {
  insert(fulfilmentData, callBack){
    const fulfuilmentDoc = fulfilmentData;
    let result;
    //validate document
    return super.insert( fulfuilmentDoc, callBack);
  };
  update(selector, modifier){
    const result = super.update(selector, modifier);

    return result;
  };

  remove(selector){
    const result = super.remove(selector);
    return result;
  };
}

export const ModuleFulfilments = new ModuleFulfilmentCollection("modfulfilment");

/** Schema for the
  * Object in the module Fulfilments
  * [{acadYear:,
      areaFulfilled:},
  *  {acadYear:,
      areaFulfilled:}]
  */
const moduleMappingSchema = {
  moduleEquivalent: {
    type: [String]
  },
  areaFulfiled: {
    type: String,
    optional: true
  }
}

/*
 * moduleMapping type,
 * @key academicYear
 * @value moduleMapping object
 */
const fulfilmentSchema = {
  moduleCode: {
    type: String
  },
  moduleMapping: {
    type: {moduleMappingSchema},
    blackbox: true
  }
}

ModuleFulfilments.attachSchema(fulfilmentSchema);
