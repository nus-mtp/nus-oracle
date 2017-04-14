import { ModuleFulfilments } from '../database-controller/module-fulfilment/moduleFulfilment';
import { createNewModuleFulfilment,
         removeOneModuleFulfilment } from '../database-controller/module-fulfilment/methods';

export const populateModuleFulfilmentFixture = function populateModuleFulfilmentFixture() {
  const foundationModules = ['CS1010', 'CS1020', 'CS2010', 'CS1231', 'CS2100', 'CS2103T', 'CS2105', 'CS2106', 'CS3230'];
  const ITProfessionalismModules = ['IS1103', 'CS2101', 'ES2660'];
  const mathSciModules = ['MA1301', 'MA1521', 'MA1101R', 'ST2334', 'Science II', 'PC1221', 'Science I' ];
  const teamProjectModules = ['Project I', 'Project II'];
  const industrialExperienceModules = ['ATAP/SIP/Industry Course/NOC/FYP'];

  const CS1010Equivalent = ['CS1010X', 'CS1010E', 'CS1010S', 'CS1101'];
  const CS1020Equivalent = ['CS2020'];
  const CS2010Equivalent = ['CS2020'];

  const ST2334Equivalent = ['ST2131'];
  const PC1221Equivalent = ['PC1221FC', 'PC1221X', 'PC1222', 'PC1222X'];

  const ScienceOneEquivalent = ['CM1121', 'CM1131', 'CM1417', 'LSM1301', 'LSM1302',
                                'PC1141', 'PC1142', 'PC1143', 'PC1144', 'PC1221',
                                'PC1222', 'PC1432', 'MA2213','MA2214'];
  const ScienceTwoEquivalent = ['CM1121', 'CM1131', 'CM1417', 'LSM1301', 'LSM1302',
                                'PC1141', 'PC1142', 'PC1143', 'PC1144', 'PC1221',
                                'PC1222', 'PC1432', 'MA2213','MA2214', 'ST2132'];

  const teamProjectIEquivalent = ['CS3201', 'CS3216', 'CS3281', 'CS3283'];
  const teamProjectIIEquivalent = ['CS3202', 'CS3217', 'CS3282', 'CS3284'];

  const internshipEquivalent = ['CP3880', 'CP3200', 'CP3202', 'CP4101'];

  const academicYear = 'AY 2016/2017';

  const moduleFulfilmentIDs = [];

  for (var i=0; i < foundationModules.length; i++)  {
    if (foundationModules[i] === 'CS1010')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, foundationModules[i], CS1010Equivalent));
    } else if (foundationModules[i] === 'CS1020')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, foundationModules[i], CS1020Equivalent));
    } else if (foundationModules[i] === 'CS2010')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, foundationModules[i], CS2010Equivalent));
    } else {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, foundationModules[i], []));
    }
  }

  for (var i=0; i < ITProfessionalismModules.length; i++)  {
    moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ITProfessionalismModules[i], []));
  }

  for (var i=0; i < mathSciModules.length; i++)  {
    if (mathSciModules[i] === 'ST2334') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], ST2334Equivalent));
    } else if (mathSciModules[i] === 'PC1221')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], PC1221Equivalent));
    } else if (mathSciModules[i] === 'Science I')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], ScienceOneEquivalent));
    } else if (mathSciModules[i] === 'Science II') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], ScienceTwoEquivalent));
    } else {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], []));
    }
  }
  for (var i=0; i<teamProjectModules.length; i++)  {
    if (teamProjectModules[i] === 'Project I') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, teamProjectModules[i], teamProjectIEquivalent));
    } else if (teamProjectModules[i] == 'Project II') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, teamProjectModules[i], teamProjectIIEquivalent));
    }
  }

  for (var i=0; i<industrialExperienceModules.length; i++)  {
    moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, industrialExperienceModules[i], internshipEquivalent));
  }

  return moduleFulfilmentIDs;
}

export const populateULRModuleFulfilment = function populateULRModuleFulfilment() {
  const moduleFulfilmentIDs = [];

  const ULRModules = ['Human Cultures', 'Asking Questions', 'Quantitative Reasoning',
                   'Singapore Studies', 'Thinking and Expression'];
  const GEHEquivalent = ['GEH1008', 'GEH1015', 'GEH1001'];
  const GEQEquivalent = ['GEQ1000', 'GEQ1917'];
  const GEREquivalent = ['GER1000'];
  const GESEquivalent = ['GES1002', 'GES1003', 'GES1010'];
  const GETEquivalent = ['GET1006', 'GET1014', 'GET1006'];

  const academicYear = 'AY 2016/2017';

  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[0], GEHEquivalent));
  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[1], GEQEquivalent));
  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[2], GEREquivalent));
  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[3], GESEquivalent));
  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[4], GETEquivalent));

  return moduleFulfilmentIDs;
}

export const populateAY1516ComSciITFulfilment = function populateAY1516ComSciITFulfilment() {
  const academicYear = 'AY 2015/2016';
  const ITProfessionalismModules = ['IS1103', 'CS2101'];

  const moduleFulfilmentIDs = [];

  for (var i=0; i < ITProfessionalismModules.length; i++)  {
    moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ITProfessionalismModules[i], []));
  }

  return moduleFulfilmentIDs;
}

export const populateAY1516ComSciMathScienceFulfilment = function populateAY1516ComSciMathScienceFulfilment() {
  const moduleFulfilmentIDs = [];
  const academicYear = 'AY 2015/2016';

  const mathSciModules = ['MA1301', 'MA1521', 'MA1101R', 'ST2334', 'Science II', 'PC1221', 'Science I', 'Science III'];

  const ST2334Equivalent = ['ST2131'];
  const PC1221Equivalent = ['PC1221FC', 'PC1221X', 'PC1222', 'PC1222X'];

  // science 3 has same equivalent modules as science 1
  const ScienceOneEquivalent = ['CM1121', 'CM1131', 'CM1417', 'LSM1301', 'LSM1302',
                                'PC1141', 'PC1142', 'PC1143', 'PC1144', 'PC1221',
                                'PC1222', 'PC1432', 'MA2213','MA2214'];
  const ScienceTwoEquivalent = ['CM1121', 'CM1131', 'CM1417', 'LSM1301', 'LSM1302',
                                'PC1141', 'PC1142', 'PC1143', 'PC1144', 'PC1221',
                                'PC1222', 'PC1432', 'MA2213','MA2214', 'ST2132'];

  for (var i=0; i < mathSciModules.length; i++)  {
    if (mathSciModules[i] === 'ST2334') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], ST2334Equivalent));
    } else if (mathSciModules[i] === 'PC1221')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], PC1221Equivalent));
    } else if (mathSciModules[i] === 'Science I')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], ScienceOneEquivalent));
    } else if (mathSciModules[i] === 'Science II') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], ScienceTwoEquivalent));
    } else if (mathSciModules[i] === 'Science III') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], ScienceOneEquivalent));
    }  else {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], []));
    }
  }

  return moduleFulfilmentIDs;
}

export const populate1415ULRModuleFulfilment = function populate1415ULRModuleFulfilment() {
  const moduleFulfilmentIDs = [];

  const ULRModules = ['GEM A', 'GEM B', 'Breadth One',
                   'Breadth Two', 'Singapore Studies'];
  const GEM_AEquivalent = ['GEM1034', 'GEM1048', 'GEM1051', 'GEK1002'];
  const GEM_BEquivalent = ['GEK1509', 'GEK1901', 'GEK1539'];
  const Breadth_One = [];
  const Breadth_Two = [];
  const Singapore_Studies = ['SSA2214', 'SSA2221', 'SSA2203'];

  const academicYear = 'AY 2014/2015';

  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[0], GEM_AEquivalent));
  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[1], GEM_BEquivalent));
  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[2], Breadth_One));
  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[3], Breadth_Two));
  moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, ULRModules[4], Singapore_Studies));

  return moduleFulfilmentIDs;
}

export const dePopulateModuleFulfilmentFixture = function dePopulateModuleFulfilmentFixture(moduleFulfilmentIDs) {
  for (var i=0; i<moduleFulfilmentIDs.length; i++)  {
    removeOneModuleFulfilment(moduleFulfilmentIDs[i]);
  }
}
