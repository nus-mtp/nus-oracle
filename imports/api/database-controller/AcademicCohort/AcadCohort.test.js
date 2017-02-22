import { assert, expect } from 'meteor/practicalmeteor:chai';
import { AcademicCohort } from './acadCohort';
import { createNewCohort,
         getAllAcadCohort,
         getCohortByName,
         getCohortByID,
         insertFocusAreaToCohort,
         removeFocusAreaFromCohort} from './methods';

describe('AcademicCohort', function(){
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
   assert.equal(focusAreaArray.length, 2);
   assert.equal(focusAreaArray[1],'dfdfd');
 })

});
