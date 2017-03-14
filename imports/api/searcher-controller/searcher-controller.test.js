import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sendQuery } from '../searcher-controller/controller';
import  { populateModuleFixture,
          dePopulateModuleFixture } from '../test-fixtures/modules';


describe('search-controller', function() {
  describe('methods testing', function()  {
    beforeEach(function(done) {
      const database = populateModuleFixture();
      expect(database).to.be.an('array');
      done();
      //assert.equal(database.length, 8);
    });

    afterEach(function(done) {
      const database = dePopulateModuleFixture();
      expect(database).to.be.an('array');
      done();
      //assert.equal(database.length, 0);
    });

    it('full module code search query returns correct modules', function() {
      const code = 'CS1010';
      const moduleArrayResults = sendQuery(code);

      assert.equal(moduleArrayResults.length, 5);
    });

    it ('module number returns correct modules', function()  {
      const code = '1010';
      const moduleArrayResults = sendQuery(code);

      assert.equal(moduleArrayResults.length, 5);
    });

    it ('module letters returns correct modules', function()  {
      const code = 'cs';
      const moduleArrayResults = sendQuery(code);

      assert.equal(moduleArrayResults.length, 18);
    });

    it ('no matching string returns no module', function()  {
      const code = '9032';
      const moduleArrayResults = sendQuery(code);

      assert.equal(moduleArrayResults.length, 0);
    });

    it ('module name search query returns correct modules', function() {
      const name = 'programming methodology';
      const moduleArrayResults = sendQuery(name);

      assert.equal(moduleArrayResults.length, 5);
    });
  });
});
