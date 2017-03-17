import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// This script defines the schema and the collection initialisation
// for Focus Areas.

// Additional Limitation for the object inside the last three
// elements are governed in the method.
class FocusAreaCollection extends Mongo.Collection {
  insert(focusAreaData, callBack){
    const gradDocument = focusAreaData;
    let result;
    //validate document
    return super.insert( gradDocument, callBack);
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

export const FocusArea = new FocusAreaCollection('focusArea');

const focusAreaSchema = {
  name: {
    type: String
  },
  moduleListPrimary: {
    type: Object,
    blackbox: true,
  },
  moduleListFourThousands: {
    type: Object,
    blackbox: true,
  },
  moduleListElectives: {
    type: Object,
    blackbox: true,
  }
};

FocusArea.attachSchema(focusAreaSchema);
if (Meteor.isServer) {
  Meteor.publish('FocusArea', function taskPublication () {
    return FocusArea.find({});
  });
}
