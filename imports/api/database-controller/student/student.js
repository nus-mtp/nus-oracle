import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class StudentCollection extends Mongo.Collection{
  insert(studentData, callBack){
    const studentDocument = studentData;
    let result;
    //validate document
    result = super.insert( studentDocument, callBack);
    return result;
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

export const Students = new StudentCollection("Student");
StudentSchema = {
  studentExemptedModule: {
    type: [String],
    optional: true,
  },
  studentAcademicCohort: {
    type: String,
  },
  studentPreviousHighestEducation: {
    type: String,
  },
  accountID: {
    type: String,
  }
}

Students.attachSchema(StudentSchema);
if (Meteor.isServer) {
  Meteor.publish('Student', function taskPublication () {
    return Students.find();
  });
}
