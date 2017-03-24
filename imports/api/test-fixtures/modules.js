import { Modules } from '../database-controller/module/module';
import { insertToModuleCollection,
         retrieveAllModule } from '../database-controller/module/methods';

export const populateModuleFixture = function populateModuleFixture() {
  const moduleCodes = ['CS1010', 'CS1010E', 'CS1010J', 'CS1010S', 'CS1010X',
                       'CS1020', 'CS2010', 'CS3230', 'CS1231', 'IS1103',
                       'CS2101', 'ES2660', 'MA1301', 'MA1521', 'MA1101R',
                       'ST2334', 'CM1121', 'CM1131', 'CM1417', 'LSM1301',
                       'LSM1302', 'PC1141', 'PC1142', 'PC1143', 'PC1144',
                       'PC1221', 'PC1221X', 'PC1221FC', 'PC1222', 'PC1222X',
                       'PC1432', 'MA2213', 'MA2214', 'ST2131', 'ST2132', 'CS3283',
                       'CS3284', 'CS3216', 'CS3217', 'CS3281', 'CS3282', 'CS3201', 'CS3202'];
  const moduleNames = ['Programming Methodology', 'Programming Methodology',
                       'Programming Methodology', 'Programming Methodology',
                       'Programming Methodology', 'Data Structures and Algorithms I',
                       'Data Structures and Algorithms II',
                       'Design and Analysis of Algorithms', 'Discrete Structures',
                       'Computing and Society', 'Effective Communication for Computing Professionals',
                       'Communicating in the Information Age', 'Introductory Mathematics',
                       'Calculus for Computing', 'Linear Algebra I', 'Probability and Statistics',
                       'Fundamental of Physics I', 'ORGANIC CHEMISTRY 1', 'PHYSICAL CHEMISTRY 1',
                       'FUNDAMENTALS OF CHEMISTRY', 'GENERAL BIOLOGY', 'GENES AND SOCIETY',
                       'PHYSICS I', 'PHYSICS II', 'PHYSICS III', 'PHYSICS IV', 'FUNDAMENTALS OF PHYSICS I',
                       'FUNDAMENTALS OF PHYSICS I', 'FUNDAMENTALS OF PHYSICS I', 'FUNDAMENTALS OF PHYSICS II',
                       'FUNDAMENTALS OF PHYSICS II', 'PHYSICS IIE', 'NUMERICAL ANALYSIS I',
                       'COMBINATORICS AND GRAPHS I', 'Probability', 'Mathematical Statistics',
                       'Media Technology Project I', 'Media Technology Project II', 'Software Product Engineering for Digital Markets',
                       'Software Engineering on Modern Application Platforms', 'Thematic Systems Project I', 'Thematic Systems Project II',
                       'Software Engineering Project I', 'Software Engineering Project II'];

  for (var i = 0; i < moduleCodes.length; i++)  {
    const testModule = {
      moduleCode: moduleCodes[i],
      moduleName: moduleNames[i],
      moduleDescription: 'Lorem ipsum',
      modulePrerequisite: 'Lorem ipsum',
      moduleCorequisite: 'Lorem ipsum',
      modulePreclusion: 'Lorem ipsum',
      moduleMC: 4,
      termOffered: [{Sem1: 'Sem 1', Sem2: 'Sem 2'}]
    };
    insertToModuleCollection(testModule);
  }
  return retrieveAllModule();
};

export const populateIndustrialAttachmentModuleFixture = function populateIndustrialAttachmentModuleFixture() {
  const intershipModules = ['CP3880', 'CP3200', 'CP3202', 'CP4101'];
  const intershipNames = ['Advanced Technology Attachment Programme',
                          'Internship', 'Internship II', 'BComp Dissertation'];
  const moduleMCs = [12, 6, 6, 12];

  for (var i = 0; i < intershipModules.length; i++)  {
    const testModule = {
      moduleCode: intershipModules[i],
      moduleName: intershipNames[i],
      moduleDescription: 'Lorem ipsum',
      modulePrerequisite: 'Lorem ipsum',
      moduleCorequisite: 'Lorem ipsum',
      modulePreclusion: 'Lorem ipsum',
      moduleMC: moduleMCs[i],
      termOffered: [{Sem1: 'Sem 1', Sem2: 'Sem 2'}]
    };
    insertToModuleCollection(testModule);
  }
}

export const populateULRModuleFixture = function populateULRModuleFixture()  {
  const ULRModules = ['GEH1008', 'GEH1015', 'GEH1001',
                      'GEQ1000', 'GEQ1917', 'GER1000',
                      'GES1002', 'GES1003', 'GES1010',
                      'GET1006', 'GET1014', 'GET1006'];
  const ULRNames = ['GEH1', 'GEH2', 'GEH3',
                    'GEQ1', 'GEQ2', 'GER1',
                    'GES1', 'GES2', 'GES3',
                    'GET1', 'GET2', 'GET3'];

  for (var i = 0; i < ULRModules.length; i++)  {
    const testModule = {
      moduleCode: ULRModules[i],
      moduleName: ULRNames[i],
      moduleDescription: 'Lorem ipsum',
      modulePrerequisite: 'Lorem ipsum',
      moduleCorequisite: 'Lorem ipsum',
      modulePreclusion: 'Lorem ipsum',
      moduleMC: 4,
      termOffered: [{Sem1: 'Sem 1', Sem2: 'Sem 2'}]
    };
    insertToModuleCollection(testModule);
  }
}

export const populateFocusAreaModuleFixture = function populateFocusAreaModuleFixture() {
  const focusAreaModules = ['CS3241', 'CS3242', 'CS3247', 'CS4247', 'CS4350', 'CS3218',
                          'CS3240', 'CS3249', 'CS3343', 'CS4243', 'CS4249', 'CS4340',
                          'CS4344', 'CS4345', 'CS5237', 'CS5240', 'CS5343', 'CS4231',
                          'CS4232', 'CS4234', 'CS5230', 'CS5234', 'CS5236', 'CS5237',
                          'CS5238', 'CS5330', 'CS4244', 'CS4246', 'CS4247', 'CS4350'];
  const focusAreaNames = ['Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum',
                          'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum',
                          'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum',
                          'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum',
                          'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum', 'Lorem Ispsum'];
  for (var i = 0; i < focusAreaModules.length; i++)  {
    const testModule = {
      moduleCode: focusAreaModules[i],
      moduleName: focusAreaNames[i],
      moduleDescription: 'Lorem ipsum',
      modulePrerequisite: 'Lorem ipsum',
      moduleCorequisite: 'Lorem ipsum',
      modulePreclusion: 'Lorem ipsum',
      moduleMC: 4,
      termOffered: [{Sem1: 'Sem 1', Sem2: 'Sem 2'}]
    };
    insertToModuleCollection(testModule);
  }
}

export const populate1415ULRModuleFixture = function populate1415ULRModuleFixture() {
  const ULRModules = ['GEM1034', 'GEM1048', 'GEM1051', 'GEK1509', 'GEK1901', 'GEK1002', 'GEK1539',
                      'NM2213', 'NM3228', 'NM3226', 'ES1541', 'JS2230', 'SSA2214', 'SSA2221', 'SSA2203',
                      'CS1010'];

  const ULRNames = ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum',
                    'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum',
                    'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum',
                    'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum',
                    'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum',
                    'Lorem Ipsum'];

   for (var i = 0; i < ULRModules.length; i++)  {
     const testModule = {
       moduleCode: ULRModules[i],
       moduleName: ULRNames[i],
       moduleDescription: 'Lorem ipsum',
       modulePrerequisite: 'Lorem ipsum',
       moduleCorequisite: 'Lorem ipsum',
       modulePreclusion: 'Lorem ipsum',
       moduleMC: 4,
       termOffered: [{Sem1: 'Sem 1', Sem2: 'Sem 2'}]
     };
     insertToModuleCollection(testModule);
   }
}

export const dePopulateModuleFixture = function dePopulateModuleFixture() {
  const allModules = retrieveAllModule();
  for (var i = 0; i < allModules.length; i++)  {
    Modules.remove(allModules[i]._id);
  }
  return retrieveAllModule();
}
