import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import PanelListItem from '../common/PanelListItem.jsx'
import IconButton from '../common/IconButton.jsx'
import LogoutAccount from '../account/logout/LogoutAccount.jsx'
import ModulesCardContainer from './ModulesCardContainer.js'
import * as constants from '../common/Constants.js';

export default class PanelProfile extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <nav className="side-menu-addl">
        <PanelHeader  title="User Profile" icon="font-icon font-icon-user" />
        <ul className="side-menu-addl-list">
          <PanelListItem type="header" text="Chan Seng Tat" />
          <PanelListItem type="" text="chanstat@u.nus.edu" />
          <ModulesCardContainer studentID="" listType="Exempted"/>
          <ModulesCardContainer studentID="" listType="Waived" />
          <PanelListItem type="header" text="Previous Education" />
          <PanelListItem type="" text="(getStudentPreviousEducation)" />
          <PanelListItem type="header" text="Academic Cohort" />
          <PanelListItem type="" text="(getStudentAcademicCohort)" />
          {/* Logout Button */}
          <LogoutAccount style={{padding: 1 + 'em'}}/>
        </ul>
      </nav>
    );
  }
}
