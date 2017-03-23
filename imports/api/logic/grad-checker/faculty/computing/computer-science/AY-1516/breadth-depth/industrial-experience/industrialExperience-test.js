import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populateIndustrialAttachmentModuleFixture,
         dePopulateModuleFixture } from '../../../../../../../../test-fixtures/modules';
import { populateIndustrialPlannerFixture,
         dePopulatePlannerFixture } from '../../../../../../../../test-fixtures/planner';
import { populateModuleFulfilmentFixture,
         dePopulateModuleFulfilmentFixture } from '../../../../../../../../test-fixtures/moduleFulfilment';
import { populateAY1516GraduationRequirementsFixture,
         dePopulateGraduationRequirementsFixture } from '../../../../../../../../test-fixtures/graduationRequirements';

import { getGradRequirementModules,
         getGradRequirementMCs } from '../../../../../../../../database-controller/graduation-requirement/methods';
import { getAllSemestersInPlanner } from '../../../../../../../../crud-controller/semester/methods';

import { findIndustrialExperienceTrainingModules } from './methods';

describe('grad-checker-industrialExperience', function()  {
  let plannerIDs = [];
  let graduationIDs = [];
  let fulfilmentIDs = [];

  beforeEach(function (done)  {
    this.timeout(10000);
    populateIndustrialAttachmentModuleFixture();
    plannerIDs = populateIndustrialPlannerFixture();
    graduationIDs = populateAY1516GraduationRequirementsFixture();
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
    const modules = ['ATAP/SIP/Industry Course/NOC/FYP'];
    const academicCohort = 'AY 2015/2016';
    const requirementName = 'Industrial Experience Training';
    const allSemesters = getAllSemestersInPlanner(plannerIDs[0]);

    const industrialExperienceModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName]

    const markedIndustrialExperienceAndMCs = findIndustrialExperienceTrainingModules(academicCohort, allSemesters, industrialExperienceModules, {}, {}, requiredMCs);
    assert.isTrue(markedIndustrialExperienceAndMCs.markedIndustrialExperienceTrainingModules[modules[0]], 'CP3880 fulfiled');
    assert.isTrue(markedIndustrialExperienceAndMCs.moduleChecked['CP3880'], 'CP3880 checked');

    assert.equal(markedIndustrialExperienceAndMCs.totalModuleMCs, 12);
    assert.equal(markedIndustrialExperienceAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue, 1);
  })

  it ('checks return correct boolean values when CP3200 exists and CP3202 does not', function() {
    const modules = ['ATAP/SIP/Industry Course/NOC/FYP'];
    const academicCohort = 'AY 2015/2016';
    const requirementName = 'Industrial Experience Training';
    const allSemesters = getAllSemestersInPlanner(plannerIDs[1]);

    const industrialExperienceModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName]

    const markedIndustrialExperienceAndMCs = findIndustrialExperienceTrainingModules(academicCohort, allSemesters, industrialExperienceModules, {}, {}, requiredMCs);

    assert.isFalse(markedIndustrialExperienceAndMCs.markedIndustrialExperienceTrainingModules[modules[0]], 'CP3200 and CP3202 not fulfiled');
    assert.isTrue(markedIndustrialExperienceAndMCs.moduleChecked['CP3200'], 'CP3200 checked');

    assert.isFalse(markedIndustrialExperienceAndMCs.isFulfilled);
    assert.equal(markedIndustrialExperienceAndMCs.totalModuleMCs, 6);
    assert.equal(markedIndustrialExperienceAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue, 0);
  })
});
