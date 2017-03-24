import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populateModuleFixture,
         dePopulateModuleFixture } from '../../../../../../../test-fixtures/modules';
import { populatePlannerFixture,
         dePopulatePlannerFixture } from '../../../../../../../test-fixtures/planner';
import { populateAY1516ComSciITFulfilment,
         dePopulateModuleFulfilmentFixture } from '../../../../../../../test-fixtures/moduleFulfilment';
import { populateAY1516GraduationRequirementsFixture,
         dePopulateGraduationRequirementsFixture } from '../../../../../../../test-fixtures/graduationRequirements';

import { getGradRequirementModules,
         getGradRequirementMCs } from '../../../../../../../database-controller/graduation-requirement/methods';
import { getAllSemestersInPlanner } from '../../../../../../../crud-controller/semester/methods';

import { findITProfessionalismModules } from './methods';

describe('grad-checker-ITProfessionalism', function()  {
  let plannerIDs = [];
  let graduationIDs = [];
  let fulfilmentIDs = [];

  beforeEach(function (done)  {
    this.timeout(10000);
    populateModuleFixture();
    plannerIDs = populatePlannerFixture();
    graduationIDs = populateAY1516GraduationRequirementsFixture();
    fulfilmentIDs = populateAY1516ComSciITFulfilment();
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
    const modules = ['IS1103', 'CS2101'];
    const academicCohort = 'AY 2015/2016';
    const requirementName = 'IT Professionalism';
    const allSemesters = getAllSemestersInPlanner(plannerIDs[2]);
    const ITProfessionalismModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName];

    const markedITProfessionalismModulesAndMCs = findITProfessionalismModules(academicCohort, allSemesters, ITProfessionalismModules, {}, {}, requiredMCs);
    assert.isTrue(markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[modules[0]], 'IS1103 fulfiled');
    assert.isTrue(markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[modules[1]], 'CS2101 fulfiled');
    assert.isTrue(markedITProfessionalismModulesAndMCs.moduleChecked[modules[0]], 'IS1103 checked');
    assert.isTrue(markedITProfessionalismModulesAndMCs.moduleChecked[modules[1]], 'CS2101 checked');

    assert.isTrue(markedITProfessionalismModulesAndMCs.isFulfilled);
    assert.equal(markedITProfessionalismModulesAndMCs.numberOfITProfessionalismModulesMarkedTrue, 2);
    assert.equal(markedITProfessionalismModulesAndMCs.totalModuleMCs, 8);
  })

});
