import { Meteor } from 'meteor/meteor';
import { searchByModuleCodeAndNameRegex,
         searchByModuleCode,
         retrieveAllModule } from '../database-controller/module/methods';

// Module Database from a public loaded clientside
import { moduleDatabase } from './../../../public/nus_modules/moduleDatabase.js';

/**
 * Load module database from server and return it in the JSON format:
 *
 * @return {[Array]} Array of all modules, with each module in the JSON format:
 {
     label: moduleCode + " " + moduleName
     value: {index of this object in the list of modules}
     moduleCode: "CS1010",
     moduleName: "Programming Methodology"
 }

 Note: The 'value' field is specially meant for the module search bar for the
       React library that handles search 'react-select-fast-filter-options'.
       It specifies the exact index of the option so that the search bar can
       recognize the different numbered options.
 */
export const getAllModules = function getAllModules() {
  // Wrap into module code, name, label and value fields for UI search
  const resultArray = [];

  for (var i = 0; i < moduleDatabase.length; i++) {
    const returnPackage = {
      label: moduleDatabase[i].moduleCode + " " + moduleDatabase[i].moduleName,
      value: i,
      moduleCode: moduleDatabase[i].moduleCode,
      moduleName: moduleDatabase[i].moduleName
    };

    resultArray.push(returnPackage);
  }

  return resultArray;
}

/**
 * Searches for a list of all modules of which each module code and name
 * matches the specified userInput String.
 *
 * @param  {[String]} userInput    User's typed input
 * @return {[Array]}     Array of modules that match the userInput
 */
export const sendQuery = function sendQuery(userInput) {
  if (typeof userInput != 'string') {
    return false;
  }

  let modules = [];

  // search module by code AND name
  modules = modules.concat(searchByModuleCodeAndNameRegex(userInput));

  return modules;
};

/**
 * Searches for the number of MCs of a specified module and returns it
 *
 * @param  {[moduleCode]} moduleCode     Module code of the module
 * @return {[int]}    This module's number of MCs
 */
export const findModuleMC = function findModuleMC(moduleCode) {
  if (typeof userInput != 'string') {
    return false;
  }

  return searchByModuleCode(moduleCode).moduleMC;
}
