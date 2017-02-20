import React from 'react';
import SidebarMenu from './SidebarMenu.jsx';
import SidebarPanel from './SidebarPanel.jsx';
import PanelRequirements from './PanelRequirements.jsx'

export default class Sidebar extends React.Component {
  render() {
    var menuPanelsList = [<SidebarPanel />, <PanelRequirements />, <SidebarPanel />, <SidebarPanel />, <SidebarPanel />];
    var tabTitleList = ["My Profile", "Requirements", "Module Bin", "Exempted", "Recommend Me"];
    var iconList = ["home", "cart", "speed", "users", "comments"];
    return (
      <div className="my-side-menu">
        <SidebarMenu tabTitleList={tabTitleList}
                        menuPanelsList={menuPanelsList}
                        iconList={iconList}/>
      </div>
    );
  }
}
