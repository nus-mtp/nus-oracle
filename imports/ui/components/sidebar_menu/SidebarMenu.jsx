import React from 'react';
import * as constants from '../common/Constants.js';

export default class SidebarMenu extends React.Component {
constructor(){
  super();

  this.state = {
    tabSelectedIndex: 1
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
    <nav className="side-menu side-menu-compact"
         style={styles} >
      <ul className="side-menu-list">
        {tabTitleList.map((buttonTitle, index) => {
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
  render() {
    var buttonIcon = this.props.buttonIcon;
    return (
        <li className={'brown' + (this.props.isActiveTab ? ' opened' : '')}
            onClick={this.props.onSwitchTab}
            // calls function props onSwitchTab passed from parent componenet
            >
          <a href="#">
            <i className={"font-icon font-icon-" + buttonIcon}></i>
            <span className="lbl">{this.props.buttonTitle}</span>
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

const styles = ({
    width: constants.SIDEBAR_MENU_WIDTH +'px'
});
