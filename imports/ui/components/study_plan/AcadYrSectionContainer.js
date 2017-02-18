import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getAllSemestersInPlanner } from '../../../api/crud-controller/planner/methods';
import AcadYrSection from './AcadYrSection';

export default AcadYrSectionContainer = createContainer((props) => {
  let plannerID = props.plannerID;
  if (!plannerID) {
    plannerID = '';
  }

  const listOfSemesters = getAllSemestersInPlanner(plannerID);
  return {
    plannerID,
    listOfSemesters
  };
}, AcadYrSection);
