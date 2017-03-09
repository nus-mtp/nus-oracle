import React from 'react';
import * as constants from '../common/Constants.js';
import { createPlanner } from '../../../api/crud-controller/planner/methods.js';
import { logout } from '../account/logout/LogoutAccount.jsx';

export default class SidebarMenu extends React.Component {
constructor(){
  super();

  this.state = {
    tabSelectedIndex: 0
  }
}

handleSwitchTab(index) {
  this.setState({tabSelectedIndex: index});
}

render(){
  var tabTitleList = this.props.tabTitleList;
  var activeMenuPanelIndex = this.state.tabSelectedIndex;
  var menuPanels = this.props.menuPanelsList;
  var iconList = this.props.iconList;

  return(
    <div>
    <nav className="side-menu side-menu-compact">
      <ul className="side-menu-list">
        {tabTitleList.map((buttonTitle, index) => {
          if(buttonTitle=="Logout"){
            return(
                <SidebarMenuButton key={index}
                     buttonTitle={buttonTitle}
                     onSwitchTab={logout}
                     isActiveTab={(this.state.tabSelectedIndex === index)}
                     buttonIcon={iconList[index]}/>
            )
          }
          return (
              <SidebarMenuButton key={index}
                   buttonTitle={buttonTitle}
                   onSwitchTab={this.handleSwitchTab.bind(this, index)}
                   isActiveTab={(this.state.tabSelectedIndex === index)}
                   buttonIcon={iconList[index]}/>)
        })}
      </ul>
    </nav>
    {menuPanels[activeMenuPanelIndex]}
  </div>
  );
}
}

class SidebarMenuButton extends SidebarMenu {
  constructor() {
    super();
    this.state = {
      onMouseOver: false
    }
  }

 handleOnMouseEnter(event) {
   this.setState({ onMouseOver: true });
 }

 handleOnMouseLeave(event) {
   this.setState({ onMouseOver: false });
 }

  render() {
    var buttonIcon = this.props.buttonIcon;
    return (
        <li className={'brown' + (this.props.isActiveTab ? ' opened' : '')}
            onClick={this.props.onSwitchTab}
            onMouseEnter={this.handleOnMouseEnter.bind(this)}
            onMouseLeave={this.handleOnMouseLeave.bind(this)}
            // calls function props onSwitchTab passed from parent componenet
            >
          <a href="#">
            <i className={"sidebarIcon fa fa-" + buttonIcon}></i>
            <span className={"lbl" + (this.state.onMouseOver ? " hovered" : "")}>
              {this.props.buttonTitle}
            </span>
          </a>
        </li>
    );
  }
}

SidebarMenu.propTypes = {
  tabTitleList: React.PropTypes.node,
  menuPanelsList: React.PropTypes.node,
  iconList: React.PropTypes.node
}

SidebarMenuButton.propTypes = {
  isActiveTab: React.PropTypes.bool,
  onSwitchTab: React.PropTypes.func,
  buttonTitle: React.PropTypes.string,
  buttonIcon: React.PropTypes.node
}
