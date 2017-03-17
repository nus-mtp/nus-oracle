import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populateFocusAreaModuleFixture,
         dePopulateModuleFixture } from '../../../../../../../../test-fixtures/modules';
import { populateFocusAreaPlannerFixture,
         dePopulatePlannerFixture } from '../../../../../../../../test-fixtures/planner';
import { populateComputerGraphicsFocusAreaRequirementsFixture,
         dePopulateComputerGraphicsFocusAreaRequirementsFixture } from '../../../../../../../../test-fixtures/focusArea';

import { getFocusAreaPrimaryRequirement,
         getFocusArea4KRequirement,
         getFocusAreaNonPrimaryRequirement,
         getFocusAreaGradRequirementMCs } from '../../../../../../../../database-controller/focus-area/methods';
import { getAllSemestersInPlanner } from '../../../../../../../../crud-controller/semester/methods';

import { checkFocusAreaFulfilmentMCs,
         findFocusAreaModules } from './methods';

describe('grad-checker-focusArea', function()  {
  let plannerIDs = [];
  let focusAreaReqIDs = [];

  beforeEach(function (done)  {
    this.timeout(10000);
    populateFocusAreaModuleFixture();
    plannerIDs = populateFocusAreaPlannerFixture();
    focusAreaReqIDs = populateComputerGraphicsFocusAreaRequirementsFixture();
    done();
  });

  afterEach(function (done) {
    dePopulateModuleFixture();
    dePopulatePlannerFixture(plannerIDs);
    dePopulateComputerGraphicsFocusAreaRequirementsFixture(focusAreaReqIDs);
    done();
  });

  it ('checks if find focus area MCs return true', function() {
    const primaryModules = ['CS3241', 'CS3242', 'CS3247', 'CS4247', 'CS4350'];
    const academicCohort = 'AY 2016/2017';
    const requirementName = 'Computer Graphics and Games';
    const allSemesters = getAllSemestersInPlanner(plannerIDs[0]);

    const focusAreaPrimaryModules = getFocusAreaPrimaryRequirement(focusAreaReqIDs);
    const focusArea4KModules = getFocusArea4KRequirement(focusAreaReqIDs);
    const focusAreaNonPrimaryModules = getFocusAreaNonPrimaryRequirement(focusAreaReqIDs);
    const requiredMCs = getFocusAreaGradRequirementMCs(focusAreaReqIDs);

    const studentFocusAreas = {
      focusAreaPrimaryModules: focusAreaPrimaryModules,
      focusArea4KModules: focusArea4KModules,
      focusAreaNonPrimaryModules: focusAreaNonPrimaryModules
    }
    const focusAreaMCSFulfilment = checkFocusAreaFulfilmentMCs(allSemesters, studentFocusAreas, requiredMCs);
    assert.isTrue(focusAreaMCSFulfilment, 'focus area is fulfiled');
  })

  it ('checks if focus area requirement modules return true', function() {
    const primaryModules = ['CS3241', 'CS3242', 'CS3247', 'CS4247', 'CS4350'];
    const academicCohort = 'AY 2016/2017';
    const requirementName = 'Computer Graphics and Games';
    const allSemesters = getAllSemestersInPlanner(plannerIDs[0]);

    const focusAreaPrimaryModules = getFocusAreaPrimaryRequirement(focusAreaReqIDs);
    const focusArea4KModules = getFocusArea4KRequirement(focusAreaReqIDs);
    const focusAreaNonPrimaryModules = getFocusAreaNonPrimaryRequirement(focusAreaReqIDs);
    const requiredMCs = getFocusAreaGradRequirementMCs(focusAreaReqIDs);

    const studentFocusAreas = {
      focusAreaPrimaryModules: focusAreaPrimaryModules[requirementName],
      focusArea4KModules: focusArea4KModules[requirementName],
      focusAreaNonPrimaryModules: focusAreaNonPrimaryModules[requirementName]
    }
    const markedFocusAreaModulesAndMCs = findFocusAreaModules(requirementName, academicCohort, allSemesters, studentFocusAreas, {}, {}, requiredMCs);

    assert.isTrue(markedFocusAreaModulesAndMCs.isPrimaryTrue, 'primary focus area is fulfiled');
    assert.isTrue(markedFocusAreaModulesAndMCs.is4KTrue, '4k focus area is fulfiled');
    assert.equal(markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue, 3);
    assert.equal(markedFocusAreaModulesAndMCs.requiredMCs, 24);
  })

});
