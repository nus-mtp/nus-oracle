import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

// Import logic methods
import createFilterOptions from 'react-select-fast-filter-options';
import { getPlannerIDs } from '../../api/crud-controller/planner/methods.js';
import { getAllModules } from '../../api/searcher-controller/controller.js';

// Import React components
import Dashboard from './Dashboard.jsx';

// Export Session variable name constants
export const ALL_MODULES_FOR_SEARCH = "ALL_MODULES_FOR_SEARCH";
export const ALL_MODULES_FOR_SEARCH_FILTER_OPTIONS = "ALL_MODULES_FOR_SEARCH_FILTER_OPTIONS";

const ESTIMATED_NUM_OF_MODULES = 7000;

Session.set(ALL_MODULES_FOR_SEARCH, []);
Session.set(ALL_MODULES_FOR_SEARCH_FILTER_OPTIONS, undefined);

export default DashboardContainer = createContainer(() => {
    Meteor.subscribe('planner');
    Meteor.subscribe('Student');
    Meteor.subscribe('Modules');
    //const userID = '9f91pejfj912ras';

    // Cache only once after a successful cache
    if (Session.get(ALL_MODULES_FOR_SEARCH).length <= ESTIMATED_NUM_OF_MODULES &&
        Session.get(ALL_MODULES_FOR_SEARCH_FILTER_OPTIONS) === undefined) {
      // Cache list of all modules stored in the DB as a user session variable
      let modulesForSearch = getAllModules();
      let filterOptions = createFilterOptions({ options: modulesForSearch });

      console.time("dashboard getAllModules()");
      Session.set(ALL_MODULES_FOR_SEARCH, modulesForSearch);
      console.log("ALL MODS FOR SEARCH inside", Session.get(ALL_MODULES_FOR_SEARCH).length);
      Session.set(ALL_MODULES_FOR_SEARCH_FILTER_OPTIONS, filterOptions());
      console.timeEnd("dashboard getAllModules()");
    }
    console.log("ALL MODS FOR SEARCH outside", Session.get(ALL_MODULES_FOR_SEARCH).length);

    const plannerIDs = getPlannerIDs();
    return { plannerIDs };
}, Dashboard);
