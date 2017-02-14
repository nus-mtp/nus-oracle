import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sendQuery } from '../searcher-controller/controller';
import  { populateModuleFixture,
          dePopulateModuleFixture } from './fixtures';


describe('search-controller', function() {
  describe('methods testing', function()  {
    beforeEach(function() {
      const database = populateModuleFixture();
      expect(database).to.be.an('array');
      assert.equal(database.length, 8);
    });

    afterEach(function() {
      const database = dePopulateModuleFixture();
      expect(database).to.be.an('array');
      assert.equal(database.length, 0);
    });

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
