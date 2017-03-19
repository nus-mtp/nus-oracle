import { assert, expect } from 'meteor/practicalmeteor:chai';
import { ModuleFulfilments } from './moduleFulfilment';
import { createNewModuleFulfilment,
        getModuleFulfilment,
        updateModuleMappingOfModuleFulfilment,
        removeOneModuleFulfilment } from './methods';

if (Meteor.isServer){
  describe('moduleFulfilment test', function() {
    const moduleCode1 = 'CS1010';
    const moduleCode2 = 'CS1020';
    const dummyAcademicYear = 'AY 2015/2016';
    const moduleListing1 = ['CS1010S','CS1010E','CS1010'];
    const moduleListing2 = ['CS1020E', 'CS2020'];
    const storeID = [];

    beforeEach( function() {
      Meteor.remove({});
      let id = createNewModuleFulfilment(dummyAcademicYear, moduleCode1,moduleListing1);
      storeID.push(id);
      id = createNewModuleFulfilment(dummyAcademicYear, moduleCode2, moduleListing2);
      storeID.push(id);

      assert.equal(ModuleFulfilments.find({}).fetch().length,2);
    });

    afterEach(function() {
      for(var i = 0; i < storeID.length; i++){
        ModuleFulfilments.remove({_id:storeID[i]});
      }
      while(storeID.length > 0){
        storeID.pop();
      }
    })

    it('return the correct module listing if exist in DB', function() {
      const result = getModuleFulfilment('CS1010');
      assert.equal(result.moduleCode, 'CS1010');
    });

    it('return empty object if the object does not exist in DB', function() {
      const result = getModuleFulfilment('CS2020');
      assert.equal(Object.keys(result).length, 0);
    })

    it('should not remove any module if supplied wrong input', function() {
      removeOneModuleFulfilment('CS1010');
      assert.equal(ModuleFulfilments.find({}).fetch().length, 2);
    })

    it('should be able to rewrite existing moduleListing in a moduleFulfilment Document', function() {
      const newModuleListing = [];
      updateModuleMappingOfModuleFulfilment('AY 2015/2016', 'CS1010', newModuleListing);
      const result = getModuleFulfilment('CS1010');
      assert.equal(result.moduleMapping['AY 2015/2016'].moduleEquivalent.length,newModuleListing.length);
    })

    it('should be able to add new moduleListing in a moduleFulfilment Document', function() {
      const newModuleListing = ['CS1010E', 'CS1010S', 'CS1010X','CS1010J'];
      updateModuleMappingOfModuleFulfilment('AY 2016/2017', 'CS1010', newModuleListing);
      const result = getModuleFulfilment('CS1010');
      assert.equal(result.moduleMapping['AY 2016/2017'].moduleEquivalent.length,newModuleListing.length) ;
    })

  });
}
