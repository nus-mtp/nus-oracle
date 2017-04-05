import React from 'react';
import SidebarMenu from './SidebarMenu.jsx';
import SidebarPanel from './SidebarPanel.jsx';
import PanelRequirements from './PanelRequirements.jsx'
import PanelProfile from './PanelProfile.jsx'
import LoadingScreen from '../account/login/LoadingScreen.jsx';
import ModalContainer from '../common/ModalContainer.jsx';

export default class Sidebar extends React.Component {
  constructor(){
    super();
    this.state = {
      activeMenuPanelIndex: 0,
      loadMessage: "Logging out"
    }
  }
  handleChangePassword() {
    this.props.onChangePassword();
  }
  handleLogout() {
    this.props.onLogout();
  }
  handleSwitchTab(index) {
    this.setState({activeMenuPanelIndex: index});
  }
  handleHideLoading() {
    console.log("nothing here");
  };

  render() {
    // var menuPanelsList = [<PanelProfile />, <PanelRequirements />, <SidebarPanel />, <SidebarPanel />, <SidebarPanel />];
    // var tabTitleList = ["My Profile", "Requirements", "Module Bin", "Exempted", "Recommend Me", "Logout"];
    var menuPanelsList = [<PanelProfile onChangePassword = {this.handleChangePassword.bind(this)}/>,
                          <PanelRequirements activePlannerId={this.props.activePlannerId}/>,
                          <ModalContainer onHidden={this.handleHideLoading.bind(this)}
                                          content={<LoadingScreen loadText= {this.state.loadMessage}/>} />];
    var tabTitleList = ["My Profile", "Requirements", "Logout"];
    var iconList = ["user", "tasks", "power-off"];
    var activeMenuPanelIndex = this.state.activeMenuPanelIndex;
    return (
      <div className="my-side-menu">
        <div id="dashboard-logo-container">
          <img id="dashboard-logo"
               src="./images/logo/nusOracle-logo-light.png"
               alt="nus_oracle_logo_light" />
        </div>
        <SidebarMenu  tabTitleList={tabTitleList}
                      activeMenuPanelIndex={activeMenuPanelIndex}
                      menuPanelsList={menuPanelsList}
                      iconList={iconList}
                      onSwitchTab={this.handleSwitchTab.bind(this)}
                      onLogout = {this.handleLogout.bind(this)}/>
        {menuPanelsList[activeMenuPanelIndex]}
      </div>
    );
  }
}
