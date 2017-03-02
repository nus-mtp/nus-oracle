import { Modules } from '../database-controller/module/module';
import { insertToModuleCollection,
         retrieveAllModule } from '../database-controller/module/methods';

export const populateModuleFixture = function populateModuleFixture() {
  const moduleCodes = ['CS1010', 'CS1010E', 'CS1010J', 'CS1010S', 'CS1010X', 'CS1020', 'CS2010', 'CS3230'];
  const moduleNames = ['Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Data Structures and Algorithms I', 'Data Structures and Algorithms II', 'Design and Analysis of Algorithms'];
  for (var i = 0; i < 8; i++)  {
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
