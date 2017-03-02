import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getAllModulesInSemester } from '../../../api/crud-controller/module/methods.js';
import ModulesCard from './ModulesCard.jsx';

export default ModulesCardContainer = createContainer((props) => {
  const sem = props.sem;
  const semesterIndex = props.semesterIndex;
  const plannerID = props.plannerID;

  const modules = getAllModulesInSemester(semesterIndex, plannerID);
  return {
    sem,
    modules
  };
}, SemModulesCard);
