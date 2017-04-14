import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import PanelListItem from '../common/PanelListItem.jsx'
import SidebarModulesCardContainer from './SidebarModulesCardContainer.js'
import ProfileDetailsContainer from './ProfileDetailsContainer.jsx'
import InlineEdit from 'react-edit-inline';
import ReactTooltip from 'react-tooltip'
import * as constants from '../common/Constants.js';

export default class PanelLinks extends React.Component {
  constructor(){
    super();
  }

  openExemptedModuleInfoPage(){
    window.open("http://www.comp.nus.edu.sg/programmes/ug/exemptions/", "_blank");
  }

  openWaivedModuleInfoPage(){
    window.open("http://www.comp.nus.edu.sg/programmes/ug/cs/curr/#_ftnref7", "_blank");
  }

  openLink(link){
    window.open(link, "_blank");
  }

  /*
  http://www.comp.nus.edu.sg/programmes/ug/focus/
  http://www.nus.edu.sg/registrar/general-education/pre2015/list-of-all-general-education-modules.html
  http://www.nus.edu.sg/registrar/general-education/list-of-all-general-education-modules.html
  http://www.comp.nus.edu.sg/programmes/ug/exemptions/
  http://www.comp.nus.edu.sg/programmes/ug/cs/curr/
  */


  render() {
    return (
      <nav className="side-menu-addl">
        <PanelHeader  title="Useful Links" icon="font-icon font-icon-star" />
        {/* Contents of the Useful Links Panel */}
        <ul className="side-menu-addl-list">

          {/* CS DEGREE REQUIREMENTS*/}

          <PanelListItem displayType="header"
                         text="CS Degree Requirements"
                         isEditable={false} />
          <PanelListItem displayType=""
                         text="Prospective Students"
                         handleEditClick={this.openLink.bind(this,"http://www.comp.nus.edu.sg/programmes/ug/cs/curr/")}
                         isEditable={true} />
          <PanelListItem displayType=""
                         text="Cohort 2016/2017"
                         handleEditClick={this.openLink.bind(this,"http://www.comp.nus.edu.sg/cugresource/per-cohort/cs/cs-16-17/")}
                         isEditable={true} />
          <PanelListItem displayType=""
                         text="Cohort 2015/2016"
                         handleEditClick={this.openLink.bind(this,"http://www.comp.nus.edu.sg/cugresource/per-cohort/cs/cs-15-16/")}
                         isEditable={true} />
          <PanelListItem displayType=""
                         text="Cohort 2014/2015"
                         handleEditClick={this.openLink.bind(this,"http://www.comp.nus.edu.sg/cugresource/per-cohort/cs/cs-14-15/")}
                         isEditable={true} />

          {/* OTHERS */}

          <PanelListItem displayType="header"
                         text="Others"
                         isEditable={false} />
          <PanelListItem displayType=""
                         text="List of CS Focus Areas"
                         handleEditClick={this.openLink.bind(this,"http://www.comp.nus.edu.sg/programmes/ug/focus/")}
                         isEditable={true} />
          <PanelListItem displayType=""
                         text="List of All General Education Modules (before 2015)"
                         handleEditClick={this.openLink.bind(this,"http://www.nus.edu.sg/registrar/general-education/pre2015/list-of-all-general-education-modules.html")}
                         isEditable={true} />
          <PanelListItem displayType=""
                         text="List of All General Education Modules"
                         handleEditClick={this.openLink.bind(this,"http://www.nus.edu.sg/registrar/general-education/list-of-all-general-education-modules.html")}
                         isEditable={true} />
          <PanelListItem displayType=""
                         text="Exemptions for Polytechnic graduates"
                         handleEditClick={this.openLink.bind(this,"http://www.comp.nus.edu.sg/programmes/ug/exemptions/")}
                         isEditable={true} />
        </ul>
      </nav>
    );
  }
}
