import { Meteor } from 'meteor/meteor';
import { searchByModuleCodeAndNameRegex,
         searchByModuleCode,
         retrieveAllModule } from '../database-controller/module/methods';

/**
 * API wrapper call for returning list of all modules from the database
 * without any criteria.
 *
 * @return {[Array]} Array of all modules, with each module in the JSON format:
   {
       label: moduleCode + " " + moduleName
       value: {index of this object in the list of modules}
       moduleCode: "CS1010",
       moduleName: "Programming Methodology"
   }
   Note: The 'value' field is specially meant for the module search bar
         for react-select-fast-filter-options.
         It specifies the exact index of the option so that the search
         bar can recognize the different numbered options.
 */
export const getAllModules = function getAllModules() {
  let modules = retrieveAllModule();

  // wrap into module code, name, label and value fields for UI
  const resultArray = [];

  for (var i = 0; i < modules.length; i++) {
    const returnPackage = {
      label: modules[i].moduleCode + " " + modules[i].moduleName,
      value: i,
      moduleCode: modules[i].moduleCode,
      moduleName: modules[i].moduleName
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
