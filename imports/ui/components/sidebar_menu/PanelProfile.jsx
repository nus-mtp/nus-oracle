import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import PanelListItem from '../common/PanelListItem.jsx'
import LogoutAccount from '../account/logout/LogoutAccount.jsx'
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
        {/* Logout Button */}
        <LogoutAccount style={{padding: 1 + 'em'}}/>
        <PanelHeader  title="User Profile" icon="font-icon font-icon-user" />
        <ul className="side-menu-addl-list">
          <PanelListItem type="header" text="Chan Tat Seng" />
          <PanelListItem type="" text={ Meteor.user().username } />
          <ModulesCardContainer studentID="" listType="Exempted"/>
          <ModulesCardContainer studentID="" listType="Waived" />
          <PanelListItem type="header" text="Previous Education" />
          <ProfileDetailsContainer studentInfoType="PrevEdu"/>
          <PanelListItem type="header" text="Academic Cohort" />
          <ProfileDetailsContainer studentInfoType="AcadCohort"/>
          <PanelListItem type="header" text="Change Password" />
        </ul>
      </nav>
    );
  }
}
