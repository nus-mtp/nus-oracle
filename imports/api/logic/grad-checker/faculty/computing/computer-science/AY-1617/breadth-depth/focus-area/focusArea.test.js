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
         findFocusAreaPrimary,
         findFocusArea4KModules } from './methods';

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
    const studentInfoObject = {
      studentAcademicCohort: 'AY 2016/2017',
      studentSemesters: getAllSemestersInPlanner(plannerIDs[0]),
      studentExemptedModules: {},
      studentWaivedModules: {},
      moduleChecked: {}
    }

    const requirementName = 'Computer Science Focus Area' ;
    const focusAreaPrimaryModules = getFocusAreaPrimaryRequirement(focusAreaReqIDs);
    const focusArea4KModules = getFocusArea4KRequirement(focusAreaReqIDs);
    const focusAreaNonPrimaryModules = getFocusAreaNonPrimaryRequirement(focusAreaReqIDs);
    const focusAreaPrimary4KModules = getFocusAreaPrimary4KRequirement(focusAreaReqIDs);

    //const studentFocusAreas = getFocusAreaRequirement(focusAreaReqIDs);
    const requiredMCs = getGradRequirementMCs(gradFocusAreaID)[requirementName];
    const focusAreaModulesChecked = {};

    const studentFocusAreas = {
      focusAreaPrimaryModules: focusAreaPrimaryModules,
      focusArea4KModules: focusArea4KModules,
      focusAreaPrimary4KModules: focusAreaPrimary4KModules,
      focusAreaNonPrimaryModules: focusAreaNonPrimaryModules
    }

    const focusAreaMCSFulfilment = checkFocusAreaFulfilmentMCs(studentInfoObject, focusAreaModulesChecked, studentFocusAreas, requiredMCs);
    assert.isTrue(focusAreaMCSFulfilment.isFulfilled, 'focus area is fulfiled');
  })

  it ('checks if primary focus area requirement modules return true', function() {
    const studentInfoObject = {
      studentAcademicCohort: 'AY 2016/2017',
      studentSemesters: getAllSemestersInPlanner(plannerIDs[0]),
      studentExemptedModules: {},
      studentWaivedModules: {},
      moduleChecked: {}
    }

    const focusAreaName = 'Computer Graphics and Games';
    const focusAreaPrimaryModules = getFocusAreaPrimaryRequirement(focusAreaReqIDs);
    const focusAreaPrimary4KModules = getFocusAreaPrimary4KRequirement(focusAreaReqIDs);

    const focusAreaPrimaryRequiredInfo = {
      name: focusAreaName,
      markedFocusAreaPrimary3KAndLessModules: focusAreaPrimaryModules[focusAreaName],
      markedFocusAreaPrimary4KModules: focusAreaPrimary4KModules[focusAreaName],
      numberOfFocusAreaPrimaryModulesMarkedTrue: 0,
      minNumberOfPrimaryFocusArea: 3, // constant that require changing
      minNumberOfPrimary4K: 1,  // constant that require changing
      moduleChecked: {},
      threePrimaryModules: false,
      one4KModules: false,
      isPrimaryTrue: false,
    };

    const markedFocusAreaModulesAndMCs = findFocusAreaPrimary(focusAreaPrimaryRequiredInfo, studentInfoObject);

    assert.isTrue(markedFocusAreaModulesAndMCs.threePrimaryModules, '3 primary focus area is fulfiled');
    assert.isTrue(markedFocusAreaModulesAndMCs.one4KModules, 'at least 1 4k primary focus area is fulfiled');
    assert.isTrue(markedFocusAreaModulesAndMCs.isPrimaryTrue, 'primary focus area is fulfiled');
  })

  it ('checks if at least 12 MCs of focus area requirement modules return true', function() {
    const studentInfoObject = {
      studentAcademicCohort: 'AY 2016/2017',
      studentSemesters: getAllSemestersInPlanner(plannerIDs[0]),
      studentExemptedModules: {},
      studentWaivedModules: {},
      moduleChecked: {}
    }

    const focusAreaName = 'Computer Graphics and Games';
    const focusArea4KModules = getFocusArea4KRequirement(focusAreaReqIDs);

    const focusAreaAtLeast12MCsOf4KRequiredInfo = {
      markedFocusArea4KModules: focusArea4KModules[focusAreaName],
      total4KModuleMCs: 0,
      module4KChecked: {},
      min4KModuleMCs: 12, // constant that require changing
      is4KTrue: false,
    };

    const markedFocusAreaModulesAndMCs = findFocusArea4KModules(focusAreaAtLeast12MCsOf4KRequiredInfo, studentInfoObject);

    assert.isTrue(markedFocusAreaModulesAndMCs.is4KTrue, 'at least 12MCs of 4K focus area is fulfiled');
  })

});
