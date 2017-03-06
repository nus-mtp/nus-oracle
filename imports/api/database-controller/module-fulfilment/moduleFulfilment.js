import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
    type: {moduleMappingSchema},
    blackbox: true
  }
}


ModuleFulfilments.attachSchema(fulfilmentSchema);
