import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sendQuery } from '../searcher-controller/controller';
import  { populateModuleFixture } from './fixtures';


describe('search-controller', function() {
  populateModuleFixture();

  describe('methods testing', function()  {
    it('full module code search query returns correct modules', function() {
      const code = 'CS1010';
      const moduleArrayResults = sendQuery(code);
      assert.equal(moduleArrayResults.length, 5);
    });

    it ('half finished module code search query returns correct modules', function()  {
      const code = '1010';
      const moduleArrayResults = sendQuery(code);

      assert.equal(moduleArrayResults.length, 5);
    });

    it ('no matching string returns no module', function()  {
      const code = '9032';
      const moduleArrayResults = sendQuery(code);

      assert.equal(moduleArrayResults.length, 0);
    });
  });
});
