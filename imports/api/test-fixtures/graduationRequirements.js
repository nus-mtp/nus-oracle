import { GraduationRequirements } from '../database-controller/graduation-requirement/graduationRequirement';
import { createNewGradRequirement,
         removeOneGradRequirementModule } from '../database-controller/graduation-requirement/methods';

export const populateGraduationRequirementsFixture = function populateGraduationRequirementsFixture() {
  const gradRequirementIDs = [];

  gradRequirementIDs.push(populateComScienceFoundationRequirementsFixture());
  gradRequirementIDs.push(populateComSciITProfessionalismFixture());
  gradRequirementIDs.push(populateComSciMathScienceFixture());
  gradRequirementIDs.push(populateTeamProjectFixture());
  gradRequirementIDs.push(populateIndustrialExperienceFixture());
  gradRequirementIDs.push(populateUniversityLevelRequirementFixture());
  gradRequirementIDs.push(populateFocusAreaRequirementFixture());

  return gradRequirementIDs;
};

export const populateAY1516GraduationRequirementsFixture = function populateAY1516GraduationRequirementsFixture() {
  const gradRequirementIDs = [];

  gradRequirementIDs.push(populateComScienceFoundationRequirementsFixture());
  gradRequirementIDs.push(populateAY1516ComSciITProfessionalismFixture());
  gradRequirementIDs.push(populateAY1516ComSciMathScienceGradFixture());
  gradRequirementIDs.push(populateTeamProjectFixture());
  gradRequirementIDs.push(populateIndustrialExperienceFixture());
  gradRequirementIDs.push(populateUniversity1415LevelRequirementFixture());
  gradRequirementIDs.push(populateFocusAreaRequirementFixture());

  return gradRequirementIDs;
}

export const populateAY1415GraduationRequirementsFixture = function populateAY1415GraduationRequirementsFixture() {
  const gradRequirementIDs = [];

  gradRequirementIDs.push(populateComScienceFoundationRequirementsFixture());
  gradRequirementIDs.push(populateAY1516ComSciITProfessionalismFixture());
  gradRequirementIDs.push(populateAY1516ComSciMathScienceGradFixture());
  gradRequirementIDs.push(populateTeamProjectFixture());
  gradRequirementIDs.push(populateIndustrialExperienceFixture());
  gradRequirementIDs.push(populateUniversity1415LevelRequirementFixture());
  gradRequirementIDs.push(populateFocusAreaRequirementFixture());

  return gradRequirementIDs;
}

export const dePopulateGraduationRequirementsFixture = function dePopulateGraduationRequirementsFixture(gradRequirementIDArray) {
  for (var i=0; i < gradRequirementIDArray.length; i++) {
    removeOneGradRequirementModule(gradRequirementIDArray[i]);
  }
}

const populateFocusAreaRequirementFixture = function populateFocusAreaRequirementFixture()  {
  const requirementName = 'Computer Science Focus Area';
  const modules = [];
  const requirementMCs = 24;

  return createNewGradRequirement(requirementName, modules, requirementMCs);
}


const populateComScienceFoundationRequirementsFixture = function populateComScienceFoundationRequirementsFixture() {
  const requirementName = 'Computer Science Foundation';
  const modules = ['CS1010', 'CS1020', 'CS2010', 'CS1231', 'CS2100', 'CS2103T', 'CS2105', 'CS2106', 'CS3230'];
  const requirementMCs = 36;

  return createNewGradRequirement(requirementName, modules, requirementMCs);
};

const populateComSciITProfessionalismFixture = function populateComSciITProfessionalismFixture() {
  const requirementName = 'IT Professionalism';
  const modules = ['IS1103', 'CS2101', 'ES2660'];
  const requirementMCs = 12;

  return createNewGradRequirement(requirementName, modules, requirementMCs);
};

const populateAY1516ComSciITProfessionalismFixture = function populateAY1516ComSciITProfessionalismFixture() {
  const requirementName = 'IT Professionalism';
  const modules = ['IS1103', 'CS2101'];
  const requirementMCs = 8;

  const gradRequirementIDs = [];

  return createNewGradRequirement(requirementName, modules, requirementMCs);
}

const populateComSciMathScienceFixture = function populateComSciMathScienceFixture()  {
  const requirementName = 'Mathematics and Sciences';
  const modules = ['MA1301', 'MA1521', 'MA1101R', 'ST2334', 'PC1221', 'Science One', 'Science Two' ];
  const requirementMCs = 28;

  return createNewGradRequirement(requirementName, modules, requirementMCs);
}

const populateAY1516ComSciMathScienceGradFixture = function populateAY1516ComSciMathScienceGradFixture()  {
  const requirementName = 'Mathematics and Sciences';
  const modules = ['MA1301', 'MA1521', 'MA1101R', 'ST2334', 'PC1221', 'Science One', 'Science Two', 'Science Three' ];
  const requirementMCs = 32;

  const gradRequirementIDs = [];

  return createNewGradRequirement(requirementName, modules, requirementMCs);
}

const populateTeamProjectFixture = function populateTeamProjectFixure() {
  const requirementName = 'Computer Systems Team Project';
  const modules = ['Project I', 'Project II'];
  const requirementMCs = 8;

  return createNewGradRequirement(requirementName, modules, requirementMCs);
}

const populateIndustrialExperienceFixture = function populateIndustrialExperienceFixture()  {
  const requirementName = 'Industrial Experience Training';
  const modules = ['ATAP/SIP/Industry Course/NOC/FYP'];
  const requirementMCs = 12;

  return createNewGradRequirement(requirementName, modules, requirementMCs);
}

const populateUniversityLevelRequirementFixture = function populateUniversityLevelRequirementFixture()  {
  const requirementName = 'University Level Requirement';
  const modules = ['Human Cultures', 'Asking Questions', 'Quantitative Reasoning',
                   'Singapore Studies', 'Thinking and Expression'];
  const requirementMCs = 20;

  return createNewGradRequirement(requirementName, modules, requirementMCs);
}

const populateUniversity1415LevelRequirementFixture = function populateUniversity1415LevelRequirementFixture()  {
  const requirementName = 'University Level Requirement';
  const modules = ['GEM A', 'GEM B', 'Breadth One',
                   'Breadth Two', 'Singapore Studies'];
  const requirementMCs = 20;

  return createNewGradRequirement(requirementName, modules, requirementMCs);
}
