import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getAllModulesInSemester } from '../../../api/crud-controller/module/methods.js';
import SemSpecialModulesCard from './SemSpecialModulesCard.jsx';

export default SemSpecialModulesCardContainer = createContainer((props) => {
  const specialSem = props.specialSem;
  const semesterIndex = props.semesterIndex;
  const plannerID = props.plannerID;

  const specialSemModules = getAllModulesInSemester(semesterIndex, plannerID);

  return {
    specialSem,
    specialSemModules
  };
}, SemSpecialModulesCard);
