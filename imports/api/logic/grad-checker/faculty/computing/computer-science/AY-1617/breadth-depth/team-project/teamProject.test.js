import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populateModuleFixture,
         dePopulateModuleFixture } from '../../../../../../../../test-fixtures/modules';
import { populatePlannerFixture,
         dePopulatePlannerFixture } from '../../../../../../../../test-fixtures/planner';
import { populateModuleFulfilmentFixture,
         dePopulateModuleFulfilmentFixture } from '../../../../../../../../test-fixtures/moduleFulfilment';
import { populateGraduationRequirementsFixture,
         dePopulateGraduationRequirementsFixture } from '../../../../../../../../test-fixtures/graduationRequirements';

import { getGradRequirementModules,
         getGradRequirementMCs } from '../../../../../../../../database-controller/graduation-requirement/methods';
import { getAllSemestersInPlanner } from '../../../../../../../../student-logic-controller/crud-controller/semester/methods';

import { findTeamProjectRequirementModules } from './methods';

describe('grad-checker-teamProject', function()  {
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
    const modules = ['Project I', 'Project II'];

    const studentInfoObject = {
      studentAcademicCohort: 'AY 2016/2017',
      studentSemesters: getAllSemestersInPlanner(plannerIDs[4]),
      studentExemptedModules: {},
      studentWaivedModules: {},
      moduleChecked: {}
    }
    const requirementName = 'Computer Systems Team Project';
    const teamProjectModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName];

    const markedTeamProjectModulesAndMCs = findTeamProjectRequirementModules(studentInfoObject, teamProjectModules, requiredMCs);
    assert.isTrue(markedTeamProjectModulesAndMCs.markedTeamProjectModules[modules[0]], 'CS3283 fulfiled');
    assert.isTrue(markedTeamProjectModulesAndMCs.markedTeamProjectModules[modules[1]], 'CS3284 fulfiled');
    assert.isTrue(markedTeamProjectModulesAndMCs.moduleChecked['CS3283'], 'CS3283 checked');
    assert.isTrue(markedTeamProjectModulesAndMCs.moduleChecked['CS3284'], 'CS3284 checked');

    assert.isTrue(markedTeamProjectModulesAndMCs.isFulfilled);
    assert.equal(markedTeamProjectModulesAndMCs.totalModuleMCs, 8);
    assert.equal(markedTeamProjectModulesAndMCs.numberOfTeamProjectModulesMarkedTrue, 2);
  })
});
