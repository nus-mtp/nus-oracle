// moduleCSVParser.js script is to accept a CSV file and parse it into a JSON file
// which can later be stored in the module database.

import { Meteor } from 'meteor/meteor';
// CSV file name Property, to be included in the same folder as this script
const CSV_FILE_NAME = 'module.js';

// CSV value Mapping, to be changed depending on the file input
const CSV_MODULE_CODE = 0;
const CSV_MODULE_NAME = 1;
const CSV_MODULE_DESCRIPTION = 2;
const CSV_MODULE_PREREQUISITE = 3;
const CSV_MODULE_COREQUISITE = 4;
const CSV_MODULE_PRECLUSION = 5;
const CSV_MODULE_TERM_OFFERED = 6;


// module JSON key
const MODULE_CODE = 'moduleCode';
const MODULE_NAME = 'moduleName';
const MODULE_DESCRIPTION = 'moduleDescription';
const MODULE_PREREQUISITE = 'modulePrequisite';
const MODULE_COREQUISITE = 'moduleCorequisiste';
const MODULE_PRECLUSION = 'modulePreclusion';
const MODULE_TERM_OFFERED = 'moduleTermOffered';


let csvFile = '';
// method to read csv file, return
const openCSVFile = function openingCSVFile() {
  return csvFile;
};

var a = Assets.getText('temp/temp.csv');
console.log(a);

var b = Papa.parse(a, {
  header: true,
});
console.log(b);
