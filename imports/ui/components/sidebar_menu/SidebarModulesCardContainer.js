import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Import React components
import SidebarModulesCard from './SidebarModulesCard.jsx';

// Import logic functions
import { getStudentExemptedModules } from '../../../api/database-controller/student/methods.js';
import { getStudentWaivedModules } from '../../../api/database-controller/student/methods.js';
import { findModuleInfo } from './../../../api/searcher-controller/controller.js';

export default SidebarModulesCardContainer = createContainer((props) => {
  const listType = props.listType;

  // Map of module codes, e.g. {"CS1010" : "CS1010"}
  var modulesMap = {};

  switch(listType){
    case 'Exempted':
      modulesMap = getStudentExemptedModules();
      break;
    case 'Waived':
      modulesMap = getStudentWaivedModules();
      break;
  }

  // Load modules into the user's exempted and waived modules
  let modulesMapArray = Object.keys(modulesMap);
  let modules = [];
  for (let i = 0; i < modulesMapArray.length; i++) {
    modules.push(findModuleInfo(modulesMapArray[i]));
  }

  return {
    modules,
    listType
  };
}, SidebarModulesCard);
