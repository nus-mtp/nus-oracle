import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populateFocusAreaModuleFixture,
         dePopulateModuleFixture } from '../../../../../../../../test-fixtures/modules';
import { populateFocusAreaPlannerFixture,
         dePopulatePlannerFixture } from '../../../../../../../../test-fixtures/planner';
import { populateComputerGraphicsFocusAreaRequirementsFixture,
         dePopulateComputerGraphicsFocusAreaRequirementsFixture } from '../../../../../../../../test-fixtures/focusArea';
import { populateGraduationRequirementsFixture,
         dePopulateGraduationRequirementsFixture } from '../../../../../../../../test-fixtures/graduationRequirements';

import { getFocusAreaPrimaryRequirement,
         getFocusArea4KRequirement,
         getFocusAreaNonPrimaryRequirement,
         getFocusAreaPrimary4KRequirement,
         getFocusAreaRequirement } from '../../../../../../../../database-controller/focus-area/methods';
import { getGradRequirementMCs } from '../../../../../../../../database-controller/graduation-requirement/methods';

import { getAllSemestersInPlanner } from '../../../../../../../../crud-controller/semester/methods';

import { checkFocusAreaFulfilmentMCs,
         findFocusAreaModules } from './methods';

describe('grad-checker-focusArea', function()  {
  let plannerIDs = [];
  let focusAreaReqIDs = [];
  let gradFocusAreaID = [];

  beforeEach(function (done)  {
    this.timeout(10000);
    populateFocusAreaModuleFixture();
    plannerIDs = populateFocusAreaPlannerFixture();
    focusAreaReqIDs = populateComputerGraphicsFocusAreaRequirementsFixture();
    gradFocusAreaID = populateGraduationRequirementsFixture();
    done();
  });

  afterEach(function (done) {
    dePopulateModuleFixture();
    dePopulatePlannerFixture(plannerIDs);
    dePopulateComputerGraphicsFocusAreaRequirementsFixture(focusAreaReqIDs);
    dePopulateGraduationRequirementsFixture(gradFocusAreaID);
    done();
  });

  it ('checks if find focus area MCs return true', function() {
    const academicCohort = 'AY 2015/2016';
    const requirementName = 'Computer Science Focus Area' ;
    const allSemesters = getAllSemestersInPlanner(plannerIDs[0]);

    const focusAreaPrimaryModules = getFocusAreaPrimaryRequirement(focusAreaReqIDs);
    const focusArea4KModules = getFocusArea4KRequirement(focusAreaReqIDs);
    const focusAreaNonPrimaryModules = getFocusAreaNonPrimaryRequirement(focusAreaReqIDs);
    const focusAreaPrimary4KModules = getFocusAreaPrimary4KRequirement(focusAreaReqIDs);

    //const studentFocusAreas = getFocusAreaRequirement(focusAreaReqIDs);
    const requiredMCs = getGradRequirementMCs(gradFocusAreaID)[requirementName];

    const studentFocusAreas = {
      focusAreaPrimaryModules: focusAreaPrimaryModules,
      focusArea4KModules: focusArea4KModules,
      focusAreaPrimary4KModules: focusAreaPrimary4KModules,
      focusAreaNonPrimaryModules: focusAreaNonPrimaryModules
    }

    const focusAreaMCSFulfilment = checkFocusAreaFulfilmentMCs(allSemesters, studentFocusAreas, requiredMCs);
    assert.isTrue(focusAreaMCSFulfilment.isFulfilled, 'focus area is fulfiled');
    assert.equal(focusAreaMCSFulfilment.requiredMCs, 24);
  })

  it ('checks if focus area requirement modules return true', function() {
    const academicCohort = 'AY 2015/2016';
    const focusAreaName = 'Computer Graphics and Games';
    const allSemesters = getAllSemestersInPlanner(plannerIDs[0]);
    //const focusAreaModules = getFocusAreaRequirement(focusAreaReqIDs);

    //const focusAreaPrimaryModules = focusAreaModules.focusAreaPrimaryModules;
    //const focusArea4KModules = focusAreaModules.focusArea4KModules;
    //const focusAreaNonPrimaryModules = focusAreaModules.focusAreaNonPrimaryModules;

    const focusAreaPrimaryModules = getFocusAreaPrimaryRequirement(focusAreaReqIDs);
    const focusAreaPrimary4KModules = getFocusAreaPrimary4KRequirement(focusAreaReqIDs);
    const focusArea4KModules = getFocusArea4KRequirement(focusAreaReqIDs);
    const focusAreaNonPrimaryModules = getFocusAreaNonPrimaryRequirement(focusAreaReqIDs);

    const studentFocusAreas = {
      focusAreaPrimaryModules: focusAreaPrimaryModules[focusAreaName],
      focusAreaPrimary4KModules: focusAreaPrimary4KModules[focusAreaName],
      focusArea4KModules: focusArea4KModules[focusAreaName],
      focusAreaNonPrimaryModules: focusAreaNonPrimaryModules[focusAreaName]
    }
    const markedFocusAreaModulesAndMCs = findFocusAreaModules(focusAreaName, academicCohort, allSemesters, studentFocusAreas, {}, {});

    assert.isTrue(markedFocusAreaModulesAndMCs.isPrimaryTrue, 'primary focus area is fulfiled');
    assert.isTrue(markedFocusAreaModulesAndMCs.is4KTrue, '4k focus area is fulfiled');
    assert.equal(markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue, 4);
    assert.equal(markedFocusAreaModulesAndMCs.total4KModuleMCs, 16);
  })

});
