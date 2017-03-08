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
import { getAllSemestersInPlanner } from '../../../../../../../../crud-controller/semester/methods';

import { findTeamProjectRequirementModules } from './methods';

describe('grad-checker-teamProject', function()  {
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
    const modules = ['Project I', 'Project II'];
    const academicCohort = 'AY 2016/2017';
    const requirementName = 'Computer Systems Team Project';
    const allSemesters = getAllSemestersInPlanner(plannerIDs[4]);

    const teamProjectModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName]

    const markedTeamProjectModulesAndMCs = findTeamProjectRequirementModules(academicCohort, allSemesters, teamProjectModules, {}, {}, requiredMCs);
    assert.isTrue(markedTeamProjectModulesAndMCs.markedTeamProjectModules[modules[0]], 'CS3283 fulfiled');
    assert.isTrue(markedTeamProjectModulesAndMCs.markedTeamProjectModules[modules[1]], 'CS3284 fulfiled');
    assert.isTrue(markedTeamProjectModulesAndMCs.moduleChecked['CS3283'], 'CS3283 checked');
    assert.isTrue(markedTeamProjectModulesAndMCs.moduleChecked['CS3284'], 'CS3284 checked');

    assert.equal(markedTeamProjectModulesAndMCs.totalModuleMCs, 8);
    assert.equal(markedTeamProjectModulesAndMCs.numberOfTeamProjectModulesMarkedTrue, 2);
  })
});
