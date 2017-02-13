import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sendQuery } from './controller';
import { createModuleCollection } from '../database-controller/module';
import  {
  setCSVFilePathToBeParsed,
  setPapaParserConfig,
  setFileAcademicYear,
  parseCSVFileAndStoreToDB } from '../database-conversion/moduleCSVParser';


describe('search-controller', function() {
  const CSV_FILE_NAME = 'modules-1617.csv';
  const CSV_FILE_FOLDER = '';
  const FILE_YEAR = '16/17'

  //papa-parse configuration
  const PAPA_CONFIG = {
    header: false,
    skipEmptyLines: true,
  };

  // code to run on server at startup
  createModuleCollection();
  //ParsingCSVFile, comment this out after first run
  setCSVFilePathToBeParsed(CSV_FILE_FOLDER + CSV_FILE_NAME);
  setPapaParserConfig(PAPA_CONFIG);
  setFileAcademicYear(FILE_YEAR);
  parseCSVFileAndStoreToDB();

  it('full module code search query returns correct modules', function() {
    const code = 'CS1010';
    const moduleArrayResults = sendQuery(code);
    assert.equal(moduleArrayResults.length, 5);
  });

  it ('half finished module code search query returns correct modules', function()  {
    const code = '1010';
    const moduleArrayResults = sendQuery(code);

    assert.equal(moduleArrayResults.length, 5);
  });

});
