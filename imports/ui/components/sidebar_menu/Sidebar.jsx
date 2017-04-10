import React from 'react';
import SidebarMenu from './SidebarMenu.jsx';
import SidebarPanel from './SidebarPanel.jsx';
import PanelRequirements from './PanelRequirements.jsx'
import PanelProfile from './PanelProfile.jsx'
import LoadingScreen from '../account/login/LoadingScreen.jsx';
import ModalContainer from '../common/ModalContainer.jsx';
import { logout } from '../account/logout/LogoutAccount.jsx';

export default class Sidebar extends React.Component {
  constructor(){
    super();
    this.state = {
      activeMenuPanelIndex: 0,
      isLoggingOut: false
    }
  }
  handleChangePassword() {
    this.props.onChangePassword();
  }
  handleLogout()  {
    this.setState({isLoggingOut: true});
    logout();
  };
  handleSwitchTab(index) {
    this.setState({activeMenuPanelIndex: index});
  }
  renderLogoutModal(){
    return(
      <ModalContainer disableHide={true}
                      content={<LoadingScreen loadText="Logging you out. Goodbye!" />} />
    );
  }
  render() {
    // var menuPanelsList = [<PanelProfile />, <PanelRequirements />, <SidebarPanel />, <SidebarPanel />, <SidebarPanel />];
    // var tabTitleList = ["My Profile", "Requirements", "Module Bin", "Exempted", "Recommend Me", "Logout"];
    var menuPanelsList = [<PanelProfile onChangePassword = {this.handleChangePassword.bind(this)}/>,
                          <PanelRequirements activePlannerId={this.props.activePlannerId}/>];
    var tabTitleList = ["My Profile", "Requirements", "Useful Links", "Logout"];
    var iconList = ["user", "tasks", "external-link", "power-off"];
    var activeMenuPanelIndex = this.state.activeMenuPanelIndex;
    return (
      <div className="my-side-menu">
        <div id="dashboard-logo-container">
          <img id="dashboard-logo"
               src="./images/logo/nusOracle-logo-light.png"
               alt="nus_oracle_logo_light" />
        </div>
        {this.state.isLoggingOut ? this.renderLogoutModal() : null}
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
