import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getStudentExemptedModules } from '../../../api/database-controller/student/methods.js';
import Nestable from '../common/Nestable.jsx';

export default GradCheckerContainer = createContainer((props) => {
  const listType = props.listType;
  // const modules = getStudentExemptedModules();
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
}, Nestable);
