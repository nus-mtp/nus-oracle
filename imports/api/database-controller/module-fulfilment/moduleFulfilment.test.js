import { assert, expect } from 'meteor/practicalmeteor:chai';
import { ModuleFulfillments } from './moduleFulfillment';

describe('moduleFulfillment test', function() {

  beforeEach( function() {
    const result = ModuleFulfillments.find({});
    console.log("find without cursor returns: " + result);
  });

  it('test empty data', function() {
    assert.equal(1,1);
  });

});
