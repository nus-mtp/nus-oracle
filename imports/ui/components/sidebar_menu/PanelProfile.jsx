import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import PanelListItem from '../common/PanelListItem.jsx'
import SidebarModulesCardContainer from './SidebarModulesCardContainer.js'
import ProfileDetailsContainer from './ProfileDetailsContainer.jsx'
import InlineEdit from 'react-edit-inline';
import ReactTooltip from 'react-tooltip'
import * as constants from '../common/Constants.js';

export default class PanelProfile extends React.Component {
  constructor(){
    super();
  }

  handleChangePassword() {
    this.props.onChangePassword();
  }

  openExemptedModuleInfoPage(){
    window.open("http://www.comp.nus.edu.sg/programmes/ug/exemptions/", "_blank");
  }

  openWaivedModuleInfoPage(){
    window.open("http://www.comp.nus.edu.sg/programmes/ug/cs/curr/#_ftnref7", "_blank");
  }

  render() {
    let exemptedToolTip =
      <ReactTooltip id='Exempted' place="right" type="info" effect="solid">
        <div style={{width: '34em'}}>
          <span>
            <h5 style={{marginBottom: 0.8+"rem"}}>Exempted modules</h5>
            You're <strong>not required to take these modules</strong> and they <strong>will not be converted to UEs</strong><br/><br/>
            EXAMPLES:<br/>
            <b>LS1301:</b>Students with GCE 'A' level or H2 Biology are exempted from LSM1301 <br/>
            <b>CS1010:</b>Some Polytechnic students may be exempted from CS1010 if they took an equivalent course
          </span>
        </div>
      </ReactTooltip>

    let waivedToolTip =
      <ReactTooltip id='Waived' place="right" type="info" effect="solid">
        <div style={{width: '34em'}}>
          <span>
            <h5 style={{marginBottom: 0.8+"rem"}}>Waived modules</h5>
            You'll need to <strong>replace these modules with a UE module</strong><br/><br/>
            EXAMPLES:<br/>
            <b>PC1221:</b>Students with GCE 'A' level or H2 Physics are waived from PC1221
          </span>
        </div>
      </ReactTooltip>

    return (
      <nav className="side-menu-addl">
        <PanelHeader  title="My Profile" icon="font-icon font-icon-user" />

        {/* Contents of the Profile Panel */}
        <ul className="side-menu-addl-list">
          {/* User Information */}
          <PanelListItem displayType=""
                         text={ (Meteor.user()) ? Meteor.user().username : "" }
                         isEditable={false} />
          <PanelListItem displayType="header"
                         text="Change Password"
                         isEditable={true}
                         handleEditClick={this.handleChangePassword.bind(this)} />

          {/* Module Cards for Exempted and Waived Modules */}
          <SidebarModulesCardContainer
            studentID=""
            listType="Exempted"
            tooltip={exemptedToolTip}
            handleInfoClick={this.openExemptedModuleInfoPage.bind()} />
          <SidebarModulesCardContainer
            studentID=""
            listType="Waived"
            tooltip={waivedToolTip}
            handleInfoClick={this.openExemptedModuleInfoPage.bind()} />

          {/* Past Education Settings */}
          <PanelListItem displayType="header"
                         text="My Previous Education"
                         isEditable={false} />
          <ProfileDetailsContainer studentInfoType="PrevEdu" />

          <PanelListItem displayType="header"
                         text="My Academic Cohort"
                         isEditable={false} />
          <ProfileDetailsContainer studentInfoType="AcadCohort" />
        </ul>
      </nav>
    );
  }
}
