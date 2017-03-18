import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

// Import logic methods
import { getAllModulesInSemester } from '../../../api/crud-controller/module/methods.js';

// Import React components
import SemModulesCard from './SemModulesCard.jsx';

export default SemModulesCardContainer = createContainer((props) => {
  const sem = props.sem;
  const semesterIndex = props.semesterIndex;
  const plannerID = props.plannerID;

  // Load modules in the user's study plan based on the semester and planner
  const modules = getAllModulesInSemester(semesterIndex, plannerID);
  console.time("semModsContainer ALL_MODULES_FOR_SEARCH");
  const modulesForSearch = Session.get("ALL_MODULES_FOR_SEARCH");
  console.timeEnd("semModsContainer ALL_MODULES_FOR_SEARCH");

  console.time("semModsContainer ALL_MODULES_FOR_SEARCH_FILTER_OPTIONS");
  const filterOptsForSearch = Session.get("ALL_MODULES_FOR_SEARCH_FILTER_OPTIONS");
  console.timeEnd("semModsContainer ALL_MODULES_FOR_SEARCH_FILTER_OPTIONS");
  console.log("\n")

  return {
    sem,
    modules,
    modulesForSearch,
    filterOptsForSearch
  };
}, SemModulesCard);
