import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getStudentAcademicCohort } from '../../../api/database-controller/student/methods.js';
import { getStudentPreviousEducation } from '../../../api/database-controller/student/methods.js';
import { updateStudentAcademicCohort } from '../../../api/database-controller/student/methods.js';
import { updateStudentPreviousEducation } from '../../../api/database-controller/student/methods.js';
import InlineEdit from 'react-edit-inline';
import PanelListItem from '../common/PanelListItem.jsx';
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

export default ProfileDetailsContainer = createContainer((props) => {
  const studentInfoType = props.studentInfoType;
  const type= "header";
  const isEditable = true;
  var text = "no data";
  switch(studentInfoType){
    case 'PrevEdu':
      info = getStudentPreviousEducation();
      text = info;
      editable = <Select placeholder={info}
              multi={false} clearable={false} searchable={false}
              options={PREV_EDUCATION} value={info}
              onChange={(data)=>{updateStudentPreviousEducation(data.value)}} />
      break;

    case 'AcadCohort':
      info = getStudentAcademicCohort();
      text = info;
      editable = <Select placeholder={info}
              multi={false} clearable={false} searchable={false}
              options={ACAD_COHORT} value={info}
              onChange={(data)=>{updateStudentAcademicCohort(data.value)}} />
      break;
  }

  return { type, text, editable, isEditable };

}, PanelListItem);
