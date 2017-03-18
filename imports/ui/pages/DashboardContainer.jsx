import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

// Import logic methods
import { getPlannerIDs } from '../../api/crud-controller/planner/methods.js';
import { getAllModules } from '../../api/searcher-controller/controller.js';

// Import React components
import Dashboard from './Dashboard.jsx';

export const ALL_MODULES_FOR_SEARCH = "allModulesForSearch";

export default DashboardContainer = createContainer(() => {
    Meteor.subscribe('planner');
    Meteor.subscribe('Student');
    Meteor.subscribe('Modules');
    //const userID = '9f91pejfj912ras';

    // Cache list of all modules stored in the DB as a user session variable
    Session.set(ALL_MODULES_FOR_SEARCH, getAllModules());

    const plannerIDs = getPlannerIDs();
    return { plannerIDs };
}, Dashboard);
