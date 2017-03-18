import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

// Import logic methods
import { getAllModulesInSemester } from '../../../api/crud-controller/module/methods.js';
import createFilterOptions from 'react-select-fast-filter-options';

// Import React components
import SemModulesCard from './SemModulesCard.jsx';

// Import Session variable name constant that contains the cached modules
import { ALL_MODULES_FOR_SEARCH } from '../../pages/DashboardContainer.jsx'

export default SemModulesCardContainer = createContainer((props) => {
  const sem = props.sem;
  const semesterIndex = props.semesterIndex;
  const plannerID = props.plannerID;

  // Load modules in the user's study plan based on the semester and planner
  const modules = getAllModulesInSemester(semesterIndex, plannerID);

  // Get list of modules used for the module search bar
  // Apply fast search filter on the list of modules too to speed up performance   
  const modulesForSearch = Session.get(ALL_MODULES_FOR_SEARCH);
  const filterOptions = createFilterOptions({ options: modulesForSearch });

  return {
    sem,
    modules,
    modulesForSearch,
    filterOptions
  };
}, SemModulesCard);
