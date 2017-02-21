import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { getAllModulesInSemester,
         insertOneModuleInSemester,
         getOneModuleInSemester,
         deleteOneModuleInSemester } from './methods';
/**
* abstracts away the need to check for input validation by
* utilizing meteor methods functions
*/

export const getAllModulesInSemester = new ValidatedMethod({
  name: 'getAllModulesInSemester',
  validate: new SimpleSchema ({
    semesterIndex: {
      type: String,
    },
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({semesterIndex, plannerID}) {
    return getAllModulesInSemester(semesterIndex, plannerID);
  },
});

export const insertOneModuleInSemester = new ValidatedMethod({
  name: 'insertOneModuleInSemester',
  validate: new SimpleSchema ({
    semesterIndex: {
      type: String,
    },
    moduleCode: {
      type: String,
    },
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({semesterIndex, plannerID}) {
    return insertOneModuleInSemester(semesterIndex, moduleCode, plannerID);
  },
});

export const getOneModuleInSemester = new ValidatedMethod({
  name: 'getOneModuleInSemester',
  validate: new SimpleSchema ({
    semesterIndex: {
      type: String,
    },
    moduleCode: {
      type: String,
    },
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({semesterIndex, plannerID}) {
    return getOneModuleInSemester(semesterIndex, moduleCode, plannerID);
  },
});

export const deleteOneModuleInSemester = new ValidatedMethod({
  name: 'deleteOneModuleInSemester',
  validate: new SimpleSchema ({
    semesterIndex: {
      type: String,
    },
    moduleCode: {
      type: String,
    },
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({semesterIndex, plannerID}) {
    return deleteOneModuleInSemester(semesterIndex, moduleCode, plannerID);
  },
});
