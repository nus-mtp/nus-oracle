import React from 'react';

export default class SideTabbedMenu extends React.Component {
constructor(){
  super();

  this.state = {
    tabSelectedIndex: 0
  }
}

handleSwitchTab(index) {
  this.setState({tabSelectedIndex: index});
}

}
