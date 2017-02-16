import { Modules } from '../database-controller/module/module';
import { createModuleCollection,
         insertToModuleCollection,
         removeOneModule,
         retrieveAllModule} from '../database-controller/module/methods';

export const populateModuleFixture = function populateModuleFixture() {
  const moduleCodes = ['CS1010', 'CS1010E', 'CS1010J', 'CS1010S', 'CS1010X', 'CS1020', 'CS2010', 'CS3230'];
  const moduleNames = ['Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Data Structures and Algorithms I', 'Data Structures and Algorithms II', 'Design and Analysis of Algorithms'];
  for (var i = 0; i < 8; i++)  {
    const testModule = {
      moduleCode: moduleCodes[i],
      moduleName: moduleNames[i],
      moduleDescription: 'none',
      modulePrerequisite: 'none',
      modulePreclusion: 'none',
      moduleMC: 0,
    };
    Modules.insert(testModule);
  }
  return retrieveAllModule();
};

export const dePopulateModuleFixture = function dePopulateModuleFixture() {
  const modules = retrieveAllModule();
  for (var i = 0; i < modules.length; i++)  {
    Modules.remove({_id: modules[i]._id});
  }
  return retrieveAllModule();
}
