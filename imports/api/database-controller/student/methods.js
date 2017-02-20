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

// obtain the academic cohort of the current student
export const getStudentAcademicCohort = function getCohort(studentID) {
  const studentDocument = Students.findOne({_id: studentID});

  return studentDocument.studentAcademicCohort;
}
