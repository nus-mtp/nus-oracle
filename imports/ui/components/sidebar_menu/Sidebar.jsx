import React from 'react';
import SidebarMenu from './SidebarMenu.jsx';
import SidebarPanel from './SidebarPanel.jsx';
import PanelRequirements from './PanelRequirements.jsx'
import PanelProfile from './PanelProfile.jsx'

export default class Sidebar extends React.Component {
  constructor(){
    super();
    this.state = {
      activeMenuPanelIndex: 0
    }
  }

  handleSwitchTab(index) {
    this.setState({activeMenuPanelIndex: index});
  }

  render() {
    // var menuPanelsList = [<PanelProfile />, <PanelRequirements />, <SidebarPanel />, <SidebarPanel />, <SidebarPanel />];
    // var tabTitleList = ["My Profile", "Requirements", "Module Bin", "Exempted", "Recommend Me", "Logout"];
    var menuPanelsList = [<PanelProfile />, <PanelRequirements />];
    var tabTitleList = ["My Profile", "Requirements", "Logout"];
    var iconList = ["user", "tasks", "power-off"];
    var activeMenuPanelIndex = this.state.activeMenuPanelIndex;
    return (
      <div className="my-side-menu">
        <SidebarMenu  tabTitleList={tabTitleList}
                      activeMenuPanelIndex={activeMenuPanelIndex}
                      menuPanelsList={menuPanelsList}
                      iconList={iconList}
                      onSwitchTab={this.handleSwitchTab.bind(this)}/>
        {menuPanelsList[activeMenuPanelIndex]}
      </div>
    );
  }
}
