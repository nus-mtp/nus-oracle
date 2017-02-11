// moduleCSVParser.js script is to accept a CSV file and parse it into a JSON file
// which can later be stored in the module database.
// CSV file is to be stored in the private folder in the local repository,
// and accessed using the Assets Meteor package.
// This file are supposed to only run once, The entire file will be read
// and stored in the
import { Meteor } from 'meteor/meteor';
import { createModuleCollection,
         removeAllModule,
         isExistModuleCollection,
         insertToModuleCollection,} from './module';

// CSV file name Property, to be included in the same folder as this script

const CSV_FILE_NAME = 'modules-1617.csv';
const CSV_FILE_FOLDER = '';
const FILE_YEAR = '16/17'

//papa-parse config
const PAPA_CONFIG = {
  header: false,
  skipEmptyLines: true,
};

// data mapping for CSV-JSON output from papa parse
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
const CSV_MODULE_sem1Quota = 7;
const CSV_MODULE_SEM2 = 8;
const CSV_MODULE_sem2Quota = 9;
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

let csvFile = CSV_FILE_FOLDER + CSV_FILE_NAME;

const setFilePath = function changeFileName( filePth) {
  if (filePth.type === String){
    csvFile = filePth;
  }
}

// method to read csv file, return
const CSVToJSON = function openingCSVFile() {
  if (csvFile != '') {
    const FileContentInString = Assets.getText(csvFile);
    // parse to JSON by using Papa.parse
    const JSONParsedResult = Papa.parse(FileContentInString, PAPA_CONFIG);
    // The new JSON file is stored in data
    return JSONParsedResult.data;
  }
};

//creating new Term Object
const createNewTermOfferedObject = function createTermObject(data, AcadYearString) {
  let termObject = [];
  let sem1Object = {};
  let sem2Object = {};

  const sem1 = data[CSV_MODULE_SEM1];
  const sem2 = data[CSV_MODULE_SEM2];
  let sem1Quota;
  let sem2Quota;

  if (sem1 == IS_OFFERED) {
    sem1Quota = data[CSV_MODULE_sem1Quota];
    sem1Object[TERM_YEAR] = AcadYearString;
    sem1Object[TERM_SEM] = 1;
    sem1Object['quota'] = sem1Quota;
    termObject[0] = sem1Object;
  }

  if (sem2 == IS_OFFERED) {
    sem2Quota = data[CSV_MODULE_sem2Quota];
    sem2Object[TERM_YEAR] = AcadYearString;
    sem2Object[TERM_SEM] = 2;
    sem2Object['quota'] = sem2Quota;
    termObject[1] = sem2Object;
  }

  return termObject;
};

// method to convert individual json data to follow schema
const rearrangeModuleToModuleSchema = function rearrangeData(data){
  // check Data Length, if doesn't fit return empty json
  if (data.length !== CSV_ROW_LENGTH ){
    return {};
  }

  let newModuleJSON = {};
  let newTermOfferedJSON = {};

  //Module
  newModuleJSON[MODULE_CODE] = data[CSV_MODULE_CODE];
  newModuleJSON[MODULE_NAME] = data[CSV_MODULE_NAME];
  newModuleJSON[MODULE_DESCRIPTION] = data[CSV_MODULE_DESC];
  newModuleJSON[MODULE_PREREQUISITE] = data[CSV_MODULE_PREREQ];
  newModuleJSON[MODULE_PRECLUSION] = data[CSV_MODULE_PRECLUSION];
  newModuleJSON[MODULE_MC] = parseInt(data[CSV_MODULE_MC]);

  //termOffered
  newTermOfferedJSON = createNewTermOfferedObject(data, FILE_YEAR);
  newModuleJSON[MODULE_TERM_OFFERED] = newTermOfferedJSON;

  return newModuleJSON;
};

const rearrangeJSONtoModuleSchema = function rearrangeJSON(rawJSONData) {

  const rawJSONLength = rawJSONData.length;
  const newModuleJSONArray = [];
  let currentRawIndex;
  let currentNewJSONIndex = 0;

  for (currentRawIndex = 0; currentRawIndex < rawJSONLength; currentRawIndex++) {

    let currentObj = rawJSONData[currentRawIndex];
    newModuleJSONArray[currentNewJSONIndex] = rearrangeModuleToModuleSchema(currentObj);
    currentNewJSONIndex++;
  }

  return newModuleJSONArray
};

const storeModuleToDB = function storeToDB(ModuleJSON) {
    insertToModuleCollection(ModuleJSON);
};

const storeJSONArrayToDB = function storeArrayToDB(JSONArray){
    if(!isExistModuleCollection()){
      createModuleCollection();
    }
    removeAllModule();

    let currentArrayIndex;

    for (currentArrayIndex = 0; currentArrayIndex < JSONArray.length ; currentArrayIndex++){
      storeModuleToDB(JSONArray[currentArrayIndex]);
      console.log(currentArrayIndex)
    }
};

//createModCollection();
//const rawModuleJSON = CSVToJSON();
//const newModuleJSONArray = rearrangeJSONtoModuleSchema(rawModuleJSON);
//toreJSONArrayToDB(newModuleJSONArray);
