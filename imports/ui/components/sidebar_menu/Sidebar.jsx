import React from 'react';
import SideTabbedMenu from './SideTabbedMenu';
import SideTabbedMenuExtension from './SideTabbedMenuExtension';

export default class Sidebar extends React.Component {
  render() {
    var menuPanelsList = [<SideTabbedMenuExtension />, <SideTabbedMenuExtension />, <SideTabbedMenuExtension />, <SideTabbedMenuExtension />, <SideTabbedMenuExtension />];
    var tabTitleList = ["My Profile", "Requirements", "Module Bin", "Exempted", "Recommend Me"];
    var iconList = ["home", "cart", "speed", "users", "comments"];
    return (
      <div className="my-side-menu">
        <SideTabbedMenu tabTitleList={tabTitleList}
                        menuPanelsList={menuPanelsList}
                        iconList={iconList}/>
      </div>
    );
  }
}
