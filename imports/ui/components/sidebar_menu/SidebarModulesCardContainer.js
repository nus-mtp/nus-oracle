import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Import React components
import SidebarModulesCard from './SidebarModulesCard.jsx';

// Import logic functions
import { getStudentExemptedModules } from '../../../api/database-controller/student/methods.js';
import { getStudentWaivedModules } from '../../../api/database-controller/student/methods.js';

export default SidebarModulesCardContainer = createContainer((props) => {
  const listType = props.listType;
  var modules = {};

  switch(listType){
    case 'Exempted':
      modules = getStudentExemptedModules();
      break;
    case 'Waived':
      modules = getStudentWaivedModules();
      break;
  }

  return {
    modules,
    listType
  };
}, SidebarModulesCard);
