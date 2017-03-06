import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populateModuleFixture,
         dePopulateModuleFixture } from '../../../../../../../test-fixtures/modules';
import { populatePlannerFixture,
         dePopulatePlannerFixture } from '../../../../../../../test-fixtures/planner';
import { populateModuleFulfilmentFixture,
         dePopulateModuleFulfilmentFixture } from '../../../../../../../test-fixtures/moduleFulfilment';
import { populateGraduationRequirementsFixture,
         dePopulateGraduationRequirementsFixture } from '../../../../../../../test-fixtures/graduationRequirements';

import { getGradRequirementModules } from '../../../../../../../database-controller/graduation-requirement/methods';
import { getAllSemestersInPlanner } from '../../../../../../../crud-controller/semester/methods';

import { findFoundationRequirementModules } from './methods';

describe('grad-checker-foundation', function()  {
  let plannerIDs = [];
  let graduationIDs = [];
  let fulfilmentIDs = [];

  beforeEach(function (done)  {
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
    modules = ['CS1010', 'CS1020', 'CS2010', 'CS3230'];
    const academicCohort = 'AY 2016/2017';
    const requirementName = 'Computer Science Foundation';
    const allSemesters = getAllSemestersInPlanner(plannerIDs[0]);
    const foundationModules = getGradRequirementModules(graduationIDs)[requirementName];

    const markedFoundationModules = findFoundationRequirementModules(academicCohort, allSemesters, foundationModules, {}, {});
    assert.isTrue(markedFoundationModules[modules[0]], 'CS1010 fulfiled');
    assert.isTrue(markedFoundationModules[modules[1]], 'CS1020 fulfiled');
    assert.isTrue(markedFoundationModules[modules[2]], 'CS2010 fulfiled');
    assert.isTrue(markedFoundationModules[modules[3]], 'CS3230 fulfiled');
    assert.isFalse(markedFoundationModules['CS1231'], 'CS1231 not fulfiled');
  })

});