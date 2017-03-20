import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import PanelListItem from '../common/PanelListItem.jsx'
import ModulesCardContainer from './ModulesCardContainer.js'
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
  datachanged(data){
    console.log(data);
  }

  openExemptedModuleInfoPage(){
    window.open("http://www.comp.nus.edu.sg/programmes/ug/exemptions/polygrad/", "_blank");
  }

  openWaivedModuleInfoPage(){
    window.open("http://www.comp.nus.edu.sg/programmes/ug/cs/curr/#_ftnref7", "_blank");
  }

  render() {
    let exemptedToolTip =
      <ReactTooltip id='Exempted' place="right" type="info" effect="solid">
        <span> <h5 style={{marginBottom: 0.8+"rem"}}>Exempted modules </h5>
            Modules that you are not required to take and are not converted to UEs<br/><br/>
            EXAMPLES: <br/>
            <b>LS1301:</b> Students with A-level or H2 Biology are<br/>
            exempted from taking LSM1301 <br/>
            <b>CS1010:</b> Polytechnic students who are<br/>
            exempted from CS1010 </span>
      </ReactTooltip>

    let waivedToolTip =
      <ReactTooltip id='Waived' place="right" type="info" effect="solid">
        <span> <h5 style={{marginBottom: 0.8+"rem"}}>Example of waived modules:</h5>
            Modules that you are not required to take but are converted to UEs<br/><br/>
            EXAMPLES: <br/>
            <b>PC1221:</b> Students with A-level or H2 Physics<br/>
            have PC1221 waived</span>
      </ReactTooltip>
    return (
      <nav className="side-menu-addl">
        <PanelHeader  title="User Profile" icon="font-icon font-icon-user" />
        <ul className="side-menu-addl-list">
          <PanelListItem displayType="header" text="E-mail"  isEditable={false}/>
          <PanelListItem displayType="" text={ (Meteor.user()) ? Meteor.user().username : "" }  isEditable={false}/>
          <ModulesCardContainer studentID="" listType="Exempted" tooltip={exemptedToolTip} handleInfoClick={this.openExemptedModuleInfoPage.bind()}/>
          <ModulesCardContainer studentID="" listType="Waived" tooltip={waivedToolTip} handleInfoClick={this.openExemptedModuleInfoPage.bind()}/>
          <PanelListItem displayType="header" text="Previous Education" isEditable={false}/>
          <ProfileDetailsContainer studentInfoType="PrevEdu"/>
          <PanelListItem displayType="header" text="Academic Cohort"  isEditable={false}/>
          <ProfileDetailsContainer studentInfoType="AcadCohort"/>
          <PanelListItem displayType="header" text="Change Password"  isEditable={false}
          onClick = {this.handleChangePassword.bind(this)}/>
        </ul>
      </nav>
    );
  }
}
