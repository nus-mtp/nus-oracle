import { ModuleFulfilments } from '../database-controller/module-fulfilment/moduleFulfilment';
import { createNewModuleFulfilment,
         removeOneModuleFulfilment } from '../database-controller/module-fulfilment/methods';

export const populateModuleFulfilmentFixture = function populateModuleFulfilmentFixture() {
  const modules = ['CS1010', 'CS1020', 'CS2010', 'CS1231', 'CS2100', 'CS2103T', 'CS2105', 'CS2106', 'CS3230'];
  const CS1010Equivalent = ['CS1010X', 'CS1010E', 'CS1010S', 'CS1101'];
  const CS1020Equivalent = ['CS2020'];
  const CS2010Equivalent = ['CS2020'];
  const academicYear = 'AY 2016/2017';

  const moduleFulfilmentIDs = [];

  for (var i=0; i < modules.length; i++)  {
    if (modules[i] === 'CS1010')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, modules[i], CS1010Equivalent));
    } else if (modules[i] === 'CS1020')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, modules[i], CS1020Equivalent));
    } else if (modules[i] === 'CS2010')  {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, modules[i], CS2010Equivalent));
    } else {
      moduleFulfilmentIDs.push(createNewModuleFulfilment(academicYear, modules[i], []));
    }
  }

  return moduleFulfilmentIDs;
}

export const dePopulateModuleFulfilmentFixture = function dePopulateModuleFulfilmentFixture(moduleFulfilmentIDs) {
  for (var i=0; i<moduleFulfilmentIDs.length; i++)  {
    removeOneModuleFulfilment(moduleFulfilmentIDs[i]);
  }
}
