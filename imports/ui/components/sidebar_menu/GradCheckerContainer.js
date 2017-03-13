import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getGraduationRequirements } from '../../../api/gradchecker-controller/methods.js';
import Nestable from '../common/Nestable.jsx';

export default GradCheckerContainer = createContainer((props) => {
  Meteor.subscribe('AcademicCohort');
  Meteor.subscribe('FocusArea');
  Meteor.subscribe('GraduationRequirements');
  Meteor.subscribe('ModuleFulfilments');
  const listType = props.listType;
  var requirements = getGraduationRequirements(props.activePlannerId);

  console.log(JSON.stringify(requirements));
  const items = [
    // { name: 'Open me 1', children: [
    //   { name: 'Open me 2', children: [
    //     { name: 'Open me 3', children: [
    //       { name: 'Open me 4', children: [
    //         { name: 'Open me 5', children: [
    //           { name: 'Open me 6', children: [
    //             { name: 'Open me 7', children: [
    //               { name: 'Open me 8', children: [
    //                 { name: 'Open me 9', children: [
    //                   { name: 'Open me 10', children: [
    //                     { name: 'Open me 11', children: [
    //                       { name: 'Open me 12', children: [
    //                         { name: 'Open me 13', children: [
    //                           { name: 'Open me 14', children: [
    //                             { name: 'Open me 15', children: [
    //                               { name: 'Open me 16', children: [
    //                                 { name: 'Open me 17', children: [
    //                                   { name: 'Open me 18', children: [
    //                                     { name: 'Open me 19', children: [
    //                                       { name: 'Open me 20', children: [
    //                                         { name: 'Hi' }
    //                                       ]}
    //                                     ]}
    //                                   ]}
    //                                 ]}
    //                               ]}
    //                             ]}
    //                           ]}
    //                         ]}
    //                       ]}
    //                     ]}
    //                   ]}
    //                 ]}
    //               ]}
    //             ]}
    //           ]}
    //         ]}
    //       ]}
    //     ]}
    //   ]}
    // ]}
  ];
  return { items };
}, Nestable);
