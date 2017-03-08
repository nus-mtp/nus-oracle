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
                       'CS3284', 'CS3216', 'CS3217', 'CS3281', 'CS3282', 'CS3201', 'CS3202',
                       'CP3880', 'CP3200', 'CP3202', 'CP4101'];
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
                       'Software Engineering Project I', 'Software Engineering Project II', 'Advanced Technology Attachment Programme',
                       'Internship', 'Internship II', 'BComp Dissertation'];

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

export const dePopulateModuleFixture = function dePopulateModuleFixture() {
  const allModules = retrieveAllModule();
  for (var i = 0; i < allModules.length; i++)  {
    Modules.remove(allModules[i]._id);
  }
  return retrieveAllModule();
}
