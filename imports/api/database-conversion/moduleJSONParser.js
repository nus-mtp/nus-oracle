// moduleJSONarser.js script is to accept a JSON file from nusmod's API website and load it to an appripirate format for reading
// which can later be stored in the module database.
// The entire file will be read and stored in the moduleCollection defined in module.js
// Structure is converted to a format thats similar to moduleCSVParser

import { Meteor } from 'meteor/meteor';
import { removeAllModule,
         isExistModuleCollection,
         insertToModuleCollection } from '../database-controller/module/methods';
var jsonfile = require('jsonfile');

// data mapping for NUSmod's JSON
const NUSMOD_ROW_LENGTH = 10;
const NUSMOD_MODULE_CODE = "ModuleCode";
const NUSMOD_MODULE_NAME = "ModuleTitle";
const NUSMOD_MODULE_DESC = "ModuleDescription";
const NUSMOD_MODULE_MC = "ModuleCredit";
const NUSMOD_MODULE_PREREQ = "Prerequisite";
const NUSMOD_MODULE_PRECLUSION = "Preclusion";
const NUSMOD_MODULE_SEM_LIST = "History";
const NUSMOD_MODULE_SEM = "Semester";
const NUSMOD_YEAR_LIST =['2014-2015',
            '2015-2016',
            '2016-2017'];


// module JSON key following Schema
const MODULE_CODE = 'moduleCode';
const MODULE_NAME = 'moduleName';
const MODULE_DESCRIPTION = 'moduleDescription';
const MODULE_PREREQUISITE = 'modulePrerequisite';
const MODULE_COREQUISITE = 'moduleCorequisiste';
const MODULE_PRECLUSION = 'modulePreclusion';
const MODULE_TERM_OFFERED = 'termOffered';
const MODULE_MC = 'moduleMC';

const MODULE_YEAR_LIST =['AY 2014/2015',
                'AY 2015/2016',
                'AY 2016/2017'];

const TERM_YEAR = 'termYear';
const TERM_SEM = 'semester';

let acadYear = '';
let acadYearURL = '';

//ES2660, because its not found in NUSMOD
const missingMods = [{
  moduleCode: "ES2660",
  moduleName: "Communicating in the Information Age",
  moduleDescription: "In a context of prolific production and convenient access to content and innovation in the Information Age, how should one critically process and clearly communicate ideas to various audiences? In this module, students will learn to question and articulate their analysis of assumptions and assertions on issues facing the Information Age through processes such as identifying bias and substantiating arguments. The Ennis’ (1986, 2001) taxonomy of critical thinking dispositions will be employed to develop students’ analytical thinking skills and their ability to articulate cogent responses to arguments or to defend their own positions in both written and oral form. This module is taught over 1 semester with 2 two-hour sectional teachings per week.",

  modulePrerequisite:"1. Students who are required to take ES1000 Basic English and/or ES1103 English for Academic Purposes, must pass those modules before they are allowed to read this module./n2. Only SoC students matriculated in AY2016/2017 and after, are allowed to take ES2660.",
  moduleCorequisite:  "",
  modulePreclusion: "GET1006 and GEK1901",
  moduleMC: 4,
  termOffered: [{
    "termYear": "AY 2015/2016",
    "semester": 1
  },
  {
    "termYear": "AY 2015/2016",
    "semester": 2
  },
  {
    "termYear": "AY 2016/2017",
    "semester": 1
  },
  {
    "termYear": "AY 2016/2017",
    "semester": 2
  }]
}];

//Set the academic years for insertion into the module database and the format for URL
const setFileAcademicYear = function setAcademicYear(index) {
  acadYear = MODULE_YEAR_LIST[index];
  acadYearURL = NUSMOD_YEAR_LIST[index];
};

//Obtain the link to call the several JSON files from nusmods' api
const getURLBaseLink = function getURL(index) {
  return "http://api.nusmods.com/" + acadYearURL + "/moduleInformation.json";
}

//The main function to call the JSON file, update the module array, and finally store it all into Module db
const parseJSONFileAndStoreToDB = function parseAndStore() {
  let moduleJSONArray = [];
  let rawModuleListJSON =[];
  //Runs through all the available years
  for (yearIndex = 0; yearIndex < NUSMOD_YEAR_LIST.length; yearIndex++) {
    setFileAcademicYear(yearIndex);
    const url = getURLBaseLink(yearIndex);
    rawModuleListJSON = HTTP.get(url)['data'];
    moduleJSONArray = updateJSONModuleArrayToSchema(moduleJSONArray, rawModuleListJSON, MODULE_YEAR_LIST[yearIndex]);
    console.log(acadYearURL + " , " + moduleJSONArray.length);
  }
  moduleJSONArray = insertMissingModToJSON(moduleJSONArray,missingMods);
  storeJSONArrayToDB(moduleJSONArray);
  writeJSONToFile(moduleJSONArray);
};

//Add the JSON file from the currently module information and add into the existing moduleJSONArray
const updateJSONModuleArrayToSchema = function updateJSON(modListData, rawJSONData, year) {
  const rawJSONLength = rawJSONData.length;
  //const newModuleJSONArray = [];
  let currentModIndex;
  //const modListData = {};
  let currentNewJSONIndex = 0;
  for (currentModIndex = 0; currentModIndex < rawJSONLength; currentModIndex++) {
    const currentMod = rawJSONData[currentModIndex]
    if (currentModIndex %1000 == 0) {
      console.log(JSON.stringify(modListData[currentModIndex]));
      console.log(currentModIndex);
    }
    modListData = updateSingleModuleToModuleSchema(modListData, currentMod, year);
  }
  return modListData;
};

// Takes the single module(data) from the list of modules  and inject it into the existing module array list (modListData)
const updateSingleModuleToModuleSchema = function updateModule(modListData, data){
  let existingModule = []

  // To search and call for the module that has the same module code from the existing modListData array into existingModule
  if (modListData.length > 0) {
    existingModule = modListData.filter(function (obj) {
      return obj[MODULE_CODE] ==  data[NUSMOD_MODULE_CODE];
    });
  }

  // If existingModule has a module in the list, the mod already exist in the previous year -> update the list of terms available.
  if (existingModule.length != 0) {
    updateExistingTermOfferedObject(existingModule[0],  data[NUSMOD_MODULE_SEM_LIST]);
  } else {
    // Create new module object and add into modListData
    modListData = addNewModuleToModuleSchema(modListData, data);
  }
  return modListData;
};

//update new Term Object from current year into the existing data (modListData)
const updateExistingTermOfferedObject = function updateTermObject(data, availableSem) {
  let termObject = [];
  let availableSemList = data[MODULE_TERM_OFFERED];
  let semIndex;
  const currentYearSemLength = availableSem.length;
  for (semIndex = 0; semIndex < currentYearSemLength; semIndex++) {
    let term = {};
    term[TERM_YEAR] = acadYear;
    term[TERM_SEM] = availableSem[semIndex][NUSMOD_MODULE_SEM];
    availableSemList[availableSemList.length] = term;
  }
  return availableSemList;
};

//Add a new module object into the existing data (modListData)
const addNewModuleToModuleSchema = function addModule(modListData, data){
  let newModuleJSON = {};
  let newTermOfferedJSON = {};
  newModuleJSON[MODULE_CODE] = data[NUSMOD_MODULE_CODE];
  newModuleJSON[MODULE_NAME] = data[NUSMOD_MODULE_NAME];
  newModuleJSON[MODULE_DESCRIPTION] = data[NUSMOD_MODULE_DESC];
  newModuleJSON[MODULE_PREREQUISITE] = data[NUSMOD_MODULE_PREREQ];
  newModuleJSON[MODULE_PRECLUSION] = data[NUSMOD_MODULE_PRECLUSION];
  newModuleJSON[MODULE_MC] = parseInt(data[NUSMOD_MODULE_MC], 10); // parameter to ensure decimal parsing

  // Semester Object + Quota
  newTermOfferedJSON = createNewTermOfferedObject(data, data[NUSMOD_MODULE_SEM_LIST]);
  newModuleJSON[MODULE_TERM_OFFERED] = newTermOfferedJSON;
  modListData = modListData.concat(newModuleJSON);
  return modListData
};

//creating new Term Object
const createNewTermOfferedObject = function createTermObject(data,  availableSem) {
  let termObject = [];
  let semIndex;
  const currentYearSemLength = availableSem.length;
  for (semIndex = 0; semIndex < currentYearSemLength; semIndex++) {
    let term = {};
    term[TERM_YEAR] = acadYear;
    term[TERM_SEM] = availableSem[semIndex][NUSMOD_MODULE_SEM];
    termObject[termObject.length] = term;
  }
  return termObject;
};

// To reset the module db and store it
const storeJSONArrayToDB = function storeArrayToDB(JSONArray) {
  if (!isExistModuleCollection()) {
    createModuleCollection();
  }
  removeAllModule();

  let currentArrayIndex;

  for (currentArrayIndex = 0; currentArrayIndex < JSONArray.length ; currentArrayIndex++) {
    storeModuleToDB(JSONArray[currentArrayIndex]);
  }
};

const storeModuleToDB = function storeToDB(ModuleJSON) {
  insertToModuleCollection(ModuleJSON);
};

const writeJSONToFile = function writetoFile(ModuleJSON) {
  const JSONFileName = "./moduleDatabase.json";
  jsonfile.writeFile(JSONFileName, ModuleJSON);
}

const insertMissingModToJSON = function insertMissingModToJson(modListData, missingModArray){
  for(var i = 0; i < missingModArray.length ; i++){
    let currentArray = missingModArray[i];
    console.log(currentArray);
    modListData = modListData.concat(currentArray);
  }
  return modListData;
}

export {
  parseJSONFileAndStoreToDB,
};
