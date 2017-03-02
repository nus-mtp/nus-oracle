import { assert, expect } from 'meteor/practicalmeteor:chai';
import { AcademicCohort } from './acadCohort';
import { createNewCohort,
         getAllAcadCohort,
         getAcadCohortDataForSetup,
         getCohortByName,
         getCohortByID,
         insertFocusAreaToCohort,
         removeFocusAreaFromCohort} from './methods';
if(Meteor.isServer){
  describe('AcademicCohort on Server', function(){
   beforeEach(function() {
     AcademicCohort.remove({});
   });
   afterEach(function() {
     AcademicCohort.remove({});
   });

   const sampleWrongNameCohort = 'ayyyyy, 14/15';


   const sampleCorrectNameCohort = 'AY 2015/2016';

   it ('should not accept cohort name that does not follow the regex', function() {
     const result = createNewCohort(sampleWrongNameCohort);
     assert.equal(Object.keys(result).length,0);
   });

   it('should accept cohort with correct name', function() {
     const result = createNewCohort('AY 2015/2016');
     const newCohort = AcademicCohort.findOne({_id:result});
     assert.equal(newCohort.cohortName, 'AY 2015/2016');
   })

   it('testing for deletion of focus area', function() {
     const result = createNewCohort('AY 2015/2016');
     removeFocusAreaFromCohort('AY 2015/2016','dummy');
     const editedCohort = AcademicCohort.findOne({_id:result});
     const focusAreaArray = editedCohort.cohortFocusAreaID;
     assert.equal(focusAreaArray.length, 0);
   })

   it('testing for inserting focus area', function() {
     const result = createNewCohort('AY 2015/2016');
     insertFocusAreaToCohort('AY 2015/2016','dfdfd');
     const editedCohort = AcademicCohort.findOne({_id:result});
     const focusAreaArray = editedCohort.cohortFocusAreaID;
     assert.equal(focusAreaArray.length, 1);
     assert.equal(focusAreaArray[0],'dfdfd');
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
  })
});
}
