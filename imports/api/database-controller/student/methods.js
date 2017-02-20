import { Students } from './student';

// store the user
export const createNewStudent = function createNewStudent(studentData){
  Students.insert(studentData);
}

export const 
