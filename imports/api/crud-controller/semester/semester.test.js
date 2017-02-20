import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Planner } from '../planner/planner';
import { createPlanner,
         removePlanner,
         getPlannerIDs } from '../planner/methods';
import { insertNewSemesterInPlanner,
         insertNewAcademicYearInPlanner,
         getAllSemestersInPlanner,
         getSemesterInPlanner,
         deleteSemesterInPlanner } from './methods';

describe('semester', function () {
  const userID = 'da2hljfnlajdl1k2';

  beforeEach(function ()  {
    const plannerNames = ['plannerOne'];
    const focusArea = [
      ['Computer Graphics And Games',
       'Parallel Computing'],
    ];
    const academicYear = ['AY 2013/2014', 'AY 2013/2014', 'AY 2014/2015', 'AY 2014/2015', 'AY 2015/2016', 'AY 2015/2016', 'AY 2016/2017', 'AY 2016/2017'];
    const semesterNum = [1, 2, 1, 2, 1, 2, 1, 2];
    const semesterIndex = [];

    const moduleNames = ['Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Programming Methodology', 'Data Structures and Algorithms I', 'Data Structures and Algorithms II', 'Design and Analysis of Algorithms'];
    const plannerIDOne = createPlanner(plannerNames[0], focusArea[0], userID);

    for (var i=0; i < semesterNum.length; i++)  {
      semesterIndex.push(insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDOne));
    }

    const plannerOne = Planner.findOne(plannerIDOne);
    const retrievedSemesters = plannerOne.semesters;

    expect(plannerOne.semesters).to.be.an('array');
    assert.equal(plannerOne._id, plannerIDOne);

    assert.equal(retrievedSemesters.length, 8);
    assert.equal(semesterIndex[0], 0);
    assert.equal(semesterIndex[1], 1);
    assert.equal(semesterIndex[2], 2);
    assert.equal(semesterIndex[3], 3);
    assert.equal(semesterIndex[4], 4);
    assert.equal(semesterIndex[5], 5);
    assert.equal(semesterIndex[6], 6);
    assert.equal(semesterIndex[7], 7);
  });

  afterEach(function ()  {
    const plannerIDs = getPlannerIDs(userID);

    removePlanner(plannerIDs[0]);

    const removedPlannerOne = Planner.findOne(plannerIDs[0]);
    expect(removedPlannerOne).to.be.an('undefined');
  });

  it ('get all semester in planner', function() {
    const plannerIDs = getPlannerIDs(userID);

    const retrievedSemesters = getAllSemestersInPlanner(plannerIDs[0]);

    assert.equal(retrievedSemesters.length, 8);
    assert.equal(retrievedSemesters[0].academicYear, 'AY 2014/2015');
    assert.equal(retrievedSemesters[1].academicYear, 'AY 2014/2015');
    assert.equal(retrievedSemesters[2].academicYear, 'AY 2015/2016');
    assert.equal(retrievedSemesters[3].academicYear, 'AY 2015/2016');
    assert.equal(retrievedSemesters[4].academicYear, 'AY 2016/2017');
    assert.equal(retrievedSemesters[5].academicYear, 'AY 2016/2017');
    assert.equal(retrievedSemesters[6].academicYear, 'AY 2017/2018');
    assert.equal(retrievedSemesters[7].academicYear, 'AY 2017/2018');

    assert.equal(retrievedSemesters[0].semesterNum, 1);
    assert.equal(retrievedSemesters[1].semesterNum, 2);
    assert.equal(retrievedSemesters[2].semesterNum, 1);
    assert.equal(retrievedSemesters[3].semesterNum, 2);
    assert.equal(retrievedSemesters[4].semesterNum, 1);
    assert.equal(retrievedSemesters[5].semesterNum, 2);
    assert.equal(retrievedSemesters[6].semesterNum, 1);
    assert.equal(retrievedSemesters[7].semesterNum, 2);
  });

  it ('insert one academic year in planner', function() {
    const plannerIDs = getPlannerIDs(userID);

    const totalNumberOfSemestersInPlanner = insertNewAcademicYearInPlanner(plannerIDs[0]);

    const planner = Planner.findOne(plannerIDs[0]);

    const retrievedSemesters = planner.semesters;
    assert.equal(retrievedSemesters.length-1, totalNumberOfSemestersInPlanner);
    assert.equal(retrievedSemesters[retrievedSemesters.length-2].academicYear, 'AY 2018/2019');
    assert.equal(retrievedSemesters[retrievedSemesters.length-1].academicYear, 'AY 2018/2019');
  }),

  it ('get one semester in planner', function () {
    const plannerIDs = getPlannerIDs(userID);
    const semesterIndex = 0;

    const semesterModules = getSemesterInPlanner(semesterIndex, plannerIDs[0]);
    expect(semesterModules).to.be.a('object');
  });

  it ('delete semester in planner', function () {
    const plannerIDs = getPlannerIDs(userID);
    const semesterIndex = 0;

    const numOfSemesters = deleteSemesterInPlanner(semesterIndex, plannerIDs[0]);

    const planner = Planner.findOne(plannerIDs[0]);
    const retrievedSemesters = planner.semesters;

    assert.equal(retrievedSemesters.length-1, numOfSemesters);
  });
});
