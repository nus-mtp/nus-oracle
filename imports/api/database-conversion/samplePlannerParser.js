//import Planner database
import {Planner} from '../crud-controller/planner/planner';
import {insertOneModuleInSemester} from '../crud-controller/module/methods';
import {Planner} from '../crud-controller/planner/methods';
import {Semester} from '../crud-controller/semester/methods';
import {AcademicCohort} from '../database-controller/AcademicCohort/acadCohort';
//read the assets from the private
const fileName = "DefaultStudyPlanner.json"
const plannerJSON = JSON.parse(Assets.getText(fileName));

// check from in academic cohort if there is an ID exist

// check if you want to replace existing planner

// if yes, remove from the planner cohort and empty the id list

// start populating the database
