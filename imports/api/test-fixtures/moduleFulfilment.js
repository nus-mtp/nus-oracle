import { ModuleFulfilments } from '../database-controller/module-fulfilment/moduleFulfilment';
import { createNewModuleFulfilment,
         removeOneModuleFulfilment } from '../database-controller/module-fulfilment/methods';

export const populateModuleFulfilmentFixture = function populateModuleFulfilmentFixture() {
  const foundationModules = ['CS1010', 'CS1020', 'CS2010', 'CS1231', 'CS2100', 'CS2103T', 'CS2105', 'CS2106', 'CS3230'];
  const ITProfessionalismModules = ['IS1103', 'CS2101', 'ES2660'];
  const mathSciModules = ['MA1301', 'MA1521', 'MA1101R', 'ST2334', 'Science Two', 'PC1221', 'Science One'];
  const teamProjectModules = ['Project I', 'Project II'];

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
    } else if (mathSciModules[i] === 'Science One')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], ScienceOneEquivalent));
    } else if (mathSciModules[i] === 'Science Two') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], ScienceTwoEquivalent));
    } else {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, mathSciModules[i], []));
    }
  }
  for (var i=0; i<teamProjectModules.length; i++)  {
    if (teamProjectModules[i] == 'Project I') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, teamProjectModules[i], teamProjectIEquivalent));
    } else if (teamProjectModules[i] == 'Project II') {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, teamProjectModules[i], teamProjectIIEquivalent));
    }
  }

  return moduleFulfilmentIDs;
}

export const dePopulateModuleFulfilmentFixture = function dePopulateModuleFulfilmentFixture(moduleFulfilmentIDs) {
  for (var i=0; i<moduleFulfilmentIDs.length; i++)  {
    removeOneModuleFulfilment(moduleFulfilmentIDs[i]);
  }
}
