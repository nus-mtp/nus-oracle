import { assert, expect } from 'meteor/practicalmeteor:chai';

import {
  removeAllModule,
  searchByModuleCode,
  insertToModuleCollection,
  isEmptyModuleCollection,
  isExistModuleCollection,
  searchByModuleCodeRegex,
  retrieveAllModule,
} from './methods';

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

  const sampleModuleNoPreclusion = {
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

  Modules.insert(sampleModuleOne);
  const firstPass = retrieveAllModule();

  it('should be able to store module data that fits the schema', function() {
    assert.equal(firstPass.length, 1);
    assert.equal(firstPass.moduleCode, 'CS1234');
    assert.equal(firstPass.moduleMC, 200);
    assert.equal(firstPass.moduleCorequisite,'none');
    assert.equal(firstPass.modulePreclusion,'none');
  });



})
