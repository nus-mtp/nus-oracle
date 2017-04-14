import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getAllSemestersInPlanner } from '../../../api/student-logic-controller/crud-controller/semester/methods.js';
import AcadYrSection from './AcadYrSection.jsx';

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
