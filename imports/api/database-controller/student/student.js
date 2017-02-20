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

  update(updatedStudent, callBack){
    const studentDocument = updatedStudent;

    const result = super.update(studentDocument, callback);

    return result;
  };

  remove(selector){
    const result = super.remove(selector);
    return result;
  };
}

Students = new StudentCollection();
StudentSchema = {
  _id: {
    Type: 'String',
  },
  studentEmail: {
    Type: 'String',
  },
  studentPlannerID:{
    Type: '[String]',
  },
  studentExemptedModule: {
    Type: '[String]',
    optional: true,
  },
  studentAcademicCohort: {
    Type: 'String',
    optional: true,
  },
  studentPreviousHighestEducation: {
    Type: 'String',
    optional: true,
  },
  studentUserID: {
    Type: 'String',
  }
}

Students.attachSchema(StudentSchema);
