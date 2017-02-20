import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Students } from './student';
import { createNewStudent,
         getStudentAcademicCohort,
         getStudentPreviousEducation } from './methods';

if (Meteor.isServer){
  describe('studentDB', function() {
    // basic set up
    beforeEach(function () {
      Students.remove({});
    });
    afterEach(function() {
      Students.remove({});
    });

    //Case of Student Data input
    it('should accept input that adhere to the schema', function() {
        createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
        assert.equal(Students.find({}).fetch().length,1);
    });

    it('should reject invalid input type', function() {
      createNewStudent('a12345', 2016, 'SchoolDontHave');
      assert.equal(Students.find({}).fetch().length,0);
    });

    it('should return the correct student academic cohort', function() {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      const queriedAcadCohort = getStudentAcademicCohort(studentID);
      assert.equal(queriedAcadCohort, 'AY 2015/2016');
    });

    it('should return correct previous education', function() {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      const queriedPrevEducation = getStudentPreviousEducation(studentID);
      assert.equal(queriedPrevEducation, 'SchoolDontHave');
    });
  });

}
