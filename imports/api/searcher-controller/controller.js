import { Meteor } from 'meteor/meteor';
import { searchByModuleCodeRegex } from '../database-controller/module';


// call this function to return module package
export const sendQuery = function sendQuery(userInput) {
  if (typeof userInput != 'string') {
    return false;
  }

  module = searchByModuleCodeRegex(userInput);

  return module;
};
