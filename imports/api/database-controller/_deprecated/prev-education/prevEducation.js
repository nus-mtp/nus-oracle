import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
class PrevEducationCollection extends Mongo.Collection{};

export const PreviousEducation = new PrevEducationCollection('previousEducation');

const prevEducationSchema = {
  educationTitle: {
    type: String
  },
  moduleWaivered: {
    type: Object
  },
  moduleExempted: {
    type: Object
  }
};

previousEducation.attachSchema(prevEducationSchema);
