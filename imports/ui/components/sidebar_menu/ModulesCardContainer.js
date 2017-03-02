import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getStudentExemptedModules } from '../../../api/database-controller/student/methods.js';
import { getStudentWaivedModules } from '../../../api/database-controller/student/methods.js';
import ModulesCard from './ModulesCard.jsx';

export default ModulesCardContainer = createContainer((props) => {
  const listType = props.listType;
  // const modules = getStudentExemptedModules();
  var modules = {};
  if(listType == 'Exempted'){
    modules = getStudentExemptedModules();
    // modules = {
    //   CS1010: "CS1010"
    // }
  }
  else {
    modules = getStudentWaivedModules();
    // modules = {
    //   PC1221: "PC1221",
    //   LSM1301: "LSM1301"
    // }
  }

  return {
    modules,
    listType
  };
}, ModulesCard);
