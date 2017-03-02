import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Students } from './student';
import { populateModuleFixture,
         dePopulateModuleFixture } from '../../integration-tests/fixtures';
import { createNewStudent,
         getStudentAcademicCohortGivenStudentID,
         getStudentPreviousEducationGivenStudentID,
         updateStudentAcademicCohortGivenStudentID,
         updateStudentPreviousEducationGivenStudentID,
         addStudentExemptedModuleGivenStudentID,
         deleteStudentExemptedModuleGivenStudentID,
         addStudentWaviedModuleGivenStudentID,
         deleteStudentWaivedModuleGivenStudentID } from './methods';

if (Meteor.isServer){
  describe('studentDB', function() {
    // basic set up
    beforeEach(function (done) {
      populateModuleFixture();
      Students.remove({});
      done();
    });
    afterEach(function(done) {
      dePopulateModuleFixture();
      Students.remove({});
      done();
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
      const queriedAcadCohort = getStudentAcademicCohortGivenStudentID(studentID);
      assert.equal(queriedAcadCohort, 'AY 2015/2016');
    });

    it('should return correct previous education', function() {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      const queriedPrevEducation = getStudentPreviousEducationGivenStudentID(studentID);
      assert.equal(queriedPrevEducation, 'SchoolDontHave');
    });

    it('Update the previous education if the ID exists', function() {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      updateStudentPreviousEducationGivenStudentID('Primary School', studentID);
      const queriedPrevEducation = getStudentPreviousEducationGivenStudentID(studentID);
      assert.equal(queriedPrevEducation, 'Primary School');
    });

    it('Update the academic Cohort if the ID exists', function() {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      updateStudentAcademicCohortGivenStudentID('AY 2016/2017', studentID);
      const queriedCohort = getStudentAcademicCohortGivenStudentID(studentID);
      assert.equal(queriedCohort, 'AY 2016/2017');
    });

    it ('Add one exempted module if the ID exists', function() {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      const exemptedModule = 'CS1010';
      const numberOfDocsUpdated = addStudentExemptedModuleGivenStudentID(exemptedModule, studentID, function(error, affectDocs) {
        assert.equal(numberOfDocsUpdated, 1);
        const module = Students.findOne(studentID).studentExemptedModule[exemptedModule];
        assert.equal(module, exemptedModule);
      });
    });

    it ('Does not add exempted module if module does not exists', function()  {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      const exemptedModule = 'CS0000';
      const numberOfDocsUpdated = addStudentExemptedModuleGivenStudentID(exemptedModule, studentID);

      assert.equal(numberOfDocsUpdated, 0);
    });

    it ('Delete one exempted module if the ID exists', function() {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      const exemptedModule = 'CS1010';
      addStudentExemptedModuleGivenStudentID(exemptedModule, studentID, function(error, affectDocs)  {
        const numberOfDocsUpdated = deleteStudentExemptedModuleGivenStudentID(exemptedModule, studentID);
        assert.equal(numberOfDocsUpdated, 1);
      });
    });

    it ('Add one waived modules if the ID exists', function() {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      const waivedModule = 'CS1020';
      const numberOfDocsUpdated = addStudentWaviedModuleGivenStudentID(waivedModule, studentID, function(error, affectDocs) {
        assert.equal(numberOfDocsUpdated, 1);
        assert.equal(Students.findOne(studentID).studentWaivedModule[waivedModule], waivedModule);
      });
    });

    it ('Does not add waived module if module does not exists', function()  {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      const waivedModule = 'CS0000';
      const numberOfDocsUpdated = addStudentWaviedModuleGivenStudentID(waivedModule, studentID);

      assert.equal(numberOfDocsUpdated, 0);
    });


    it ('Delete one waived modules if the ID exists', function()  {
      const studentID = createNewStudent('a12345', 'AY 2015/2016', 'SchoolDontHave');
      const waivedModule = 'CS1020';
      addStudentWaviedModuleGivenStudentID(waivedModule, studentID, function(error, affectDocs)  {
        const numberOfDocsUpdated = deleteStudentWaivedModuleGivenStudentID(waivedModule, studentID);
        assert.equal(numberOfDocsUpdated, 1);
      });
    });
  });

}
