import { Meteor } from 'meteor/meteor';
import {createModuleCollection} from '../imports/api/module'
import  {
  setCSVFilePathToBeParsed,
  setPapaParserConfig,
  setFileAcademicYear,
  parseCSVModuleFileToJSON,
  parseCSVFileAndStoreToDB,
  rearrangeModuleToModuleSchema,
  rearrangeJSONToModuleSchema,
  storeModuleToDB,
  storeJSONArrayToDB
} from '../imports/api/moduleCSVParser';

// CSV file name Property, to be included in the asset folder of the script
// by default Assets package will refer to the private folder in the repository.
const CSV_FILE_NAME = 'modules-1617.csv';
const CSV_FILE_FOLDER = '';
const FILE_YEAR = '16/17'

//papa-parse configuration
const PAPA_CONFIG = {
  header: false,
  skipEmptyLines: true,
};


Meteor.startup(() => {
  // code to run on server at startup
  createModuleCollection();
  //ParsingCSVFile, comment this out after first run
  setCSVFilePathToBeParsed(CSV_FILE_FOLDER + CSV_FILE_NAME);
  setPapaParserConfig(PAPA_CONFIG);
  setFileAcademicYear(FILE_YEAR);
  parseCSVFileAndStoreToDB();
});
