import { assert, expect } from 'meteor/practicalmeteor:chai';
import { increaseAcadYearByOne } from './util';

describe('utils', function()  {
  it('returns the next academic year given an academic year string', function() {
    const acadYear = 'AY 2014/2015';
    const newAcadYear = increaseAcadYearByOne(acadYear);
    assert.equal(newAcadYear, 'AY 2015/2016');
  });
});
