import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populatePlannerFixture } from '../../../../../../../test-fixtures/planner';
import { populateModuleFulfilmentFixture } from '../../../../../../../test-fixtures/moduleFulfilment';
import { populateGraduationRequirementsFixture } from '../../../../../../../test-fixtures/graduationRequirements';
import { findFoundationRequirementModules } from './methods';

describe('grad-checker-foundation', function()  {
  before(function (done)  {
    populatePlannerFixture();
    populateModuleFulfilmentFixture();
    populateGraduationRequirementsFixture();
  });

  after(function (done) {

  });

  it ('checks if find modules correct boolean values', function() {
    const academicCohort = 'AY 2016/2017';
    const foundationModules = '';

  })

});
