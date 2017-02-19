import { Meteor } from 'meteor/meteor';
import { searchByModuleCodeRegex } from '../database-controller/module/methods';

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
