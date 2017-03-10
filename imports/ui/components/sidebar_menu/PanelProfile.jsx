import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import PanelListItem from '../common/PanelListItem.jsx'
import ModulesCardContainer from './ModulesCardContainer.js'
import ProfileDetailsContainer from './ProfileDetailsContainer.jsx'
import InlineEdit from 'react-edit-inline';
import * as constants from '../common/Constants.js';

export default class PanelProfile extends React.Component {
  constructor(){
    super();
  }

  datachanged(data){
    console.log(data);
  }

  render() {
    return (
      <nav className="side-menu-addl">
        <PanelHeader  title="User Profile" icon="font-icon font-icon-user" />
        <ul className="side-menu-addl-list">
          <PanelListItem type="header" text="E-mail"  isEditable={false}/>
          <PanelListItem type="" text={ (Meteor.user()) ? Meteor.user().username : "" }  isEditable={false}/>
          <ModulesCardContainer studentID="" listType="Exempted"/>
          <ModulesCardContainer studentID="" listType="Waived" />
          <PanelListItem type="header" text="Previous Education" isEditable={false}/>
          <ProfileDetailsContainer studentInfoType="PrevEdu"/>
          <PanelListItem type="header" text="Academic Cohort"  isEditable={false}/>
          <ProfileDetailsContainer studentInfoType="AcadCohort"/>
          <PanelListItem type="header" text="Change Password"  isEditable={false}/>
        </ul>
      </nav>
    );
  }
}
