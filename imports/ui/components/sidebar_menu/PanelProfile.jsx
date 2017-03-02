import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import PanelListItem from '../common/PanelListItem.jsx'
import IconButton from '../common/IconButton.jsx'
import LogoutAccount from '../login/LogoutAccount.jsx'
import * as constants from '../common/Constants.js';

export default class PanelProfile extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <nav className="side-menu-addl" style={styles.PanelProfile}>
        <PanelHeader  title="User Profile" icon="font-icon font-icon-user" />

        <ul className="side-menu-addl-list">
          {/* User Name Field */}
          <PanelListItem type="header" text="Chan Seng Tat" />
          {/* User Email Field */}
          <PanelListItem type="" text="chanstat@u.nus.edu" />
          {/* Exempted modules List */}
          <PanelListItem type="header" text="Exempted Modules" />
          {/* Waived Modules list */}
          <PanelListItem type="header" text="Waived Modules" />
          {/* Logout Button */}
          <LogoutAccount />
        </ul>
      </nav>
    );
  }
}

const styles = ({
  PanelProfile: {
    width: constants.SIDEBAR_PANEL_WIDTH +'px',
    left: constants.SIDEBAR_MENU_WIDTH + 'px'
  }
});
