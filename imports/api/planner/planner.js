import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// create class for planner
class PlannerCollection extends Mongo.Collection {
  // semester object will be the inserted document
  insert(planner, callback) {
    const ourDoc = planner;
    const result = super.insert(ourDoc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const result = super.remove(selector);
    return result;
  }
}

export const Planner = new PlannerCollection('planner');

/*
  Planner.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },

  semesterIDs: {
    type: Object,
  },

  // this field needs to be kept private
  userID: {
    type: String,
  },
});

Planner.attachSchema(Planner.schema);*/
