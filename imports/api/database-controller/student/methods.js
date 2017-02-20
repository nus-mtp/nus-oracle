import { Students } from './student';

const NEW_STUDENT_TEMPLATE =
{
  studentEmail: '',
  studentPlanner:[],
  studentUserID: '',
}
// create new Student using the userID from the accountDB right after the sign up
export const createNewStudent = function createNewStudent(studentData){
  let result = true;
  try {
    Students.insert(studentData);
  } catch (error) {
    result = false
    console.log('there is an error while attempting to insert data to Students');
  }

  return result;
};
