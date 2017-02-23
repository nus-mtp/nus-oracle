import { mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class GraduationRequirementCollection extends Mongo.Collection {}

const GraduationRequirements = new GraduationRequirementCollection('gradiationRequirement');

const gradRequirementSchema = {
  requirementName: {
    type: String
  },
  requirementModules: {
    type: [object],
    optional: true
  }
}

GraduationRequirements.attachSchema(gradRequirementSchema);
