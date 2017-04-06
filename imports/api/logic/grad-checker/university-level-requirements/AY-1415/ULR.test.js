import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populate1415ULRModuleFixture,
         dePopulateModuleFixture } from '../../../../test-fixtures/modules';
import { populate1415ULRFixture,
         dePopulatePlannerFixture } from '../../../../test-fixtures/planner';
import { populate1415ULRModuleFulfilment,
         dePopulateModuleFulfilmentFixture } from '../../../../test-fixtures/moduleFulfilment';
import { populateAY1415GraduationRequirementsFixture,
         dePopulateGraduationRequirementsFixture } from '../../../../test-fixtures/graduationRequirements';

import { getGradRequirementModules,
         getGradRequirementMCs } from '../../../../database-controller/graduation-requirement/methods';
import { getAllSemestersInPlanner } from '../../../../crud-controller/semester/methods';

import { findULRRequirementModules } from './methods';

describe('grad-checker-ULR-1415', function()  {
  let plannerIDs = [];
  let graduationIDs = [];
  let fulfilmentIDs = [];

  beforeEach(function (done)  {
    this.timeout(10000);
    populate1415ULRModuleFixture();
    plannerIDs = populate1415ULRFixture();
    graduationIDs = populateAY1415GraduationRequirementsFixture();
    fulfilmentIDs = populate1415ULRModuleFulfilment();
    done();
  });

  afterEach(function (done) {
    dePopulateModuleFixture();
    dePopulatePlannerFixture(plannerIDs);
    dePopulateGraduationRequirementsFixture(graduationIDs);
    dePopulateModuleFulfilmentFixture(fulfilmentIDs);
    done();
  });

  it ('checks if ULR returns correct boolean values', function() {
    const ULRModules = ['GEM A', 'GEM B', 'Breadth One',
                     'Breadth Two', 'Singapore Studies'];

   const studentInfoObject = {
     studentAcademicCohort: 'AY 2014/2015',
     studentSemesters: getAllSemestersInPlanner(plannerIDs[0]),
     studentExemptedModules: {},
     studentWaivedModules: {},
     moduleChecked: {}
   }
    const requirementName = 'University Level Requirement';
    const ULRGradReqModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName]

    const markedULRModulesAndMCs = findULRRequirementModules(studentInfoObject, ULRGradReqModules, requiredMCs);
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[ULRModules[0]], 'GEM A fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[ULRModules[1]], 'GEM B fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[ULRModules[2]], 'Breadth One fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[ULRModules[3]], 'Breadth Two fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[ULRModules[4]], 'Singapore Studies fulfiled');

    assert.isTrue(markedULRModulesAndMCs.moduleChecked['GEK1002'], 'GEK1002 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['GEK1901'], 'GEK1901 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['ES1541'], 'ES1541 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['JS2230'], 'JS2230 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['SSA2214'], 'SSA2214 checked');

    assert.equal(markedULRModulesAndMCs.numberOfULRMarkedTrue, 5);
    assert.equal(markedULRModulesAndMCs.totalModuleMCs, 20);
  })

  it ('checks if ULR fails check due to CS1010 in planner', function() {
    const ULRModules = ['GEM A', 'GEM B', 'Breadth One',
                     'Breadth Two', 'Singapore Studies'];

    const studentInfoObject = {
      studentAcademicCohort: 'AY 2014/2015',
      studentSemesters: getAllSemestersInPlanner(plannerIDs[1]),
      studentExemptedModules: {},
      studentWaivedModules: {},
      moduleChecked: {}
    }
    const requirementName = 'University Level Requirement';
    const ULRGradReqModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName]

    const markedULRModulesAndMCs = findULRRequirementModules(studentInfoObject, ULRGradReqModules, requiredMCs);
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[ULRModules[0]], 'GEM A fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[ULRModules[1]], 'GEM B fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[ULRModules[2]], 'Breadth One fulfiled');
    assert.isFalse(markedULRModulesAndMCs.markedULRModules[ULRModules[3]], 'Breadth Two not fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[ULRModules[4]], 'Singapore Studies fulfiled');

    assert.isTrue(markedULRModulesAndMCs.moduleChecked['GEK1002'], 'GEK1002 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['GEK1901'], 'GEK1901 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['ES1541'], 'ES1541 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['SSA2214'], 'SSA2214 checked');

    assert.equal(markedULRModulesAndMCs.numberOfULRMarkedTrue, 4);
    assert.equal(markedULRModulesAndMCs.totalModuleMCs, 16);
  })

});
