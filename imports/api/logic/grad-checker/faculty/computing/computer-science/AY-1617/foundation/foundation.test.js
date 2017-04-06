import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populateModuleFixture,
         dePopulateModuleFixture } from '../../../../../../../test-fixtures/modules';
import { populatePlannerFixture,
         dePopulatePlannerFixture } from '../../../../../../../test-fixtures/planner';
import { populateModuleFulfilmentFixture,
         dePopulateModuleFulfilmentFixture } from '../../../../../../../test-fixtures/moduleFulfilment';
import { populateGraduationRequirementsFixture,
         dePopulateGraduationRequirementsFixture } from '../../../../../../../test-fixtures/graduationRequirements';

import { getGradRequirementModules,
         getGradRequirementMCs } from '../../../../../../../database-controller/graduation-requirement/methods';
import { getAllSemestersInPlanner } from '../../../../../../../crud-controller/semester/methods';

import { findFoundationRequirementModules } from './methods';

describe('grad-checker-foundation', function()  {
  let plannerIDs = [];
  let graduationIDs = [];
  let fulfilmentIDs = [];

  beforeEach(function (done)  {
    this.timeout(10000);
    populateModuleFixture();
    plannerIDs = populatePlannerFixture();
    graduationIDs = populateGraduationRequirementsFixture();
    fulfilmentIDs = populateModuleFulfilmentFixture();
    done();
  });

  afterEach(function (done) {
    dePopulateModuleFixture();
    dePopulatePlannerFixture(plannerIDs);
    dePopulateGraduationRequirementsFixture(graduationIDs);
    dePopulateModuleFulfilmentFixture(fulfilmentIDs);
    done();
  });

  it ('checks if find modules correct boolean values', function() {
    const modules = ['CS1010', 'CS1020', 'CS2010', 'CS3230'];

    const studentInfoObject = {
      studentAcademicCohort: 'AY 2016/2017',
      studentSemesters: getAllSemestersInPlanner(plannerIDs[0]),
      studentExemptedModules: {},
      studentWaivedModules: {},
      moduleChecked: {}
    }

    const requirementName = 'Computer Science Foundation';

    const foundationModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName]

    const markedFoundationModulesAndMCs = findFoundationRequirementModules(studentInfoObject, foundationModules, requiredMCs);
    assert.isTrue(markedFoundationModulesAndMCs.markedFoundationModules[modules[0]], 'CS1010 fulfiled');
    assert.isTrue(markedFoundationModulesAndMCs.markedFoundationModules[modules[1]], 'CS1020 fulfiled');
    assert.isTrue(markedFoundationModulesAndMCs.markedFoundationModules[modules[2]], 'CS2010 fulfiled');
    assert.isTrue(markedFoundationModulesAndMCs.markedFoundationModules[modules[3]], 'CS3230 fulfiled');
    assert.isTrue(markedFoundationModulesAndMCs.moduleChecked[modules[0]], 'CS1010 checked');
    assert.isTrue(markedFoundationModulesAndMCs.moduleChecked[modules[1]], 'CS1020 checked');
    assert.isTrue(markedFoundationModulesAndMCs.moduleChecked[modules[2]], 'CS2010 checked');
    assert.isTrue(markedFoundationModulesAndMCs.moduleChecked[modules[3]], 'CS3230 fulfiled');
    assert.isFalse(markedFoundationModulesAndMCs.markedFoundationModules['CS1231'], 'CS1231 not fulfiled');

    assert.isFalse(markedFoundationModulesAndMCs.isFulfilled);
    assert.equal(markedFoundationModulesAndMCs.totalModuleMCs, 16);
    assert.equal(markedFoundationModulesAndMCs.numberOfFoundationModulesMarkedTrue, 4);
  })

  it ('checks if equivalent, waived and exempted modules return correct boolean values', function() {
    // planner[1] contains 1010X instead of 1010
    const modules = ['CS1010', 'CS1020', 'CS2010'];
    const studentInfoObject = {
      studentAcademicCohort: 'AY 2016/2017',
      studentSemesters: getAllSemestersInPlanner(plannerIDs[1]),
      studentExemptedModules: {
        CS1231: 'CS1231'
      },
      studentWaivedModules: {
        CS3230: 'CS3230'
      },
      moduleChecked: {}
    }

    const requirementName = 'Computer Science Foundation';
    const foundationModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName]

    const markedFoundationModulesAndMCs = findFoundationRequirementModules(studentInfoObject, foundationModules, requiredMCs);
    assert.isTrue(markedFoundationModulesAndMCs.markedFoundationModules[modules[0]], 'CS1010 fulfiled');
    assert.isTrue(markedFoundationModulesAndMCs.markedFoundationModules[modules[1]], 'CS1020 fulfiled');
    assert.isTrue(markedFoundationModulesAndMCs.markedFoundationModules[modules[2]], 'CS2010 fulfiled');
    assert.isTrue(markedFoundationModulesAndMCs.markedFoundationModules['CS1231'], 'CS1231 fulfiled');
    assert.isTrue(markedFoundationModulesAndMCs.markedFoundationModules['CS3230'], 'CS3230 fulfiled');
    assert.isTrue(markedFoundationModulesAndMCs.moduleChecked['CS1010X'], 'CS1010X checked');
    assert.isTrue(markedFoundationModulesAndMCs.moduleChecked[modules[1]], 'CS1020 checked');
    assert.isTrue(markedFoundationModulesAndMCs.moduleChecked[modules[2]], 'CS2010 checked');
    assert.isTrue(markedFoundationModulesAndMCs.moduleChecked['CS1231'], 'CS1231 checked');
    assert.isTrue(markedFoundationModulesAndMCs.moduleChecked['CS3230'], 'CS3230 checked');

    // 16 because waived module does not count to MCs
    assert.isFalse(markedFoundationModulesAndMCs.isFulfilled);
    assert.equal(markedFoundationModulesAndMCs.totalModuleMCs, 16);
    assert.equal(markedFoundationModulesAndMCs.numberOfFoundationModulesMarkedTrue, 5);
  })

});
