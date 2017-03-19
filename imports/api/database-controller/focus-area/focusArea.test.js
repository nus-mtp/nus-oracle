import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Modules } from '../module/module';
import { FocusArea } from './focusArea';
import { createNewFocusArea,
         createModuleListObject,
         consolidateModuleArrayValidity,
         getFocusAreaIDByName } from './methods';

describe('focus area test', function() {
  if(Meteor.isServer){
    const focusAreaOneName = "Focus Area 1";
    const focusAreaOneListPrimary = ['default1','default2'];
    const focusAreaOneListFourK = ['de4000','de4001'];
    const focusAreaOneElective = ['default4','default3'];

    const focusAreaTwoName = "Focus Area 2";
    const focusAreaTwoListPrimary = ['default6','default5'];
    const focusAreaTwoListFourK = ['de4001','de4002'];
    const focusAreaTwoElective = ['default7','default8'];

    const moduleDefault1 = {
      moduleCode: 'default1',
      moduleName: 'defaultModuleName',
      moduleDescription: 'loremIpsum',
      modulePrerequisite: 'loremIpsum',
      moduleCorequisite: 'loremIpsum',
      modulePreclusion: 'loremIpsum',
      moduleMC: 0,
      termOffered: [
        {
          "termYear": "AY 2014/2015",
          "semester": 1
        },
        {
          "termYear": "AY 2014/2015",
          "semester": 2
        }
      ]
    };

    const moduleDefault2 = {
      moduleCode: 'default2',
      moduleName: 'defaultModuleName',
      moduleDescription: 'loremIpsum',
      modulePrerequisite: 'loremIpsum',
      moduleCorequisite: 'loremIpsum',
      modulePreclusion: 'loremIpsum',
      moduleMC: 0,
      termOffered: [
        {
          "termYear": "AY 2014/2015",
          "semester": 1
        },
        {
          "termYear": "AY 2014/2015",
          "semester": 2
        }
      ]
    };
/*
    const moduleDefault3 = {
      moduleCode: 'default3',
      moduleName: 'defaultModuleName',
      moduleDescription: 'loremIpsum',
      modulePrerequisite: 'loremIpsum',
      moduleCorequisite: 'loremIpsum',
      modulePreclusion: 'loremIpsum',
      moduleMC: 'loremIpsum',
      termOffered: [
        {
          "termYear": "AY 2014/2015",
          "semester": 1
        },
        {
          "termYear": "AY 2014/2015",
          "semester": 2
        }
      ]
    };

    const moduleDefault4 = {
      moduleCode: 'default4',
      moduleName: 'defaultModuleName',
      moduleDescription: 'loremIpsum',
      modulePrerequisite: 'loremIpsum',
      moduleCorequisite: 'loremIpsum',
      modulePreclusion: 'loremIpsum',
      moduleMC: 'loremIpsum',
      termOffered: [
        {
          "termYear": "AY 2014/2015",
          "semester": 1
        },
        {
          "termYear": "AY 2014/2015",
          "semester": 2
        }
      ]
    };
*/
    beforeEach(function() {
      createNewFocusArea(focusAreaOneName,focusAreaOneListPrimary, focusAreaOneListFourK, focusAreaOneElective);
      createNewFocusArea(focusAreaTwoName,focusAreaTwoListPrimary, focusAreaTwoListFourK, focusAreaTwoElective);
      Modules.insert(moduleDefault1);
      Modules.insert(moduleDefault2);
    });
    afterEach(function() {
      FocusArea.remove({});
      Modules.remove({});
    });

    it('should contain two focus area after beforeEach function', function(){
      const firstFocusArea = FocusArea.findOne({"name": "Focus Area 1"})
      assert.equal(Object.keys(firstFocusArea.moduleListPrimary).length,2);
      assert.equal(Object.keys(firstFocusArea.moduleListFourThousands).length,2);
      assert.equal(Object.keys(firstFocusArea.moduleListElectives).length,2);

      const secondFocusArea = FocusArea.findOne({"name": "Focus Area 2"})
      assert.equal(Object.keys(secondFocusArea.moduleListPrimary).length,2);
      assert.equal(Object.keys(secondFocusArea.moduleListFourThousands).length,2);
      assert.equal(Object.keys(secondFocusArea.moduleListElectives).length,2);
    });

    it('createModuleListObject should return an object of object key and boolean value pair', function(){
      const newModuleListObject = createModuleListObject(focusAreaOneListPrimary);

      assert.equal(Object.keys(newModuleListObject).length,2);
      for(var moduleCode in newModuleListObject){
        assert.equal(newModuleListObject[moduleCode],false);
      };
    });

    it('should reject module that does not exist in module DB in consolidateModuleArrayValidity', function() {
      const notInModuleCollectionConsolidatedModuleArray = consolidateModuleArrayValidity(focusAreaTwoElective);
      assert.equal(notInModuleCollectionConsolidatedModuleArray.length,0);

      const inModuleCollectionConsolidatedModuleArray = consolidateModuleArrayValidity(focusAreaOneListPrimary);
      assert.equal(inModuleCollectionConsolidatedModuleArray.length,2);
      assert.equal(inModuleCollectionConsolidatedModuleArray[0],'default1');
      assert.equal(inModuleCollectionConsolidatedModuleArray[1],'default2');
    });

    it('should return empty string when finding ID of focus area name that does not exist', function(){
      const searchResult = getFocusAreaIDByName('this focus area does not exist');
      assert.equal(searchResult,'');
    });

    it('should return the ID of focus area name that exist', function(){
      const searchResult = getFocusAreaIDByName('Focus Area 1');
      const documentOfFoundID = FocusArea.findOne({_id: searchResult});

      assert.equal(documentOfFoundID["name"], 'Focus Area 1');
      assert.equal(documentOfFoundID["_id"]. searchResult);
    });
  }
})
