import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Import logic methods
import { getPlannerIDs } from '../../api/crud-controller/planner/methods.js';

// Import React components
import Dashboard from './Dashboard.jsx';

export default DashboardContainer = createContainer(() => {
    Meteor.subscribe('planner');
    Meteor.subscribe('Student');
    Meteor.subscribe('Modules');
    
    Meteor.subscribe('AcademicCohort');
    Meteor.subscribe('FocusArea');
    Meteor.subscribe('GraduationRequirements');
    Meteor.subscribe('ModuleFulfilments');

    //const userID = '9f91pejfj912ras';

    const plannerIDs = getPlannerIDs();
    return { plannerIDs };

}, Dashboard);
