import { Meteor } from 'meteor/meteor';
import { searchByModuleCodeAndNameRegex,
         searchByModuleCode } from '../database-controller/module/methods';

export const sendQuery = function sendQuery(userInput) {
  if (typeof userInput != 'string') {
    return false;
  }

  let modules = [];

  // search module by code AND name
  modules = modules.concat(searchByModuleCodeAndNameRegex(userInput));

  return modules;
};

export const findModuleMC = function findModuleMC(moduleCode) {
  if (typeof userInput != 'string') {
    return false;
  }

  return searchByModuleCode(moduleCode).moduleMC;
}
