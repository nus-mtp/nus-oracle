import { assert, expect } from 'meteor/practicalmeteor:chai';
import { AcademicCohort } from './acadCohort';
import { createNewCohort,
         getAllAcadCohort,
         getAcadCohortDataForSetup,
         getCohortByName,
         getCohortByID,
         insertFocusAreaToCohort,
         removeFocusAreaFromCohort,
         updateCohortDefaultPlannerID} from './methods';
if(Meteor.isServer){
  describe('AcademicCohort on Server', function(){
   let result = 0;
   let resultWrong = 0;
   const sampleWrongNameCohort = 'ayyyyy, 14/15';
   const sampleCorrectNameCohort = 'AY 2015/2016';

   beforeEach(function(done) {
     this.timeout(10000);
     result = createNewCohort(sampleCorrectNameCohort);
     resultWrong = createNewCohort(sampleWrongNameCohort);
     done();
   });
   afterEach(function(done) {
     this.timeout(10000);
     AcademicCohort.remove({});
     done();
   });

   it ('should not accept cohort name that does not follow the regex', function() {
     assert.equal(Object.keys(resultWrong).length,0);
   });

   it('should accept cohort with correct name', function() {
     const newCohort = AcademicCohort.findOne({_id:result});
     assert.equal(newCohort.cohortName, 'AY 2015/2016');
   })

   it('testing for deletion of focus area', function() {
     removeFocusAreaFromCohort('AY 2015/2016','dummy');
     const editedCohort = AcademicCohort.findOne({_id:result});
     const focusAreaArray = editedCohort.cohortFocusAreaID;
     assert.equal(focusAreaArray.length, 0);
   })

   it('testing for inserting focus area', function() {
     insertFocusAreaToCohort('AY 2015/2016','dfdfd');
     const editedCohort = AcademicCohort.findOne({_id:result});
     const focusAreaArray = editedCohort.cohortFocusAreaID;
     assert.equal(focusAreaArray.length, 1);
     assert.equal(focusAreaArray[0],'dfdfd');
   })

   it('should insert new Arrays of planner ID if updateCohortDefaultPlannerID is called', function() {
     updateCohortDefaultPlannerID("AY 2015/2016",["12","23"]);
     const editedCohort = AcademicCohort.findOne({_id:result});
     const plannerIDArray = editedCohort["cohortDefaultPlannerID"];
     assert.equal(plannerIDArray.length, 2);
     assert.equal(plannerIDArray[0],"12");
     assert.equal(plannerIDArray[1],"23");
   })

  });
}


if(Meteor.isClient){
describe('AcadCohort on Client', function() {
  const acadCohortName = ['AY 2014/2015', 'AY 2015/2016'];
  const storeID = [];

  beforeEach( function() {
    let i = 0;
    for (i = 0; i < acadCohortName.length ; i ++){
      let result = createNewCohort(acadCohortName[i]);
      storeID.push(result);
    }

    assert.equal(AcademicCohort.find({}).fetch().length, 2);
  });

  afterEach( function() {

    for (id in storeID){
      AcademicCohort.remove({_id:id});
    }
    while(storeID.length > 0){
      storeID.pop();
    }
  });

  it('should be able to return repackaged data when called in client', function() {
    const queryResult = getAcadCohortDataForSetup();
    assert.equal(queryResult.length,2);
    let i = 0;
    for (i = 0; i < queryResult.length; i++){
      assert.equal(queryResult[i].label,queryResult[i].value);
    }
  });


});
}
