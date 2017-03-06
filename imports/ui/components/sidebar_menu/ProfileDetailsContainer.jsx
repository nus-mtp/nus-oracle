import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getStudentAcademicCohort } from '../../../api/database-controller/student/methods.js';
import { getStudentPreviousEducation } from '../../../api/database-controller/student/methods.js';
import { updateStudentAcademicCohort } from '../../../api/database-controller/student/methods.js';
import { updateStudentPreviousEducation } from '../../../api/database-controller/student/methods.js';
import InlineEdit from 'react-edit-inline';
import PanelListItem from '../common/PanelListItem.jsx';

export default ProfileDetailsContainer = createContainer((props) => {
  const studentInfoType = props.studentInfoType;
  const type= "header";
  
  switch(studentInfoType){
    case 'PrevEdu':
      info = getStudentPreviousEducation();
      editable = <InlineEdit text={info} paramName="changed" change={(data) => {
                    if(data && data.changed)
                      updateStudentPreviousEducation(data.changed);
                  }}/>;
      break;
    case 'AcadCohort':
      info = getStudentAcademicCohort();
      editable = <InlineEdit text={info} paramName="changed" change={(data) => {
                    if(data && data.changed)
                      updateStudentAcademicCohort(data.changed);
                  }}/>;
      break;
  }

  return { type, editable };

}, PanelListItem);
