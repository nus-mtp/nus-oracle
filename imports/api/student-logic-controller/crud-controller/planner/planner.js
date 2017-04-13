import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { getStudentIDGivenUserID } from '../../../profile/student/methods';

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

SemesterSchema = new SimpleSchema({
  academicYear: {
    type: String,
  },
  semesterNum: {
    type: Number,
  },
  moduleHashmap: {
    type: Object,
    blackbox: true,
  },
});

Planner.schema = new SimpleSchema({
  name: {
    type: String,
  },

  semesters: {
    type: [SemesterSchema],
  },
  //TO-DO:
  focusArea: {
    type: [String],
  },

  userID: {
    type: String,
  },
});

Planner.attachSchema(Planner.schema);

if (Meteor.isServer) {
  Meteor.publish('planner', function taskPublication () {
    let studentID = getStudentIDGivenUserID(this.userId);
    return Planner.find( { userID: {$in:[studentID,"DefaultStudyPlanner"]} } );
  });
}
