import { mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/// This Component handles the initialization of the graduation requirement collection
/// requirementModule should be in he following format :
/// module code: boolean true/false
/// e.g : CS1231: false
/// the boolean is to indicate in the logic section if the following module requirement has been fulfilled

class GraduationRequirementCollection extends Mongo.Collection {
  insert(gradRequirementData, callBack){
    const gradDocument = gradRequirementData;
    let result;
    //validate document
    return super.insert( gradDocument, callBack);
  };
  update(selector, modifier){
    const result = super.update(selector, modifier);

    return result;
  };

  remove(selector){
    const result = super.remove(selector);
    return result;
  };

};

export const GraduationRequirements = new GraduationRequirementCollection('graduationRequirement');

const gradRequirementSchema = {
  requirementName: {
    type: String
  },
  requirementModules: {
    type: Object,
    blackbox: true,
    optional: true
  },
  requirementMCs: {
    type: Number,
  }
}

GraduationRequirements.attachSchema(gradRequirementSchema);
if (Meteor.isServer) {
  Meteor.publish('GraduationRequirements', function taskPublication () {
    return GraduationRequirements.find({});
  });
}
