//import method to check existence of academic cohort
import {AcademicCohort} from '../database-controller/AcademicCohort/acadCohort';
// import method to update existing module fulfilment
import {ModuleFulfilments} from '../database-controller/module-fulfilment/moduleFulfilment';
import { createNewModuleFulfilment,
         updateModuleMappingOfModuleFulfilment } from '../database-controller/module-fulfilment/methods';
// import method to update academic year counting
import { increaseAcadYearByOne } from '../../utils/util';

export const scrapeModuleMappingListingForULR1516 = function scrapeModuleMapping(){
const humanCultureModuleFulfilmentDefault = "Human Cultures";
const questionModuleFulfilmentDefault = "Asking Question";
const reasoningModuleFulfilmentDefault = "Quantitative Reasoning";
const singaporeModuleFulfilmentDefault = "Singapore Studies";
const thinkingModuleFulfilmentDefault = "Thinking and Expression";

const DEFAULT_ACAD_YEAR = "AY 2015/2016";

const isNotEmpty = function(string) {
  return string != '';
}

const humanCultureRegex =/GEH\d{4}/ ;
const questionRegex =/GEQ\d{4}/ ;
const reasoningRegex =/GER\d{4}/ ;
const singaporeRegex =/GES\d{4}/ ;
const thinkingRegex =/GET\d{4}/ ;

var $ = cheerio.load(Meteor.http.get("https://inetapps.nus.edu.sg/bulletin/gem_modules.aspx?ModuleCode=GE_EXT").content);
var humanCultureModule = [];
var questionModule = [];
var reasoningModule = [];
var singaporeModule = [];
var thinkingModule = [];

// all module code is stored in anchor tag text. SO obtain all the anchor element and get those that
// fulfil the regex check
$('a').each(function(i,elem){
  let currentCode = $(this).text();
  // group up the moduleCode according to the array
  if(humanCultureRegex.test(currentCode)){
    humanCultureModule.push(currentCode);
  } else if(questionRegex.test(currentCode)){
    questionModule.push(currentCode);
  } else if(reasoningRegex.test(currentCode)){
    reasoningModule.push(currentCode);
  } else if(singaporeRegex.test(currentCode)){
    singaporeModule.push(currentCode);
  } else if(thinkingRegex.test(currentCode)){
    thinkingModule.push(currentCode)
  }

});
// Start from default academic year
let currentAcademicYear = DEFAULT_ACAD_YEAR;
// increment the academic year til you found the academic cohort that exists in the database
while(AcademicCohort.find({cohortName: currentAcademicYear}).count() == 0){
  currentAcademicYear = increaseAcadYearByOne(currentAcademicYear);
}
// keep on adding the module mapping to the modulefulfilments collection til
// the academic cohort does not exist
// i.e. stop at the newest academic cohort
while(AcademicCohort.find({cohortName: currentAcademicYear}).count() != 0){
  // check if the moduleMapping exist, if exist, update the mapping, if not create a new document
  if (ModuleFulfilments.find({moduleCode:humanCultureModuleFulfilmentDefault}).count() == 0){
    createNewModuleFulfilment(currentAcademicYear,humanCultureModuleFulfilmentDefault, humanCultureModule);
  } else {
    updateModuleMappingOfModuleFulfilment(currentAcademicYear,humanCultureModuleFulfilmentDefault, humanCultureModule);
  }

  if (ModuleFulfilments.find({moduleCode:reasoningModuleFulfilmentDefault}).count() == 0){
    createNewModuleFulfilment(currentAcademicYear,reasoningModuleFulfilmentDefault, reasoningModule);
  } else {
    updateModuleMappingOfModuleFulfilment(currentAcademicYear,reasoningModuleFulfilmentDefault, reasoningModule);
  }

  if (ModuleFulfilments.find({moduleCode:singaporeModuleFulfilmentDefault}).count() == 0){
    createNewModuleFulfilment(currentAcademicYear,singaporeModuleFulfilmentDefault, singaporeModule);
  } else {
    updateModuleMappingOfModuleFulfilment(currentAcademicYear,singaporeModuleFulfilmentDefault, singaporeModule);
  }

  if (ModuleFulfilments.find({moduleCode:thinkingModuleFulfilmentDefault}).count() == 0){
    createNewModuleFulfilment(currentAcademicYear, thinkingModuleFulfilmentDefault, thinkingModule);
  } else {
    updateModuleMappingOfModuleFulfilment(currentAcademicYear, thinkingModuleFulfilmentDefault, thinkingModule);
  }

  if (ModuleFulfilments.find({moduleCode:questionModuleFulfilmentDefault}).count() == 0){
    createNewModuleFulfilment(currentAcademicYear, questionModuleFulfilmentDefault, questionModule);
  } else {
    updateModuleMappingOfModuleFulfilment(currentAcademicYear, questionModuleFulfilmentDefault, questionModule);
  }

  currentAcademicYear = increaseAcadYearByOne(currentAcademicYear);
}
console.log(currentAcademicYear);

console.log(ModuleFulfilments.findOne({moduleCode:questionModuleFulfilmentDefault}));
console.log(ModuleFulfilments.findOne({moduleCode:thinkingModuleFulfilmentDefault}));
console.log(ModuleFulfilments.findOne({moduleCode:singaporeModuleFulfilmentDefault}));
console.log(ModuleFulfilments.findOne({moduleCode:humanCultureModuleFulfilmentDefault}));
console.log(ModuleFulfilments.findOne({moduleCode:reasoningModuleFulfilmentDefault}));
}
