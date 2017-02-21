import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { insertNewAcademicYearInPlanner,
         deleteAcademicYearInPlanner,
         insertNewSemesterInPlanner,
         getAllSemestersInPlanner,
         getSemesterInPlanner,
         deleteSemesterInPlanner} from './methods';
/**
* abstracts away the need to check for input validation by
* utilizing meteor methods functions
*/

export const m_insertNewAcademicYearInPlanner = new ValidatedMethod({
  name: 'insertNewAcademicYearInPlanner',
  validate: new SimpleSchema ({
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({plannerID}) {
    return insertNewAcademicYearInPlanner(plannerID);
  },
});

export const m_deleteAcademicYearInPlanner = new ValidatedMethod({
  name: 'deleteAcademicYearInPlanner',
  validate: new SimpleSchema ({
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({plannerID}) {
    return deleteAcademicYearInPlanner(plannerID);
  },
});

export const m_insertNewSemesterInPlanner = new ValidatedMethod({
  name: 'insertNewSemesterInPlanner',
  validate: new SimpleSchema ({
    academicYear: {
      type: String,
    },
    semesterNum: {
      type: Number,
    },
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({academicYear, semesterNum, plannerID}) {
    return insertNewSemesterInPlanner(academicYear, semesterNum, plannerID);
  },
});

export const m_getAllSemestersInPlanner = new ValidatedMethod({
  name: 'getAllSemestersInPlanner',
  validate: new SimpleSchema ({
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({plannerID}) {
    return getAllSemestersInPlanner(plannerID);
  },
});

export const m_getSemesterInPlanner = new ValidatedMethod({
  name: 'getSemesterInPlanner',
  validate: new SimpleSchema ({
    semesterIndex: {
      type: Number,
    },
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({semesterIndex, plannerID}) {
    return getSemesterInPlanner(semesterIndex, plannerID);
  },
});

export const m_deleteSemesterInPlanner = new ValidatedMethod({
  name: 'deleteSemesterInPlanner',
  validate: new SimpleSchema ({
    semesterIndex: {
      type: Number,
    },
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({semesterIndex, plannerID}) {
    return deleteSemesterInPlanner(semesterIndex, plannerID);
  },
});
