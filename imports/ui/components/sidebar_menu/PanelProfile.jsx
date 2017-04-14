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

  /**
   * Renders the tooltip to explain what exempted/waived means
   *
   * @param {String} id    Unique ID of this tooltip
   * @param {String} title    Title of the tooltip
   * @param {String} instructions    A description of exempted/waived
   * @param {String} examples    Array of example objects in this format:
   *   [
   *     {
   *       moduleCode: "LSM1301",
   *       explanation: "Some explanation about why this is exempted/waived"
   *     }, ...
   *   ]
   * @return {Node}    React component to display the tooltip
   */
  renderExemptedWaivedTooltip(id, title, instructions, examples) {
    return (
      <ReactTooltip id={id} place="right" effect="solid" delayShow={300}>
        <div style={{width: '27em'}}>
          <div className="tbl-row" style={{color: '#f2aa4c', fontSize: '1.75em'}}>
            {title}
          </div>
          <div style={{fontSize: '1.2em', marginBottom: '20px'}}>
            {instructions}
          </div>
          <div className="tbl-row">
            <div style={{marginBottom: '5px'}}>
              <b>EXAMPLES:</b>
            </div>
            {examples.map((example, index) => {
              return (
                <div key={index} style={{marginBottom: '5px'}}>
                  <b>{example.moduleCode}: </b>
                  {example.explanation}
                </div>
              );
            })}
          </div>
        </div>
      </ReactTooltip>
    );
  }

  render() {
    let exemptedToolTip =
      this.renderExemptedWaivedTooltip(
        "Exempted",
        "Exempted Modules",
        "You're not required to take these modules and they will not be converted to UEs",
        [
          {
            moduleCode: "LSM1301",
            explanation: "Students with GCE 'A' level or H2 Biology are exempted from LSM1301"
          },
          {
            moduleCode: "CS1010",
            explanation: "Some Polytechnic students may be exempted from CS1010 " +
                         "if they have already taken an equivalent course"
          }
        ]
      );

    let waivedToolTip =
      this.renderExemptedWaivedTooltip(
        "Waived",
        "Waived Modules",
        "You'll need to replace these modules with a UE module",
        [
          {
            moduleCode: "PC1221",
            explanation: "Students with GCE 'A' level or H2 Physics are waived from PC1221"
          }
        ]
      );

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
