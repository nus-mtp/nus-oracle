/** Parse json file following the specified format below to be stored in the site database.
* This parser will also make use of the schema to check the legibility of the data that is going to be
* passed into the database as well as the availability in the database( check if the module is available in database)

* Note that Academic Cohort will reference graduation requirement and focus area through their ID.
* Focus Area can be easily referenced through their name.
* However, graduation requirement requires both the cohort name and the requirement name to ensure uniqueness of document.
* Thus, for ease of referencing, graduation requirement document will be created together with the creation of academic cohort.

* Finally, make sure that the focus area and the module DB is available and populated before running this script.

* The information in the json file to be parsed should be stored in the following manner :
  { "data":[{
              "cohortName": "AY xxxx/xxxx",
              "uniqueGradRequirement": [
                  {
                    "requirementName": "requirement 1",
                    "requirementModules": ["module1", "module2", "module3"]
                  },
                  {
                    "requirementName": "requirement 2",
                    "requirementModules": ["module1", "module2", "module3"]
                  }
                ],
              "repeatedGradRequirement": "none",
              "cohortFocusArea": ["fa1","fa2","fa3"]
            },
            {
              "cohortName": "AY yyyy/yyyy",
              "uniqueGradRequirement": "none",
              "repeatedGradRequirement": [
              {
                /// this cohort should have existed in the DB
                "cohortName": "AY xxxx/xxxx",
                "graduationRequirement": ["requirement 2"]
              }],
              "cohortFocusArea": ["fa1","fa2","fa3"]
            }
          ]
}
*/

// import DB pointer in case required.
import {GraduationRequirements} from '../database-controller/graduation-requirement/graduationRequirement';
import { AcademicCohort } from '../database-controller/academic-cohort/acadCohort';
// import method to insert new graduation requirement methods
import { createNewGradRequirement,
         insertNewGradRequirementModuleData } from '../database-controller/graduation-requirement/methods';
// import method to insert new academic cohort methods
import { createNewCohort,
         removeAllCohort,
         updateCohortGradRequirementIDs,
         getCohortByName,
         updateCohortFocusAreaIDs} from '../database-controller/academic-cohort/methods';
// import method to get focus area id from their name.
import { getFocusAreaIDByName } from '../database-controller/focus-area/methods';
//import method to check availability of module in module database
import { findModuleAvailability } from '../database-controller/module/methods';

const gradRequirementFile = 'GraduationRequirement.json';

export const populateAcadCohortCollection = function() {
//make sure to only run this script on server side.
  if(Meteor.isServer){
    removeAllCohort({});
    GraduationRequirements.remove({});//just in case

    // get data
    const jsonFile = JSON.parse(Assets.getText(gradRequirementFile));
    const acadCohortData = jsonFile["data"];
    let result = "";
    for(var i = 0; i< acadCohortData.length; i++){
      let currentCohort = acadCohortData[i];
      let currentCohortName = currentCohort["cohortName"];
      result = result.concat("Reading data for Academic Cohort " + currentCohortName + "\r\n");

      //create new cohort document
      let newCohortID = createNewCohort(currentCohortName);
      let gradRequirementIDs = [];
      // see if there is any unique graduation requirement
      if (currentCohort["uniqueGradRequirement"] != "none"){
        /// if there is , insert to grad requirement DB
        result = result.concat("  Found the following number of unique requirement " + currentCohort["uniqueGradRequirement"].length);
        for(var j = 0; j < currentCohort["uniqueGradRequirement"].length; j++){
          let currentNewRequirement = currentCohort["uniqueGradRequirement"][j];
          //TO DO one check for none
          if (currentCohort["requirementModules"] != "none") {
          let newRequirementID = createNewGradRequirement(currentNewRequirement["requirementName"],
                                                         currentNewRequirement["requirementModules"],
                                                         currentNewRequirement["requirementMCs"]);
          result = result.concat("  -" + currentNewRequirement["requirementName"] + ":" + newRequirementID + "\r\n");
          /// store ID to array
          gradRequirementIDs.push(newRequirementID);
        }
        }
      }

      /// else find the equivalent grad requirement
      if (currentCohort["repeatedGradRequirement"] != "none"){
        for(var j = 0; j < currentCohort["repeatedGradRequirement"].length; j++){
          let referencedCohort = currentCohort["repeatedGradRequirement"][j]["cohortName"];
          let referencedGradIDDocument = getCohortByName(referencedCohort)["cohortGradRequirementID"];

          let requirementList = currentCohort["repeatedGradRequirement"][j]["graduationRequirement"];
          result = result.concat("Found the following repeated requirement from " + referencedCohort + ": " + requirementList.length + "\r\n");
          for(var k = 0; k < requirementList.length ; k++ ){
            currentRequirementName = requirementList[k];
            let matchingDocument = GraduationRequirements.findOne({$and:[{requirementName:currentRequirementName},{_id:{$in:referencedGradIDDocument}}]});
            console.log("look for the following name:" + currentRequirementName);
            gradRequirementIDs.push(matchingDocument["_id"]);
          }
        }
      }
  ////////////////////////////////////// FOCUS AREA /////////////////////////////////////////////////////////////////
      // check for focus area
      // its safe to assume that every cohort will always have focus area
      const focusAreaIDs = [];
      let currentFocusAreaList = currentCohort["cohortFocusArea"];
      if (currentFocusAreaList != "none"){
        for(var j = 0; j < currentFocusAreaList.length ; j++){
          // current focus area is the name! we need to obtain the ID!
          let currentFocusArea = currentFocusAreaList[j];
          let currentFocusAreaID = getFocusAreaIDByName(currentFocusArea);

          if(currentFocusAreaID === ''){
            console.log("cannot find matching document for focus Area named: " + currentFocusArea);
          } else {
            focusAreaIDs.push(currentFocusAreaID);
          }

        }

        updateCohortFocusAreaIDs(currentCohortName,focusAreaIDs);
        updateCohortGradRequirementIDs(currentCohortName,gradRequirementIDs);
      }

    }
    console.log(result);
  }
}
