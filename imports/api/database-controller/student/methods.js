import { Match } from 'meteor/check';
import { Students } from './student';
// create new Student using the userID from the accountDB right after the sign up
export const createNewStudent = function createNewStudent(userID, studentCohort, prevEducation){
  // create the object to be validated
  const studentDocument = {
    studentPreviousHighestEducation: prevEducation,
    studentAcademicCohort: studentCohort,
    accountID: userID
  };

  // validate the data
  isValid = Match.test(studentDocument, Students.simpleSchema());

  if (isValid){
    return Students.insert(studentDocument);
  } else {
    return {};
  }

};
// helper function
export const getCurrentStudentDocument = function getCurrentStudentDocument(studentID) {
  return Students.findOne({_id: studentID});
}
// get the academic cohort of the current student

export const getStudentAcademicCohort = function getCohort(studentID) {
  return getCurrentStudentDocument(studentID).studentAcademicCohort;
}

export const getStudentExemptedModules = function getExemptedModule(studentID) {
  return getCurrentStudentDocument(studentID).studentExemptedModule;
}

export const getStudentPreviousEducation = function getPrevEducation(studentID) {
  return getCurrentStudentDocument(studentID).studentPreviousHighestEducation;
}
