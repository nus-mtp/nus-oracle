import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ModuleCollection extends Mongo.Collection{

  insert(moduleData, callBack){
    const moduleDocument = moduleData;
    let result;
    //validate document
    try {
      result = super.insert(moduleData,callBack);
    } catch ( e ) {
      console.log(e);
    } finally {
      result = 'undefine';
    }
    return result;
  };

  update(updatedModule, callBack){
    const moduleDocument = updatedModule;
    try {
      result = super.update(moduleDocument, callback);
    } catch (e) {
      console.log("there is an error with the data that you want to update");
    } finally {
      return result;
    }
    return result;
  };
  remove(selector){
    const result = super.remove(selector);
    return result;
  };
}
export const Modules = new Mongo.Collection('module');
const Schemas = {};
Schemas.Module = new SimpleSchema({
  moduleCode: {
    type: String,
    optional:false
  },
  moduleName: {
    type: String,
    optional:false,
  },
  moduleDescription: {
    type: String,
    optional:false,
  },
  modulePrerequisite: {
    type: String,
    optional:false,
  },
  moduleCorequisite: {
    type: String,
    optional: true,
  },
  modulePreclusion: {
    type: String,
    optional:false,
  },
  moduleMC: {
    type: Number,
    optional:false,
  },
  termOffered: {
    type: [Object],
    blackbox: true,
    optional:true,
  },
});

Modules.attachSchema(Schemas.Module);
console.log(Modules.insert);
