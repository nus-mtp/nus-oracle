import { Students } from './student';
// create new Student using the userID from the accountDB right after the sign up
export const createNewStudent = function createNewStudent(userID, studentCohort, prevEducation){

  const studentDocument = {
    studentPreviousHighestEducation: prevEducation,
    studentAcademicCohort: studentCohort,
    accountID: userID
  };

  let result = true;
  try {
    Students.insert(studentDocument);
  } catch (error) {
    result = false
    console.log('there is an error while attempting to insert data to Students');
  }

  return result;
};
// helper function
const  obtainCurrentStudentDocument = function getCurrentStudentDocument(studentID) {
  return Students.findOne({_id: studentID});
}
// obtain the academic cohort of the current student

export const getStudentAcademicCohort = function getCohort(studentID) {
  return obtainCurrentStudentDocument(studentID).studentAcademicCohort;
}

export const getStudentExemptedModules = function getExemptedModule(studentID) {
  return obtainCurrentStudentDocument(studentID).studentExemptedModule;
}
