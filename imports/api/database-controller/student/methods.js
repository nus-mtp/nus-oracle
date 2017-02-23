import { Match } from 'meteor/check';
import { Students } from './student';
import { searchByModuleCode } from '../module/methods';

// create new Student using the userID from the accountDB right after the sign up
export const createNewStudent = function createNewStudent(userID, studentCohort, prevEducation){
  // create the object to be validated
  const studentDocument = {
    studentExemptedModule: {},
    studentWaivedModule: {},
    studentPreviousHighestEducation: prevEducation,
    studentAcademicCohort: studentCohort,
    accountID: userID,
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

export const addStudentExemptedModule = function addStudentExemptedModule(StudentID, exemptedModule, callback) {
  const student = getCurrentStudentDocument(StudentID);
  // check if added modules are legit modules
  if (Object.keys(searchByModuleCode(exemptedModule)).length === 0) {
    return 0;
  }

  if (student == {})  {
    return 0;
  }
  const studentExemptedModules = student.studentExemptedModule;
  studentExemptedModules[exemptedModule] = exemptedModule;

  return Students.update(StudentID, { $set: { studentExemptedModule: studentExemptedModules } }, callback);
}

export const deleteStudentExemptedModule = function deleteStudentExemptedModule(StudentID, exemptedModule)  {
  const student = getCurrentStudentDocument(StudentID);
  if (student == {})  {
    return 0;
  }
  const studentExemptedModules = student.studentExemptedModule;

  // check if there are any modules to delete
  if (Object.keys(studentExemptedModules).length === 0) {
    return 0;
  }

  delete studentExemptedModules[exemptedModule];

  return Students.update(StudentID, { $set: { studentExemptedModule: studentExemptedModules } });
}

export const addStudentWaviedModule = function addStudentWaviedModule(StudentID, waivedModule, callback)  {
  const student = getCurrentStudentDocument(StudentID);
  if (Object.keys(searchByModuleCode(waivedModule)).length === 0) {
    return 0;
  }

  if (student == {})  {
    return 0;
  }
  const studentWaivedModules = student.studentWaivedModule;
  studentWaivedModules[waivedModule] = waivedModule;

  return Students.update(StudentID, { $set: { studentWaivedModule: studentWaivedModules } }, callback);
}

export const deleteStudentWaivedModule = function deleteStudentWaivedModule(StudentID, waivedModule)  {
  const student = getCurrentStudentDocument(StudentID);
  if (student == {})  {
    return 0;
  }
  const studentWaivedModules = student.studentWaivedModule;

  // check if there are any modules to delete
  if (Object.keys(studentWaivedModules).length === 0) {
    return 0;
  }

  delete studentWaivedModules[waivedModule];

  return Students.update(StudentID, { $set: { studentWaivedModule: studentWaivedModules } });
}
