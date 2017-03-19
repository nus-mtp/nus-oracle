import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getStudentAcademicCohort } from '../../../api/database-controller/student/methods.js';
import { getStudentPreviousEducation } from '../../../api/database-controller/student/methods.js';
import { updateStudentAcademicCohort } from '../../../api/database-controller/student/methods.js';
import { updateStudentPreviousEducation } from '../../../api/database-controller/student/methods.js';
import InlineEdit from 'react-edit-inline';
import ProfileDetails from './ProfileDetails.jsx';
import Select from 'react-select';

const PREV_EDUCATION = [
  { label: 'Junior College', value:'jc' },
  { label: 'Polytechnic', value: 'poly' },
  { label: 'Others', value: 'others'}
]

const ACAD_COHORT = [
  { label: 'AY 2012/2013', value:'AY 2012/2013' },
  { label: 'AY 2013/2014', value:'AY 2013/2014' },
  { label: 'AY 2014/2015', value:'AY 2014/2015' },
  { label: 'AY 2015/2016', value:'AY 2015/2016' },
  { label: 'AY 2016/2017', value:'AY 2016/2017' }
]

getLabelFromValue = function(value){
  for(i in PREV_EDUCATION)
    if(PREV_EDUCATION[i].value === value)
     return PREV_EDUCATION[i].label;
  return "";
}


export default ProfileDetailsContainer = createContainer((props) => {
  const studentInfoType = props.studentInfoType;
  const displayType = "header";
  var text = "no data";
  var onChange;

  switch(studentInfoType){
    case 'PrevEdu':
      info = getStudentPreviousEducation();
      text = getLabelFromValue(info);
      options = PREV_EDUCATION;
      onChange = function(data){
        updateStudentPreviousEducation(data.value)
      };
    break;
    case 'AcadCohort':
      info = getStudentAcademicCohort();
      text = info;
      options = ACAD_COHORT;
      onChange = function(data){
        updateStudentAcademicCohort(data.value)
      };
    break;
  }

  return { displayType, info, text, options, onChange };

}, ProfileDetails);
