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
  }

  return {};


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

export const updateStudentAcademicCohort = function updateStudentCohort(StudentID, newCohort) {
  //TO-DO: Check if the cohort exists in the acadCohortDataBase
  // find the studentID
  const student = getCurrentStudentDocument(StudentID);
  if(student == {}){
    return false;
  }
  return Students.update(StudentID, { $set: { studentAcademicCohort: newCohort} });
}

export const updateStudentPreviousEducation = function updateStudentEducation(StudentID, prevEdu) {
  //TO-DO: Check if the prevEdu exists in the previousEducationDatabase
  // find the studentID
  const student = getCurrentStudentDocument(StudentID);
  if(student == {}){
    return false;
  }
  return Students.update(StudentID, { $set: { studentPreviousHighestEducation: prevEdu} });
}
