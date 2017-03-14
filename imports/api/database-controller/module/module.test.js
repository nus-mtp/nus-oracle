import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Modules } from './module';
import {
  removeAllModule,
  searchByModuleCode,
  insertToModuleCollection,
  isEmptyModuleCollection,
  isExistModuleCollection,
  searchByModuleCodeAndNameRegex,
  retrieveAllModule,
} from './methods';
if(Meteor.isServer){
  describe ('module', function() {

    // sample test for database
    const sampleModuleOne = {
      moduleCode:'CS1234',
      moduleName:'Computing 101',
      moduleDescription: 'Adrian Made This',
      modulePrerequisite: 'H2 Mathematic',
      moduleCorequisite: 'none',
      modulePreclusion: 'none',
      moduleMC: 200,
      termOffered: [
        {'termYear': '15/16',
          'semester': 1},
        {'termYear': '16/17',
          'semester': 1},
      ],
    };

    const sampleModuleTwo = {
      moduleCode:'CS0000',
      moduleName:'Sample Computing',
      moduleDescription: 'WENHAN Made This',
      modulePrerequisite: 'H2 Arts',
      moduleCorequisite: 'none',
      modulePreclusion: 'none',
      moduleMC: 200,
      termOffered: [
        {'termYear': '15/16',
          'semester': 1},
        {'termYear': '15/16',
          'semester': 2},
      ],
    };

    const sampleModuleMissingTermOffered = {
      moduleCode:'CS1111',
      moduleName:'Sample Computing',
      moduleDescription: 'WENHAN Made This',
      modulePrerequisite: 'H2 Arts',
      modulePreclusion: 'none',
      moduleCorequisite: 'none',
      moduleMC: 200,
      termOffered: [],
    };

    const emptyModule = {};

    const sampleModuleNoCorequisite = {
      moduleCode:'CS3456',
      moduleName:'Level 3000 Computing',
      moduleDescription: 'Brandon is Here',
      modulePreclusion: 'none',
      modulePrerequisite: 'H2 Arts',
      moduleMC: 100,
      termOffered: [
        {'termYear': '15/16',
          'semester': 1},
      ],
    };

    const sampleModuleMissingInfos = {
      moduleCode:'CS5788',
      moduleName:'Level 5000 Computing',
      moduleMC: 2000,
      termOffered: [
        {'termYear': '16/17',
          'semester': 1},
      ],
    };

    const CorruptedModule = {
      moduleName:'CorruptedModule',
      moduleCode:'CS1234',
      moduleDescription: NaN,
      modulePrerequisite: NaN,
      moduleCorequisite: NaN,
      modulePreclusion: NaN,
      moduleMC: 200,
      termOffered: [
        {'termYear': '16/17',
         'semester': 1},
        {'termYear': '16/17',
         'semester': 2},
      ],
    };

    beforeEach(function () {
      removeAllModule();
    });

    afterEach(function() {
      removeAllModule();
    });

    it('should be able to store module data that fits the schema', function() {
      Modules.insert(sampleModuleOne);
      const firstPass = retrieveAllModule();
      assert.equal(firstPass.length, 1);
      assert.equal(firstPass[0].moduleCode, 'CS1234');
      assert.equal(firstPass[0].moduleMC, 200);
      assert.equal(firstPass[0].moduleCorequisite,'none');
      assert.equal(firstPass[0].modulePreclusion,'none');

    });

    it('should be empty after you call removeAllModule', function(){
      const result = retrieveAllModule();
      assert.equal(result.length,0);
    });


    it('should accept modules without termOffered data', function() {
      Modules.insert(sampleModuleTwo);
      Modules.insert(sampleModuleMissingTermOffered);
      assert.equal(retrieveAllModule().length, 2);
      const moduleWithoutTest= Modules.findOne({moduleCode: 'CS1111'});
      assert.equal(moduleWithoutTest.moduleCode, 'CS1111');
      //console.log(moduleWithoutTest.termOffered);
    });

    it('should accept module data without corequisite', function () {
      Modules.insert(sampleModuleNoCorequisite);
      assert.equal(retrieveAllModule().length, 1);
    });
    //// unresolved test ////
    it('should reject empty data', function() {
      try {
        Modules.insert(emptyModule);
      } catch (E) {

      }
        assert.equal(retrieveAllModule().length,0);
  });

    //it('should reject module with missing vital info', function() {
    //  const insertResult = Modules.insert(sampleModuleMissingInfos);
    //  assert.equal(insertResult,undefined);
    //})

  });

}
