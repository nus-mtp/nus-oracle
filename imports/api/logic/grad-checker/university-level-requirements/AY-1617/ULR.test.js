import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populateULRModuleFixture,
         dePopulateModuleFixture } from '../../../../test-fixtures/modules';
import { populateULRFixture,
         dePopulatePlannerFixture } from '../../../../test-fixtures/planner';
import { populateULRModuleFulfilment,
         dePopulateModuleFulfilmentFixture } from '../../../../test-fixtures/moduleFulfilment';
import { populateGraduationRequirementsFixture,
         dePopulateGraduationRequirementsFixture } from '../../../../test-fixtures/graduationRequirements';

import { getGradRequirementModules,
         getGradRequirementMCs } from '../../../../database-controller/graduation-requirement/methods';
import { getAllSemestersInPlanner } from '../../../../student-logic-controller/crud-controller/semester/methods';

import { findULRRequirementModules } from './methods';

describe('grad-checker-ULR', function()  {
  let plannerIDs = [];
  let graduationIDs = [];
  let fulfilmentIDs = [];

  beforeEach(function (done)  {
    this.timeout(10000);
    populateULRModuleFixture();
    plannerIDs = populateULRFixture();
    graduationIDs = populateGraduationRequirementsFixture();
    fulfilmentIDs = populateULRModuleFulfilment();
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
    const modules = ['Human Cultures', 'Asking Questions', 'Quantitative Reasoning',
                     'Singapore Studies', 'Thinking and Expression'];

    const studentInfoObject = {
     studentAcademicCohort: 'AY 2016/2017',
     studentSemesters: getAllSemestersInPlanner(plannerIDs[0]),
     studentExemptedModules: {},
     studentWaivedModules: {},
     moduleChecked: {}
    }

    const requirementName = 'University Level Requirement';
    const ULRModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName];

    const markedULRModulesAndMCs = findULRRequirementModules(studentInfoObject, ULRModules, requiredMCs);
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[modules[0]], 'GEH1001 fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[modules[1]], 'GEQ1917 fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[modules[2]], 'GER1000 fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[modules[3]], 'GES1002 fulfiled');
    assert.isTrue(markedULRModulesAndMCs.markedULRModules[modules[4]], 'GET1006 fulfiled');

    assert.isTrue(markedULRModulesAndMCs.moduleChecked['GEH1001'], 'GEH1001 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['GEQ1917'], 'GEQ1917 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['GER1000'], 'GER1000 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['GES1002'], 'GES1002 checked');
    assert.isTrue(markedULRModulesAndMCs.moduleChecked['GET1006'], 'GET1006 checked');

    assert.equal(markedULRModulesAndMCs.numberOfULRMarkedTrue, 5);
    assert.equal(markedULRModulesAndMCs.totalModuleMCs, 20);
  })

});
