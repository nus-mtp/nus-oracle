import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class AcadCohortCollection extends Mongo.Collection{
  insert(acadCohortData, callBack){
    const cohortDocument = acadCohortData;
    let result;
    //validate document
    result = super.insert( cohortDocument, callBack);
    return result;
  };

  update(updatedCohortData, callBack){
    const cohortDocument = updatedCohortData;

    const result = super.update(cohortDocument, callback);

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
  }
}

export const AcademicCohort = new AcadCohortCollection("AcademicCohort");
AcademicCohort.attachSchema(acadCohortSchema);
