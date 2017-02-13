import { createModuleCollection,
         insertToModuleCollection,
         removeAllModule,
         retrieveAllModule} from '../database-controller/module';

export const populateModuleFixture = function populateModuleFixture() {
  createModuleCollection();
  const moduleCodes = ['CS1010', 'CS1010E', 'CS1010J', 'CS1010S', 'CS1010X', 'CS1020', 'CS2010', 'CS3230'];
  const moduleNames = ['Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Data Structures and Algorithms I', 'Data Structures and Algorithms II', 'Design and Analysis of Algorithms'];
  for (var i = 0; i < 8; i++)  {
    const testModule = {
      moduleCode: moduleCodes[i],
      moduleName: moduleNames[i],
    };
    insertToModuleCollection(testModule);
  }
  return retrieveAllModule();
};

export const dePopulateModuleFixture = function dePopulateModuleFixture() {
  return removeAllModule();
}
