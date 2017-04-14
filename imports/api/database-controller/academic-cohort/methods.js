import {AcademicCohort} from './acadCohort';
import {Planner} from '../../student-logic-controller/crud-controller/planner/planner';
import {GraduationRequirements} from '../graduation-requirement/graduationRequirement';
import {Match} from 'meteor/check';

//change this as you see fit when you want to populate the database
//make sure that this name is consistent throughout your json file
const CS_FOUNDATION_PLANNER_NAME = "CS Foundation"

/** Call this method to create a new cohort document with only cohortName information required. DO NOT USE MongoDB Insert method
    since this method includes steps to check the document adherent to the agreed Schema
    @param {String} cohortName: name of the new Cohort Document that is going to be put. As written in acadCohort.js,
                     the name should follow the following format 'AY XXXX/XXXX' where XXXX is the year relevant to the cohort
    @return String containing the new cohort ID or empty object if the insertion failed or the cohortName is not A string.
*/
export const createNewCohort = function createCohort(cohortName) {
    const newCohortDocument = {
        cohortName: cohortName,
        cohortFocusAreaID: [],
        cohortGradRequirementID: [],
        cohortDefaultPlannerID: []
    };

    const cohortSchema = AcademicCohort.simpleSchema();
    const isValid = Match.test(newCohortDocument, cohortSchema);

    if (isValid) {
        const result = AcademicCohort.insert(newCohortDocument);
        //console.log(result);
        return result;
    }

    return {};
}
/** Call this method to remove a new cohort document with only cohortName information required. DO NOT USE MongoDB remove method
    since this method includes steps to check the document integrity. Things to take note:
    - Graduation Requirement and Default Planner document IDs relevance heavily relies on the Academic Cohort.
    - If not removed properly, there will not be any default planner reference and the default planner will take up important space in the DB.
    - Graduation Requirement has similar case, although graduation requirement can be referenced by more than one Academic Cohort, so we need
      to check if there are still any reference to the graduation requirement document in other academic cohort document.
    @param {String} cohortName: name of the Cohort that is going to be removed.
    @return {int} number of cohort document removed or return nothing if removed process failed.
*/
export const removeCohort = function removeCohort(cohortName) {
    // check if cohortName is a string
    if (typeof cohortName != 'string') {
        console.log('input is not a string');
        return;
    }

    // find cohort
    let cohortCursor = AcademicCohort.find({cohortName: cohortName});
    if (cohortCursor.count() <= 0) {
        console.log('cursor not found');
        return;
    }

    //obtain cohort
    let cohortDocument = cohortCursor.fetch()[0];

    //do check for its graduation requirement
    cohortGradRequirements = cohortDocument.cohortGradRequirementID;
    for (var i = 0; i < cohortGradRequirements.length; i++) {
      // check if graduation requirement exists in other cohort
      let currentRequirementCursor = AcademicCohort.find({$and:[
        {cohortGradRequirementID:{$elemMatch:{$in:[cohortGradRequirements[i]]}}},
        {cohortName: {$nin:[cohortDocument.cohortName]}}
        ]});
      //console.log("current id " + cohortGradRequirements[i] + " found in other cohort: " + currentRequirementCursor.count());
      // delete the graduation requirement if its not found
      if (currentRequirementCursor.count() == 0){
        GraduationRequirements.remove({_id: cohortGradRequirements[i]});
      }
    }

    //delete all default planner related to the academic cohort.
    //all this planner is unique to the academic cohort.
    cohortDefaultPlanners = cohortDocument.cohortDefaultPlannerID;

    if(cohortDefaultPlanners){
      for(var i = 0; i < cohortDefaultPlanners.length; i++){
        Planner.remove({_id: cohortDefaultPlanners[i]});
      }
    }

    // finally, remove cohort
     return AcademicCohort.remove({cohortName: cohortName});
}
/** call this method to clean the academic cohort collection properly.
*/
export const removeAllCohort = function removeAllCohort(){
  //obtain all cohort
  allCohort = AcademicCohort.find({}).fetch();

  for(var i = 0; i < allCohort.length; i++){
    let currentCohort = allCohort[i];
    //console.log(currentCohort.cohortName);
    let currentCohortName = currentCohort.cohortName;

    removeCohort(currentCohortName);
  }
}

/** Insert New graduationRequirement ID into the cohortGradRequirementID's array inside the specified academic cohort parameter.
* @param: {String} cohortName: name of the cohort to be updated
* @param: {String} newGradRequirementID: graduation requirement id to be stored in the document
*/
export const insertGradRequirementToCohort = function insertOneGradRequirementIDToCohort(cohortName, newGradRequirementID) {
    const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
    const gradRequirementArray = targetCohort.cohortGradRequirementID;
    const cohortID = targetCohort._id;

    gradRequirementArray.push(newGradRequirementID);
    AcademicCohort.update({
        _id: cohortID
    }, {
        $set: {
            cohortGradRequirementID: gradRequirementArray
        }
    });
}

/** Remove graduationRequirement ID from the cohortGradRequirementID's array inside the specified academic cohort parameter.
* @param: {String} cohortName: name of the cohort to be updated
* @param: {String} newGradRequirementID: graduation requirement id to be removed from the document
*/
export const removeGradRequirementFromCohort = function removeOneGraduationRequirementByID(cohortName, gradRequirementIDToRemove) {
    const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
    const gradRequirementArray = targetCohort.cohortGradRequirementID;
    const cohortID = targetCohort._id

    const IDindex = gradRequirementArray.indexOf(gradRequirementIDToRemove);

    if (IDindex == -1) {
        return false;
    }
    gradRequirementArray.splice(IDindex, 1);
    AcademicCohort.update({
        _id: cohortID
    }, {
        $set: {
            cohortGradRequirementID: gradRequirementArray
        }
    });
}
/** Updated the cohortGradRequirementID's array of the specified cohort with the new graduationRequirementID array.
* @param: {String} cohortName: name of the cohort to be updated
* @param: {String} newGradRequirementID: Array of graduation requirement IDs to replace the current existing one in the document.
*/
export const updateCohortGradRequirementIDs = function updateEntireCohortGraduationRequirementIDs(cohortName, newGradRequirementIDs) {
    const targetCohort = AcademicCohort.find({cohortName: cohortName});
    if (targetCohort.count() == 0) {
        console.log("no graduation requirement with name " + cohortName);
        return;
    }

    const targetCohortDocument = targetCohort.fetch()[0];
    const cohortID = targetCohortDocument._id;
    console.log("this cohort to be updated: " + targetCohortDocument["cohortName"]);
    AcademicCohort.update({
        _id: cohortID
    }, {
        $set: {
            cohortGradRequirementID: newGradRequirementIDs
        }
    });
}

/** Update the cohortDefaultPlannerID's array of the specified cohort with the new cohortDefaultPlannerID array.
* @param: {String} cohortName: name of the cohort to be updated
* @param: {String} newCohortDefaultPlannerIDs: Array of DefaulPlanner IDs to replace the current existing one in the document.
*/
export const updateCohortDefaultPlannerID = function updateCohortDefaultPlannerID(cohortName, newCohortDefaultPlannerIDs) {
    const targetCohort = AcademicCohort.find({cohortName: cohortName});

    if (targetCohort.count() == 0) {
        console.log("no Academic Cohort with name " + cohortName);
        return;
    }

    const targetCohortDocument = targetCohort.fetch()[0];
    const cohortID = targetCohortDocument._id;
    console.log(cohortID);
    console.log("this cohort to be updated: " + targetCohortDocument["cohortName"]);
    return AcademicCohort.update({
        _id: cohortID
    }, {
        $set: {
            cohortDefaultPlannerID: newCohortDefaultPlannerIDs
        }
    });
}

/** Insert New Focus Area ID into the focusAreaID's array inside the specified academic cohort parameter.
* @param: {String} cohortName: name of the cohort to be updated
* @param: {String} newFocusAreaID: new focus area id to be included in the document
*/
export const insertFocusAreaToCohort = function insertOneFocusAreaIDToAcadCohort(cohortName, newFocusAreaID) {

    const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
    const focusAreaArray = targetCohort.cohortFocusAreaID;
    const cohortID = targetCohort._id;
    console.log(targetCohort);
    // TO-DO: Check if focus area array exists
    focusAreaArray.push(newFocusAreaID);
    AcademicCohort.update({
        _id: cohortID
    }, {
        $set: {
            cohortFocusAreaID: focusAreaArray
        }
    });
}

/** Remove a Focus Area ID from the focusAreaID's array inside the specified academic cohort parameter.
* @param: {String} cohortName: name of the cohort to be updated
* @param: {String} focusAreaIDToRemove: focus area id to be removed from the document
*/
export const removeFocusAreaFromCohort = function removeOneFocusAreaIDFromAcadCohort(cohortName, focusAreaIDToRemove) {
    const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
    const focusAreaArray = targetCohort.cohortFocusAreaID;
    const cohortID = targetCohort._id

    const IDindex = focusAreaArray.indexOf(focusAreaIDToRemove);

    if (IDindex == -1) {
        return false;
    }
    focusAreaArray.splice(IDindex, 1);
    AcademicCohort.update({
        _id: cohortID
    }, {
        $set: {
            cohortFocusAreaID: focusAreaArray
        }
    });
}
/** Update the cohortFocusAreaID's array of the specified cohort with the new cohortFocusAreaID array.
* @param: {String} cohortName: name of the cohort to be updated
* @param: {String} newCohortFocusAreaIDs: Array of FocusArea IDs to replace the current existing one in the document.
*/
export const updateCohortFocusAreaIDs = function(cohortName, newFocusAreaIDs) {
    const targetCohort = AcademicCohort.find({cohortName: cohortName});
    console.log("matchingDocument: " + targetCohort.count());

    if (targetCohort.count() == 0) {
        console.log("no graduation requirement with name " + cohortName);
        return;
    }

    const targetCohortDocument = targetCohort.fetch()[0];
    const cohortID = targetCohortDocument._id;
    console.log("this cohort to be updated: " + targetCohortDocument["cohortName"]);
    AcademicCohort.update({
        _id: cohortID
    }, {
        $set: {
            cohortFocusAreaID: newFocusAreaIDs
        }
    });
}

// obtain all the stored Cohort from the server
export const getAllAcadCohort = function getAllCohort() {
    return AcademicCohort.find({}).fetch();
}

// obtain specific cohort document by name
export const getCohortByName = function getCohortByName(cohortName) {
    let result = AcademicCohort.findOne({cohortName: cohortName});
    return result;
}

// obtain cohort by ID
export const getCohortByID = function getCohortByID(cohortID) {
    return AcademicCohort.findOne({_id: cohortID});
}

// obtain acadCohortDefeaultPlannerIDs of the requested cohortName
export const getAcadCohortDefaultPlannerIDs = function getAcadCohortDefaultPlannerID(cohortName) {
    let resultCursor = AcademicCohort.find({cohortName: cohortName});
    if (resultCursor.count() != 1) {
        // console.log("there is no academic cohort with name " + cohortName + " in the database");
        return [];
    }

    let defaultPlanner = resultCursor.fetch()[0];
    if (!defaultPlanner) {
        return [];
    }

    return defaultPlanner.cohortDefaultPlannerID;
}

// obtain a repackaged version of acadCohortDefeaultPlannerIDs of the requested cohortName for UI
export const getRepackagedDefaultPlannerIDs = function getRepackagedDefaultPlannerIDs(cohortName) {
    let result = getAcadCohortDefaultPlannerIDs(cohortName);
    // result is an array
    if (!(typeof result === 'object')) {
        return null;
    }

    if (result.length == 0) {
        return null;
    }

    if (result == undefined){
      console.log("result for repackaged defaultPlanner IDs are undefined");
    }
    // repackaged the result
    const repackagedFocusArea = {};
    const repackagedFoundation = {};
    for (var i = 0; i < result.length; i++) {
        // assumed the planner with the ID exists by db integrity
        let currentPlannerID = result[i];
        let currentPlanner = Planner.findOne({_id: currentPlannerID});

        if(currentPlanner['name'] === CS_FOUNDATION_PLANNER_NAME){
          repackagedFoundation[currentPlanner['name']] = currentPlannerID;
          continue;
        }
        repackagedFocusArea[currentPlanner['name']] = currentPlannerID;
    }

    return [repackagedFoundation,repackagedFocusArea];
}

export const getAcadCohortDataForSetup = function getCohortAndRepackaged() {
    const acadCohortData = AcademicCohort.find({}).fetch();
    const repackagedValue = [];
    // repackaged them following the label and value pattern for the UI
    for (var i = 0; i < acadCohortData.length; i++) {
        let acadCohortYear = acadCohortData[i].cohortName;
        repackagedValue.push({label: acadCohortYear, value: acadCohortYear});
    }

    return repackagedValue;
}
