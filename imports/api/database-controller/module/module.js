import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
As the name suggested, Module Collection store information about the module that is offered in NUS.

Module Document should contain the following:
- moduleCode
- moduleName
- moduleDescription
- modulePrerequisite
- moduleCorequisite
- modulePreclusion
- moduleMC
- termOffered

Other than the termOffered which stored the information regarding when the module is being offered in form of json object,
other information is still stored in string. However this may not be the case in the future.

Prerequisite, corequisite and Preclusion of the module should be stored in format that support the module validity logic
that is yet to be implemented. Known issues in parsing the string of information containing these three information are:
- No standardized format of storing these information. Some immediately stored in logical way such as XXXX,YYYY, and ZZZZ.
  However, some wrote it in sentences that obscure the connection between modules (XXXX AND YYYY or XXXX or YYYY,etc.)
- Some of the requirement might not be a module. 
**/

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
    optional: true,
  },

  modulePrerequisite: {
    type: String,
    optional: true,
  },
  moduleCorequisite: {
    type: String,
    optional: true,
  },
  modulePreclusion: {
    type: String,
    optional:true,
  },
  moduleMC: {
    type: Number,
    optional:true,
  },
  termOffered: {
    type: [Object],
    blackbox: true,
    optional:true,
  },
});

Modules.attachSchema(Schemas.Module);

if (Meteor.isServer) {
  Meteor.publish('Modules', function taskPublication () {
    return Modules.find({});
  });
}
