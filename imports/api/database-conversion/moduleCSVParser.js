// moduleCSVParser.js script is to accept a CSV file and parse it into a JSON file
// which can later be stored in the module database.
// NOTE : CSV file is TO BE STORED IN THE PRIVATE FOLDER in the local repository,
// make one if you there is no such folder.
// This file are supposed to only run once and if any change are mad to the csv file,
// The entire file will be read and stored in the moduleCollection defined in module.js
import { Meteor } from 'meteor/meteor';
import { Papa } from 'meteor/harrison:papa-parse';
import { createModuleCollection,
         removeAllModule,
         isExistModuleCollection,
         insertToModuleCollection } from '../database-controller/module';

// data mapping for CSV-JSON output from papa parse output
const CSV_ROW_LENGTH = 10;
const CSV_MODULE_CODE = 0;
const CSV_MODULE_NAME = 1;
const CSV_MODULE_DESC = 2;
const CSV_MODULE_MC = 3;
const CSV_MODULE_PREREQ = 4;
const CSV_MODULE_PRECLUSION = 5;

// The following options is specific to the sample module given by Prof. OOi
// Might or might not be used depending on the file that we used.
const CSV_MODULE_SEM1 = 6;
const CSV_MODULE_SEM1Quota = 7;
const CSV_MODULE_SEM2 = 8;
const CSV_MODULE_SEM2Quota = 9;

// For check if Module is Offered
const IS_OFFERED = 1;

// module JSON key following Schema
const MODULE_CODE = 'moduleCode';
const MODULE_NAME = 'moduleName';
const MODULE_DESCRIPTION = 'moduleDescription';
const MODULE_PREREQUISITE = 'modulePrequisite';
const MODULE_COREQUISITE = 'moduleCorequisiste';
const MODULE_PRECLUSION = 'modulePreclusion';
const MODULE_TERM_OFFERED = 'termOffered';
const MODULE_MC = 'moduleMC';

const TERM_YEAR = 'termYear';
const TERM_SEM = 'semester';
const TERM_QUOTA = 'quota';

let csvFile = '';
let papaConfig = {};
let acadYear = '';

const setCSVFilePathToBeParsed = function changeCSVFilePath(filePth) {
  csvFile = filePth;
};

const setPapaParserConfig = function setPapaParserConfig(config) {
  papaConfig = config;
};

// format of the acadYear is 15/16
const setFileAcademicYear = function setAcademicYear(xxyy) {
  acadYear = xxyy;
};

const parseCSVFileAndStoreToDB = function parseAndStore() {
  const rawModuleJSON = parseCSVModuleFileToJSON();
  const newModuleJSONArray = rearrangeJSONToModuleSchema(rawModuleJSON);
  storeJSONArrayToDB(newModuleJSONArray);
};

// method to read csv file, return a json file containing
const parseCSVModuleFileToJSON = function openingCSVFile() {
  if (csvFile != '') {
    const FileContentInString = csvFile;
    // parse to JSON by using Papa.parse
    const JSONParsedResult = Papa.parse(FileContentInString, papaConfig);
    console.log(JSONParsedResult);
    // The new JSON file is stored in data
    return JSONParsedResult.data;
  }
};

const rearrangeJSONToModuleSchema = function rearrangeJSON(rawJSONData) {

  const rawJSONLength = rawJSONData.length;
  const newModuleJSONArray = [];
  let currentRawIndex;
  let currentNewJSONIndex = 0;

  for (currentRawIndex = 0; currentRawIndex < rawJSONLength; currentRawIndex++) {
    const currentData = rawJSONData[currentRawIndex];
    const rearrangedData = rearrangeModuleToModuleSchema(currentData);
    if (rearrangedData != {}) {
      newModuleJSONArray[currentNewJSONIndex] = rearrangedData;
      currentNewJSONIndex += 1;
    }
  }

  return newModuleJSONArray
};

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

// method to convert individual module json data to follow schema
const rearrangeModuleToModuleSchema = function rearrangeModule(data){

  // check Data Length, if doesn't fit return empty json
  if (data.length !== CSV_ROW_LENGTH) {
    return {};
  }

  let newModuleJSON = {};
  let newTermOfferedJSON = {};

  // Module
  newModuleJSON[MODULE_CODE] = data[CSV_MODULE_CODE].replace(/(\r\n|\n|\r)/gm, '');
  newModuleJSON[MODULE_NAME] = data[CSV_MODULE_NAME];
  newModuleJSON[MODULE_DESCRIPTION] = data[CSV_MODULE_DESC];
  newModuleJSON[MODULE_PREREQUISITE] = data[CSV_MODULE_PREREQ];
  newModuleJSON[MODULE_PRECLUSION] = data[CSV_MODULE_PRECLUSION];
  newModuleJSON[MODULE_MC] = parseInt(data[CSV_MODULE_MC], 10); // parameter to ensure decimal parsing

  // Semester Object + Quota
  newTermOfferedJSON = createNewTermOfferedObject(data, acadYear);
  newModuleJSON[MODULE_TERM_OFFERED] = newTermOfferedJSON;

  return newModuleJSON;
};

const storeModuleToDB = function storeToDB(ModuleJSON) {
  insertToModuleCollection(ModuleJSON);
};

//creating new Term Object
const createNewTermOfferedObject = function createTermObject(data, AcadYearString) {
  let termObject = [];
  let sem1Object = {};
  let sem2Object = {};
  let termIndex = 0;
  let sem1Quota;
  let sem2Quota;
  const sem1 = data[CSV_MODULE_SEM1];
  const sem2 = data[CSV_MODULE_SEM2];

  if (sem1 == IS_OFFERED) {
    sem1Quota = data[CSV_MODULE_SEM1Quota];
    sem1Object[TERM_YEAR] = AcadYearString;
    sem1Object[TERM_SEM] = 1;
    sem1Object[TERM_QUOTA] = parseInt(sem1Quota);
    termObject[termIndex] = sem1Object;
    termIndex += 1;
  }

  if (sem2 == IS_OFFERED) {
    sem2Quota = data[CSV_MODULE_SEM2Quota];
    sem2Object[TERM_YEAR] = AcadYearString;
    sem2Object[TERM_SEM] = 2;
    sem2Object[TERM_QUOTA] = parseInt(sem2Quota);
    termObject[termIndex] = sem2Object;
  }

  return termObject;
};

export {
  setCSVFilePathToBeParsed,
  setPapaParserConfig,
  setFileAcademicYear,
  parseCSVFileAndStoreToDB,
};
