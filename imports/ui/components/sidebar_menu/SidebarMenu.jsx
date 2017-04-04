import React from 'react';
import * as constants from '../common/Constants.js';
import { createPlanner } from '../../../api/crud-controller/planner/methods.js';
import { logout } from '../account/logout/LogoutAccount.jsx';

export default class SidebarMenu extends React.Component {

  handleLogout(index)  {
    this.props.onSwitchTab(index);
    logout();
  };

render(){
  var tabTitleList = this.props.tabTitleList;
  var iconList = this.props.iconList;
  var activeMenuPanelIndex = this.props.activeMenuPanelIndex;

  return(
    <nav className="side-menu side-menu-compact">
      <ul className="side-menu-list">
        {tabTitleList.map((buttonTitle, index) => {
          if(buttonTitle=="Logout"){
            return(
                <SidebarMenuButton key={index}
                     buttonTitle={buttonTitle}
                     onSwitchTab={this.handleLogout.bind(this, index)}

                     isActiveTab={(activeMenuPanelIndex === index)}
                     buttonIcon={iconList[index]}/>
            );
          }
          return (
              <SidebarMenuButton key={index}
                   buttonTitle={buttonTitle}
                   onSwitchTab={this.props.onSwitchTab}
                   index={index}
                   isActiveTab={(activeMenuPanelIndex === index)}
                   buttonIcon={iconList[index]}/>
          );
        })}
      </ul>
    </nav>
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

 handeOnClick(event){
   this.props.onSwitchTab(this.props.index);
 }

  render() {
    var buttonIcon = this.props.buttonIcon;
    var index = this.props.index;
    return (
        <li className={'brown' + (this.props.isActiveTab ? ' opened' : '')}
            onClick={this.handeOnClick.bind(this)}
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
  activeMenuPanelIndex: React.PropTypes.number,
  onSwitchTab: React.PropTypes.func,
  iconList: React.PropTypes.node
}

SidebarMenuButton.propTypes = {
  isActiveTab: React.PropTypes.bool,
  index: React.PropTypes.number,
  onSwitchTab: React.PropTypes.func,
  buttonTitle: React.PropTypes.string,
  buttonIcon: React.PropTypes.node
}
