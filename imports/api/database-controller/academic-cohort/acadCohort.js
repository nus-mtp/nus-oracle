import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
/**
Academic Cohort stores the information relevant to the student's cohort, including suggested planner IDs, focus Areas IDs, and
Graduation Requirement IDs,

Because of this, it is expected that all these informations are already present, or created at the same time the cohort document
is created. For example, take a look at the cohortDataBaseParser.js under database-conversion folder
*/
class AcadCohortCollection extends Mongo.Collection{
  insert(acadCohortData, callBack){
    const cohortDocument = acadCohortData;

    return super.insert( cohortDocument, callBack);
  };

  update(selector, modifier){
    const result = super.update(selector, modifier);

    return result;
  };

  remove(selector){
    const result = super.remove(selector);
    return result;
  };
}


const acadCohortSchema ={
  cohortName:{
    type: String,
    regEx: /AY\s\d\d\d\d\/\d\d\d\d/
  },
  cohortFocusAreaID:{
    type: [String],
    optional: true
  },
  cohortGradRequirementID: {
    type: [String],
    optional: true
  },
  cohortDefaultPlannerID: {
    type: [String],
    optional: true
  }
}

export const AcademicCohort = new AcadCohortCollection("AcademicCohort");
AcademicCohort.attachSchema(acadCohortSchema);
if (Meteor.isServer) {
  Meteor.publish('AcademicCohort', function taskPublication () {
    return AcademicCohort.find({});
  });
}
