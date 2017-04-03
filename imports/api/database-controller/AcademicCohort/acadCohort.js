import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class AcadCohortCollection extends Mongo.Collection{
  insert(acadCohortData, callBack){
    const cohortDocument = acadCohortData;
    let result;
    //validate document
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
