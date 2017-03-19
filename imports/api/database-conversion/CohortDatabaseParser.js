/** While the name is CohortDatabaseParser, this file handles the database insertion
* of two other Database Data: Graduation Requirement and focus area,
* which will be linked back to the relevant academic cohort database by its mongoDB ID.
* This parser will also make use of the schema to check the legibility of the data that is going to be
* passed into the database as well as the availability in the database( check if the module is available in database)
*/

import {GraduationRequirements} from '../database-controller/graduation-requirement/graduationRequirement';
import { AcademicCohort } from '../database-controller/AcademicCohort/acadCohort';
// import method to insert new graduation requirement methods
import { createNewGradRequirement,
         insertNewGradRequirementModuleData } from '../database-controller/graduation-requirement/methods';
// import method to insert new academic cohort methods
import { createNewCohort,
         updateCohortGradRequirementIDs,
         getCohortByName} from '../database-controller/AcademicCohort/methods';
//import method to check availability of module in module database
import { findModuleAvailability } from '../database-controller/module/methods';

const focusAreaFile = "FocusArea.json"
const gradRequirementFile = 'GraduationRequirement.json';
const empty = "none";

//make sure to only run this script on server side.
if(Meteor.isServer){
  AcademicCohort.remove({});
  GraduationRequirements.remove({});
  // get data
  const jsonFile = JSON.parse(Assets.getText(gradRequirementFile));
  const acadCohortData = jsonFile["data"];

  for(var i = 0; i< acadCohortData.length; i++){

    let currentCohort = acadCohortData[i];

    // get acad Cohort Name
    let currentCohortName = currentCohort["cohortName"];
    let newID = createNewCohort(currentCohortName);
    console.log("newCohort ID:" + newID);
    let gradRequirementID = [];

    // see if there is any unique graduation requirement
    if (currentCohort["uniqueGradRequirement"] != "none"){
      /// if there is , insert to grad requirement DB
      for(var j = 0; j < currentCohort["uniqueGradRequirement"].length; j++){
        let currentNewRequirement = currentCohort["uniqueGradRequirement"][j];
        let newID = insertNewGradRequirementModuleData(currentNewRequirement["requirementName"],
                                                       currentNewRequirement["requirementModules"],
                                                       currentNewRequirement["requirementMCs"]);
        console.log(newID);
        /// store ID to array
        gradRequirementID.push(newID);
      }
    }

    /// else find the equivalent grad requirement
    if (currentCohort["repeatedGradRequirement"] != "none"){
      for(var j = 0; j < currentCohort["repeatedGradRequirement"].length; j++){
        let referencedCohort = currentCohort["repeatedGradRequirement"][j]["cohortName"];
        let referencedGradIDDocument = getCohortByName(referencedCohort)["cohortGradRequirementID"];
        console.log(referencedGradIDDocument);
        let requirementList = currentCohort["repeatedGradRequirement"][j]["graduationRequirement"];

        for(var k = 0; k < requirementList.length ; k++ ){
          currentRequirementName = requirementList[k];
          let matchingDocument = GraduationRequirements.findOne({$and:[{requirementName:currentRequirementName},{_id:{$in:referencedGradIDDocument}}]});
          console.log("matching document is:" + JSON.stringify(matchingDocument["_id"]));
          gradRequirementID.push(matchingDocument["_id"]);
        }
      }
    }

    // check for focus area
    // create new academic cohort
    console.log(gradRequirementID);
    updateCohortGradRequirementIDs(currentCohortName,gradRequirementID);
  }
}
// set environment as the mlab environment
//process.env.MONGO_URL = 'mongodb://rainbowheadstudio:<dbpassword>@ds151059.mlab.com:51059/development-nus-oracle'
// load the document from the private folder

// for now, always remove all data

// parse string from assets to JSON
// start checking the data

//
