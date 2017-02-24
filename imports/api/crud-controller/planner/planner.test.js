import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Planner } from './planner';
import { createPlanner,
         getPlannerFocusArea,
         getPlannerName,
         getPlannerUserID,
         setPlannerFocusArea,
         getPlannerIDs,
         setPlannerName,
         removePlanner } from './methods';

describe('planner', function () {
  const userID = 'da2hljfnlajdl1k2';

  beforeEach(function (done)  {
    const plannerNames = ['plannerOne', 'plannerTwo', 'plannerThree'];
    const focusArea = [
      ['Computer Graphics And Games',
       'Parallel Computing'],
      ['Computer Graphics and Games',
       'Algorithms and Theory'],
      ['Computer Graphics and Games',
       'Parallel Computing']
    ];
    const academicYear = ['AY14/15', 'AY14/15', 'AY15/16', 'AY15/16', 'AY16/17', 'AY16/17', 'AY17/18', 'AY17/18'];
    const semesterNum = [1, 2, 1, 2, 1, 2, 1, 2];
    const semesterIndex = [0, 1, 2, 3, 4, 5, 6, 7];

    const plannerIDOne = createPlanner(plannerNames[0], focusArea[0], userID);
    const plannerIDTwo = createPlanner(plannerNames[1], focusArea[1], userID);
    const plannerIDThree = createPlanner(plannerNames[2], focusArea[2], userID);

    done();

    /*
    const plannerOne = Planner.findOne(plannerIDOne);
    const plannerTwo = Planner.findOne(plannerIDTwo);
    const plannerThree = Planner.findOne(plannerIDThree);

    expect(plannerOne.semesters).to.be.an('array');
    expect(plannerTwo.semesters).to.be.an('array');
    expect(plannerThree.semesters).to.be.an('array');

    assert.equal(plannerOne._id, plannerIDOne);
    assert.equal(plannerTwo._id, plannerIDTwo);
    assert.equal(plannerThree._id, plannerIDThree);
    */
  });

  afterEach(function (done)  {
    const plannerIDs = getPlannerIDs(userID);

    removePlanner(plannerIDs[0]);
    removePlanner(plannerIDs[1]);
    removePlanner(plannerIDs[2]);

    done();

    /*
    const removedPlannerOne = Planner.findOne(plannerIDs[0]);
    const removedPlannerTwo = Planner.findOne(plannerIDs[1]);
    const removedPlannerThree = Planner.findOne(plannerIDs[2]);

    expect(removedPlannerOne).to.be.an('undefined');
    expect(removedPlannerTwo).to.be.an('undefined');
    expect(removedPlannerThree).to.be.an('undefined');
    */
  });

  it ('check if planner ids are correctly returned', function()  {
    const plannerIDs = getPlannerIDs(userID);
    const plannerOne = Planner.findOne(plannerIDs[0]);
    const plannerTwo = Planner.findOne(plannerIDs[1]);
    const plannerThree = Planner.findOne(plannerIDs[2]);

    // plannerIDs returns normal results when given correct userID
    expect(plannerIDs).to.be.an('array');
    assert.equal(plannerIDs.length, 3);
    assert.equal(plannerIDs[0], plannerOne._id);
    assert.equal(plannerIDs[1], plannerTwo._id);
    assert.equal(plannerIDs[2], plannerThree._id);

    // plannerIDs returns empty result when given wrong user ID
    const wrongUserID = 'alkjarnlaas';
    const wrongPlannerIDs = getPlannerIDs(wrongUserID);
    assert.equal(wrongPlannerIDs.length, 0);
  });

  it ('get planner focus area', function () {
    const plannerIDs = getPlannerIDs(userID);

    const retrievedFocusAreaOne = getPlannerFocusArea(plannerIDs[0]);

    assert.equal(retrievedFocusAreaOne[0], 'Computer Graphics And Games');
    assert.equal(retrievedFocusAreaOne[1], 'Parallel Computing');
  });

  it ('get planner name', function ()  {
    const plannerIDs = getPlannerIDs(userID);
    const planner = Planner.findOne(plannerIDs[0]);

    const plannerName = getPlannerName(plannerIDs[0]);
    expect(plannerName).to.be.a('string');
    assert.equal(plannerName, planner.name);
  });

  it ('get planner userID', function()  {
    const plannerIDs = getPlannerIDs(userID);

    const plannerUserID = getPlannerUserID(plannerIDs[0]);
    expect(plannerUserID).to.be.a('string');
    assert.equal(plannerUserID, userID);
  });

  it ('set new planner focus area', function()  {
    const plannerIDs = getPlannerIDs(userID);

    const newFocusArea = ['Computer Graphics And Games'];
    const numOfDocumentsUpdatedWithSemester = setPlannerFocusArea(plannerIDs[0], newFocusArea);

    const planner = Planner.findOne(plannerIDs[0]);

    assert.equal(numOfDocumentsUpdatedWithSemester, 1);
    assert.equal(planner.focusArea.length, 1);
    assert.equal(planner.focusArea[0], 'Computer Graphics And Games');
  });

  it ('set new planner name', function()  {
    const plannerIDs = getPlannerIDs(userID);

    const newPlannerName = 'testNewPlanner';
    const numOfDocumentsUpdatedWithSemester = setPlannerName(plannerIDs[0], newPlannerName);
    const planner = Planner.findOne(plannerIDs[0]);

    assert.equal(planner.name, newPlannerName);
    assert.equal(numOfDocumentsUpdatedWithSemester, 1);
  });
});
