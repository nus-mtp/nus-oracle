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

  if (isValid)  {
    const studentID = Students.insert(studentDocument);
    return studentID;
  }

  return {};


};

// get student ID given userId
export const getStudentID = function getStudentID(userId) {
  // account dependent meteor function
  let id = userId;

  if (!id)  {
    id = Meteor.userId();
  }

  const student = Students.findOne( {'accountID': id} );

  if (!student) {
    return '';
  }
  return student._id;
}

// helper function
export const getCurrentStudentDocument = function getCurrentStudentDocument(studentID) {
  return Students.findOne({_id: studentID});
}

export const getStudentAcademicCohort = function getCohort() {
  const studentID = getStudentID();
  return getCurrentStudentDocument(studentID).studentAcademicCohort;
}

export const getStudentExemptedModules = function getExemptedModule() {
  const studentID = getStudentID();
  return getCurrentStudentDocument(studentID).studentExemptedModule;
}

export const getStudentPreviousEducation = function getPrevEducation() {
  const studentID = getStudentID();
  return getCurrentStudentDocument(studentID).studentPreviousHighestEducation;
}

export const updateStudentAcademicCohort = function updateStudentCohort(newCohort) {
  //TO-DO: Check if the cohort exists in the acadCohortDataBase
  // find the studentID
  const studentID = getStudentID();
  const student = getCurrentStudentDocument(studentID);
  if(student == {}){
    return false;
  }
  return Students.update(studentID, { $set: { studentAcademicCohort: newCohort} });
}

export const updateStudentPreviousEducation = function updateStudentEducation(prevEdu) {
  //TO-DO: Check if the prevEdu exists in the previousEducationDatabase
  // find the studentID
  const studentID = getStudentID();
  const student = getCurrentStudentDocument(studentID);
  if(student == {}){
    return false;
  }
  return Students.update(studentID, { $set: { studentPreviousHighestEducation: prevEdu} });
}

export const getStudentExemptedModule = function getStudentAcademicCohort() {
  const studentID = getStudentID();
  const student = getCurrentStudentDocument(studentID);
  return student.studentExemptedModule;
}

export const addStudentExemptedModule = function addStudentExemptedModule(exemptedModule, callback) {
  const studentID = getStudentID();
  const student = getCurrentStudentDocument(studentID);
  // check if added modules are legit modules
  if (Object.keys(searchByModuleCode(exemptedModule)).length === 0) {
    return 0;
  }

  if (student == {})  {
    return 0;
  }
  const studentExemptedModules = student.studentExemptedModule;
  studentExemptedModules[exemptedModule] = exemptedModule;

  return Students.update(studentID, { $set: { studentExemptedModule: studentExemptedModules } }, callback);
}

export const deleteStudentExemptedModule = function deleteStudentExemptedModule(exemptedModule)  {
  const studentID = getStudentID();
  const student = getCurrentStudentDocument(studentID);
  if (student == {})  {
    return 0;
  }
  const studentExemptedModules = student.studentExemptedModule;

  // check if there are any modules to delete
  if (Object.keys(studentExemptedModules).length === 0) {
    return 0;
  }

  delete studentExemptedModules[exemptedModule];

  return Students.update(studentID, { $set: { studentExemptedModule: studentExemptedModules } });
}

export const getStudentWaivedModules = function getStudentAcademicCohort() {
  const studentID = getStudentID();
  const student = getCurrentStudentDocument(studentID);
  return student.studentWaivedModule;
}

export const addStudentWaviedModule = function addStudentWaviedModule(waivedModule, callback)  {
  const studentID = getStudentID();
  const student = getCurrentStudentDocument(studentID);
  if (Object.keys(searchByModuleCode(waivedModule)).length === 0) {
    return 0;
  }

  if (student == {})  {
    return 0;
  }
  const studentWaivedModules = student.studentWaivedModule;
  studentWaivedModules[waivedModule] = waivedModule;

  return Students.update(studentID, { $set: { studentWaivedModule: studentWaivedModules } }, callback);
}

export const deleteStudentWaivedModule = function deleteStudentWaivedModule(waivedModule)  {
  const studentID = getStudentID();
  const student = getCurrentStudentDocument(studentID);
  if (student == {})  {
    return 0;
  }
  const studentWaivedModules = student.studentWaivedModule;

  // check if there are any modules to delete
  if (Object.keys(studentWaivedModules).length === 0) {
    return 0;
  }

  delete studentWaivedModules[waivedModule];

  return Students.update(studentID, { $set: { studentWaivedModule: studentWaivedModules } });
}

/*
 * All methods below are for TESTING PURPOSES ONLY, DO NOT USE IN PRODUCTION
 */

export const getStudentAcademicCohortGivenStudentID = function getCohortGivenStudentID(studentID) {
  return getCurrentStudentDocument(studentID).studentAcademicCohort;
}

export const getStudentExemptedModulesGivenStudentID = function getExemptedModuleGivenStudentID(studentID) {
  return getCurrentStudentDocument(studentID).studentExemptedModule;
}

export const getStudentPreviousEducationGivenStudentID = function getPrevEducationGivenStudentID(studentID) {
  return getCurrentStudentDocument(studentID).studentPreviousHighestEducation;
}

export const updateStudentAcademicCohortGivenStudentID = function updateStudentCohortGivenStudentID(newCohort, studentID) {
  //TO-DO: Check if the cohort exists in the acadCohortDataBase
  // find the studentID
  const student = getCurrentStudentDocument(studentID);
  if(student == {}){
    return false;
  }
  return Students.update(studentID, { $set: { studentAcademicCohort: newCohort} });
}

export const updateStudentPreviousEducationGivenStudentID = function updateStudentEducationGivenStudentID(prevEdu, studentID) {
  //TO-DO: Check if the prevEdu exists in the previousEducationDatabase
  // find the studentID
  const student = getCurrentStudentDocument(studentID);
  if(student == {}){
    return false;
  }
  return Students.update(studentID, { $set: { studentPreviousHighestEducation: prevEdu} });
}

export const addStudentExemptedModuleGivenStudentID = function addStudentExemptedModuleGivenStudentID(exemptedModule, studentID, callback) {
  const student = getCurrentStudentDocument(studentID);
  // check if added modules are legit modules
  if (Object.keys(searchByModuleCode(exemptedModule)).length === 0) {
    return 0;
  }

  if (student == {})  {
    return 0;
  }
  const studentExemptedModules = student.studentExemptedModule;
  studentExemptedModules[exemptedModule] = exemptedModule;

  return Students.update(studentID, { $set: { studentExemptedModule: studentExemptedModules } }, callback);
}

export const deleteStudentExemptedModuleGivenStudentID = function deleteStudentExemptedModuleGivenStudentID(exemptedModule, studentID)  {
  const student = getCurrentStudentDocument(studentID);
  if (student == {})  {
    return 0;
  }
  const studentExemptedModules = student.studentExemptedModule;

  // check if there are any modules to delete
  if (Object.keys(studentExemptedModules).length === 0) {
    return 0;
  }

  delete studentExemptedModules[exemptedModule];

  return Students.update(studentID, { $set: { studentExemptedModule: studentExemptedModules } });
}

export const addStudentWaviedModuleGivenStudentID = function addStudentWaviedModuleGivenStudentID(waivedModule, studentID, callback)  {
  const student = getCurrentStudentDocument(studentID);
  if (Object.keys(searchByModuleCode(waivedModule)).length === 0) {
    return 0;
  }

  if (student == {})  {
    return 0;
  }
  const studentWaivedModules = student.studentWaivedModule;
  studentWaivedModules[waivedModule] = waivedModule;

  return Students.update(studentID, { $set: { studentWaivedModule: studentWaivedModules } }, callback);
}

export const deleteStudentWaivedModuleGivenStudentID = function deleteStudentWaivedModuleGivenStudentID(waivedModule, studentID)  {
  const student = getCurrentStudentDocument(studentID);
  if (student == {})  {
    return 0;
  }
  const studentWaivedModules = student.studentWaivedModule;

  // check if there are any modules to delete
  if (Object.keys(studentWaivedModules).length === 0) {
    return 0;
  }

  delete studentWaivedModules[waivedModule];

  return Students.update(studentID, { $set: { studentWaivedModule: studentWaivedModules } });
}
