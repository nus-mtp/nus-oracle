//script made to pull data for the team lezzgo
//several planner to reject
/// test fixture planner
/// defaultPlanner
import { Planner } from '../crud-controller/planner/planner';
var jsonfile = require('jsonfile');

export const parseForLezzgo = function parseForLezzgo() {
  lezzgoJSON = {"data":[]};

  //planner fixture to be ignored
  const rejectedPlannerName = ['testPlanner', 'testPlannerTwo', 'testPlannerThree', 'testPlannerFour', 'testPlannerFive'];
  const rejectedPlannerID = ["DefaultStudyPlanner"];

  // fetch all of the planner in the database, ignoring default planner and sample planner
  const currentObject = Planner.find({$and:[{name:{$nin:rejectedPlannerName}},
                                           {userID:{$nin:rejectedPlannerID}}]}).fetch();
  for(var i = 0; i < currentObject.length ; i++){
    //
    console.log(currentObject[i].name);

  }

}
