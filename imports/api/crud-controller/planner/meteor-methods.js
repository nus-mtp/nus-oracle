import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { createPlanner,
         getPlannerFocusArea,
         getPlannerName,
         getPlannerUserID,
         getPlannerIDs,
         setPlannerFocusArea,
         setPlannerName,
         removePlanner } from './methods';
/**
* abstracts away the need to check for input validation by
* utilizing meteor methods functions
*/

export const m_createPlanner = new ValidatedMethod({
  name: 'createPlanner',
  validate: new SimpleSchema ({
    plannerName:  {
      type: String,
    },
    focusArea:  {
      type: Array,
    },
    userID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({plannerName, focusArea, userID}) {
    return createPlanner(plannerName, focusArea, userID);
  },
});

export const m_getPlannerFocusArea = new ValidatedMethod({
  name: 'getPlannerFocusArea',
  validate: new SimpleSchema ({
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({plannerID}) {
    return getPlannerFocusArea(plannerID);
  },
});

export const m_getPlannerName = new ValidatedMethod({
  name: 'getPlannerName',
  validate: new SimpleSchema ({
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({plannerID}) {
    return getPlannerName(plannerID);
  },
});

export const m_getPlannerUserID = new ValidatedMethod({
  name: 'getPlannerUserID',
  validate: new SimpleSchema ({
    plannerID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({plannerID}) {
    return getPlannerUserID(plannerID);
  },
});

export const m_getPlannerIDs = new ValidatedMethod({
  name: 'getSemesterInPlanner',
  validate: new SimpleSchema ({
    userID:  {
      type: String,
    },
  }).validator({clean: true}),

  run({userID}) {
    return getSemesterInPlanner(userID);
  },
});

export const m_setPlannerFocusArea = new ValidatedMethod({
  name: 'setPlannerFocusArea',
  validate: new SimpleSchema ({
    plannerID:  {
      type: String,
    },
    newFocusArea: {
      type: Array,
    },
  }).validator({clean: true}),

  run({plannerID, newFocusArea}) {
    return setPlannerFocusArea(plannerID, newFocusArea);
  },
});

export const m_setPlannerName = new ValidatedMethod({
  name: 'setPlannerName',
  validate: new SimpleSchema ({
    plannerID:  {
      type: String,
    },
    newPlannerName: {
      type: String,
    },
  }).validator({clean: true}),

  run({plannerID, newPlannerName}) {
    return setPlannerName(plannerID, newPlannerName);
  },
});

export const m_removePlanner = new ValidatedMethod({
  name: 'removePlanner',
  validate: new SimpleSchema ({
    plannerID:  {
      type: String,
    }
  }).validator({clean: true}),

  run({plannerID}) {
    return removePlanner(plannerID);
  },
});
