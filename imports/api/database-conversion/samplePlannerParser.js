
import {Planner} from '../student-logic-controller/crud-controller/planner/planner';
import {createPlannerGivenUserID} from '../student-logic-controller/crud-controller/planner/methods';
import {insertOneModuleInSemester} from '../student-logic-controller/crud-controller/module/methods';
import {insertNewAcademicYearInPlanner,
        insertNewSemesterInPlanner} from '../student-logic-controller/crud-controller/semester/methods';
import {AcademicCohort} from '../database-controller/academic-cohort/acadCohort';
import {getCohortByName,
        updateCohortDefaultPlannerID} from '../database-controller/academic-cohort/methods';

//Parse manually written planner and stored it into DB.
//Academic Cohort need to already exists. Be careful if you want to store this since you need to make sure the old planner ID is removed propery.

/**
Sample Planner:
{"AY 2013/2014": [{
"plannerName": "CS Foundation",
"semesters":{
  "1":["CS1010","CS1231"],
  "2":["CS1020","CS2100","MA1521"],
  "4":[],
  "3":[],
  "5":["CS2010","CS1231","CS2105"],
  "6":["CS2103T","CS2101","MA1101R"],
  "7":[],
  "8":[],
  "9":["CS2106","CS3201","ST2334"],
  "10":["CS3230","CS3202"],
  "11":[],
  "12":["CP4101"],
  "13":[],
  "14":[],
  "15":[],
  "16":[]
}
}
]}
*/

// each cohort planner is stored separately for ease of maintaning the file.
export const parseDefaultPlanner = function parseDefaultPlanner(fileToBeParsed, canReplaceExistingID){
  const fileName = fileToBeParsed;
  const allowReplaceID = canReplaceExistingID

  console.log("Parsing file " + fileName + " for the academic year default plan");

  const plannerJSON = JSON.parse(Assets.getText(fileName));
  const plannerKey = Object.keys(plannerJSON);

  for (var i = 0; i < plannerKey.length ; i++){
    // find the current referred academicCohort
    let currentYear = plannerKey[i];
    // check if academic cohort exists
    let cohortCursor = AcademicCohort.find({"cohortName": currentYear});
    // reject if cohort doesn't exist
    if (cohortCursor.length == 0){
      continue;
    }

    // fetch current cohort)
    let currentCohort = cohortCursor.fetch()[0];
    console.log(currentCohort);
    // fetch the defaultPlannerID
    let currentCohortPlannerIDs = AcademicCohort.find({"cohortName": currentYear}).fetch().cohortDefaultPlannerID;

    // check if you want to replace existing planner
    if (!allowReplaceID){
      if ( (currentCohortPlannerIDs != undefined) && currentCohortPlannerIDs.length > 0){
        console.log("there is already planner set for academic cohort " + currentYear + " and replacement of data is forbidden");
        continue;
      }
    }

    // if yes or id is empty, remove from the planner cohort and empty the id list
    if( currentCohortPlannerIDs != undefined){
      console.log("removing previous planner from the cohort document...");
      for(var j = 0; j < currentCohortPlannerIDs.length; j ++){
        console.log("removing planner with ID: " + currentCohortPlannerIDs[j]);
        Planner.remove({_id: currentCohortPlannerIDs[j]});
      }
    }

    currentCohortPlannerIDs = [];
    // start populating the database
    let plannerListing = plannerJSON[currentYear];

    for (var j = 0 ; j < plannerListing.length; j++){
      let currentSemesterYear = currentYear;
      let currentPlanner = plannerListing[j];
      // get planner name
      let currentPlannerName = currentPlanner["plannerName"];
      console.log(currentPlannerName);
      // create new planner
      let newPlannerID = createPlannerGivenUserID(currentPlannerName,[],"DefaultStudyPlanner");
      // get the semester object
      let currentPlannerSemesterObject = currentPlanner["semesters"];
      //console.log(currentPlannerSemesterObject);
      // convert the semester object to the semester schema
      let currentPlannerKeys = Object.keys(currentPlannerSemesterObject);

      for (var k = 0; k < currentPlannerKeys.length ; k++){
        if (k%4 == 0) {
          // add new academic year after every 4 semester
          if (k == 0) {
            for (var i=0; i<4; i++) {
              semLength = insertNewSemesterInPlanner(currentYear, i+1, newPlannerID);
            }
          } else {
            insertNewAcademicYearInPlanner(newPlannerID);
          }
        }
        // get the module array
        let currentSemesterModule = currentPlannerSemesterObject[currentPlannerKeys[k]];
        for (var l = 0; l < currentSemesterModule.length; l++){
          insertOneModuleInSemester(k, currentSemesterModule[l], newPlannerID);
        }
      }
      //console.log(Planner.find({_id:newPlannerID}).fetch());
      currentCohortPlannerIDs.push(newPlannerID);

    }
    updateCohortDefaultPlannerID(currentYear, currentCohortPlannerIDs);
  }
}
