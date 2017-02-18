import React from 'react';
import SideTabbedMenu from './SideTabbedMenu'

class SidebarMenuButton extends SideTabbedMenu {
  constructor(){
    super();
  }
  render() {
    return (
        <li className={'brown' + (this.props.isActiveTab ? ' opened' : '')}
            onClick={this.props.onSwitchTab}>
          <a href="#">
            <i className="font-icon font-icon-home"></i>
            <span className="lbl">{this.props.buttonTitle}</span>
          </a>
        </li>
    );
  }
}

SidebarMenuButton.propTypes = {
  isActiveTab: React.PropTypes.node,
  onSwitchTab: React.PropTypes.node,
  buttonTitle: React.PropTypes.node
}
