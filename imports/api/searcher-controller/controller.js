import { Meteor } from 'meteor/meteor';
import { searchByModuleCodeRegex,
         searchByModuleCode } from '../database-controller/module/methods';

export const sendQuery = function sendQuery(userInput) {
  if (typeof userInput != 'string') {
    return false;
  }

  let modules = [];

  // search module by code
  modules = modules.concat(searchByModuleCodeRegex(userInput));

  // search module by name

  return modules;
};

export const findModuleMC = function findModuleMC(moduleCode) {
  if (typeof userInput != 'string') {
    return false;
  }

  return searchByModuleCode(moduleCode).moduleMC;
}
