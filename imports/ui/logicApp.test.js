import { assert } from 'meteor/practicalmeteor:chai';
import { Atom } from './logicApp.js';

describe('logicApp', function () {
  it('my test', function () {
    assert.equal(Atom.value, 1);
  });
});
