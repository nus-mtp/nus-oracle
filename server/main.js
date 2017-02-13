import { Meteor } from 'meteor/meteor';
import  {
  setCSVFilePathToBeParsed,
  setPapaParserConfig,
  setFileAcademicYear,
  parseCSVFileAndStoreToDB } from '../imports/api/database-conversion/moduleCSVParser';

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
  //ParsingCSVFile, comment this out after first run

  setCSVFilePathToBeParsed(CSV_FILE_FOLDER + CSV_FILE_NAME);
  setPapaParserConfig(PAPA_CONFIG);
  setFileAcademicYear(FILE_YEAR);
  parseCSVFileAndStoreToDB();
});
