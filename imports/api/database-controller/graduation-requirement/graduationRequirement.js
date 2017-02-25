import { mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/// This Component handles the initialization of the graduation requirement collection
/// requirementModule should be in he following format :
/// module code: boolean true/false
/// e.g : CS1231: false
/// the boolean is to indicate in the logic section if the following module requirement has been fulfilled

class GraduationRequirementCollection extends Mongo.Collection {}

const GraduationRequirements = new GraduationRequirementCollection('graduationRequirement');

const gradRequirementSchema = {
  requirementName: {
    type: String
  },
  requirementModules: {
    type: [Object],
    optional: true
  }
}

GraduationRequirements.attachSchema(gradRequirementSchema);
