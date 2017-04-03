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
import { getAllSemestersInPlanner } from '../../../../../../../crud-controller/semester/methods';

import { findMathSciRequirementModules } from './methods';

describe('grad-checker-mathSci', function()  {
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
    const modules = ['MA1301', 'MA1521', 'MA1101R', 'ST2334', 'PC1221', 'Science One', 'Science Two' ];
    const academicCohort = 'AY 2016/2017';
    const requirementName = 'Mathematics and Sciences'
    const allSemesters = getAllSemestersInPlanner(plannerIDs[3]);
    const mathScienceModules = getGradRequirementModules(graduationIDs)[requirementName];
    const requiredMCs = getGradRequirementMCs(graduationIDs)[requirementName];
    const moduleChecked = {};

    const markedMathScienceModulesAndMCs = findMathSciRequirementModules(academicCohort, allSemesters, mathScienceModules, {}, {}, moduleChecked, requiredMCs);
    assert.isTrue(markedMathScienceModulesAndMCs.markedMathSciModules[modules[0]], 'MA1301 fulfiled');
    assert.isTrue(markedMathScienceModulesAndMCs.markedMathSciModules[modules[1]], 'MA1521 fulfiled');
    assert.isTrue(markedMathScienceModulesAndMCs.markedMathSciModules[modules[2]], 'MA1101R fulfiled');
    assert.isTrue(markedMathScienceModulesAndMCs.markedMathSciModules[modules[3]], 'ST2334 fulfiled');
    assert.isTrue(markedMathScienceModulesAndMCs.markedMathSciModules[modules[4]], 'PC1221 fulfiled');
    assert.isTrue(markedMathScienceModulesAndMCs.markedMathSciModules[modules[5]], 'Science One fulfiled');
    assert.isTrue(markedMathScienceModulesAndMCs.markedMathSciModules[modules[6]], 'Science Two fulfiled');

    assert.isTrue(markedMathScienceModulesAndMCs.moduleChecked[modules[0]], 'IS1103 checked');
    assert.isTrue(markedMathScienceModulesAndMCs.moduleChecked[modules[1]], 'CS2101 checked');
    assert.isTrue(markedMathScienceModulesAndMCs.moduleChecked[modules[2]], 'IS1103 checked');
    assert.isTrue(markedMathScienceModulesAndMCs.moduleChecked['ST2131'], 'ST2131 checked');
    assert.isTrue(markedMathScienceModulesAndMCs.moduleChecked['ST2132'], 'ST2132 checked');
    assert.isTrue(markedMathScienceModulesAndMCs.moduleChecked['PC1221X'], 'PC1221X checked');
    assert.isTrue(markedMathScienceModulesAndMCs.moduleChecked['LSM1301'], 'LSM1301 checked');

    assert.isTrue(markedMathScienceModulesAndMCs.isFulfilled);
    assert.equal(markedMathScienceModulesAndMCs.numberOfMathSciModulesMarkedTrue, 7);
    assert.equal(markedMathScienceModulesAndMCs.totalModuleMCs, 28);
  })

});
