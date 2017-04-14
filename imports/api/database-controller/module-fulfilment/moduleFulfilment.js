import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
Module Fulfilments collection contains Document that supports the graduation checker logic.
It contains information of Module replacement for the Module that is listed under the graduation requirement.

Module Fulfilments require Module Collection to not be empty. While currently it may not be checked.
In future development, the module listed under the Module Fulfilments collections are supposed to exist in the module Collection DB
**/

class ModuleFulfilmentCollection extends Mongo.Collection {
  insert(fulfilmentData, callBack){
    const fulfilmentDoc = fulfilmentData;
    let result;
    //validate document
    return super.insert( fulfilmentDoc, callBack);
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
    type: Object,
    blackbox: true
  }
}


ModuleFulfilments.attachSchema(fulfilmentSchema);
if (Meteor.isServer) {
  Meteor.publish('ModuleFulfilments', function taskPublication () {
    return ModuleFulfilments.find({});
  });
}
