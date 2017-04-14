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
import { getAllSemestersInPlanner } from '../../../../../../../student-logic-controller/crud-controller/semester/methods';

import { findITProfessionalismModules } from './methods';

describe('grad-checker-ITProfessionalism', function()  {
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
    const modules = ['IS1103', 'CS2101', 'ES2660'];

    const studentInfoObject = {
      studentAcademicCohort: 'AY 2016/2017',
      studentSemesters: getAllSemestersInPlanner(plannerIDs[2]),
      studentExemptedModules: {},
      studentWaivedModules: {},
      moduleChecked: {}
    }
    const requirementName = 'IT Professionalism';
    const ITProfessionalismModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName]

    const markedITProfessionalismModulesAndMCs = findITProfessionalismModules(studentInfoObject, ITProfessionalismModules, requiredMCs);
    assert.isTrue(markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[modules[0]], 'IS1103 fulfiled');
    assert.isTrue(markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[modules[1]], 'CS2101 fulfiled');
    assert.isFalse(markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[modules[2]], 'ES2660 not fulfiled');
    assert.isTrue(markedITProfessionalismModulesAndMCs.moduleChecked[modules[0]], 'IS1103 checked');
    assert.isTrue(markedITProfessionalismModulesAndMCs.moduleChecked[modules[1]], 'CS2101 checked');

    assert.isFalse(markedITProfessionalismModulesAndMCs.isFulfilled);
    assert.equal(markedITProfessionalismModulesAndMCs.numberOfITProfessionalismModulesMarkedTrue, 2);
    assert.equal(markedITProfessionalismModulesAndMCs.totalModuleMCs, 8);
  })

});
