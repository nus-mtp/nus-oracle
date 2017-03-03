import { GraduationRequirements } from '../database-controller/graduation-requirement/graduationRequirement';
import { createNewGradRequirement } from '../database-controller/graduation-requirement/methods';

export const populateGraduationRequirementsFixture = function populateGraduationRequirementsFixture() {
  populateComScienceFoundationRequirementsFixture();
  populateComSciITProfessionalismFixture();
  populateComSciMathScienceFixture();
  populateTeamProjectFixture();
  populateIndustrialExperienceFixture();
};

const populateComScienceFoundationRequirementsFixture = function populateComScienceFoundationRequirementsFixture() {
  const requirementName = 'Computer Science Foundation';
  const modules = ['CS1010', 'CS1020', 'CS2010', 'CS1231', 'CS2100', 'CS2103T', 'CS2105', 'CS2106', 'CS3230'];

  createNewGradRequirement(requirementName, modules);
};

const populateComSciITProfessionalismFixture = function populateComSciITProfessionalismFixture() {
  const requirementName = 'IT Professionalism';
  const modules = ['IS1103', 'CS2101', 'ES2660'];

  createNewGradRequirement(requirementName, modules);
};

const populateComSciMathScienceFixture = function populateComSciMathScienceFixture()  {
  const requirementName = 'Mathematics and Sciences';
  const modules = ['MA1301', 'MA1521', 'MA1101R', 'ST2334', 'PC1221',
                   'CM1121', 'CM1131', 'CM1417', 'LSM1301', 'LSM1302',
                   'PC1141', 'PC1142', 'PC1143', 'PC1144', 'PC1221',
                   'PC1222', 'PC1432', 'MA2213','MA2214', 'CM1101', 'CM1111',
                   'CM1161', 'CM1191', 'CM1401', 'CM1402', 'CM1501', 'CM1502',
                   'LSM1303', 'PC1421', 'PC1431', 'PC1433', 'MA1104', 'MA2101',
                   'MA2108', 'MA2501', 'ST2132', 'ST2137'];

  createNewGradRequirement(requirementName, modules);
}

const populateTeamProjectFixture = function populateTeamProjectFixure() {
  const requirementName = 'Computer Systems Team Project';
  const modules = ['CS3201', 'CS3202'];

  createNewGradRequirement(requirementName, modules);
}

const populateIndustrialExperienceFixture = function populateIndustrialExperienceFixture()  {
  const requirementName = 'Industrial Experience Training';
  const modules = ['CP3880'];

  createNewGradRequirement(requirementName, modules);
}
