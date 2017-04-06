import React from 'react';

// Import React Components
import PanelHeader from '../common/PanelHeader.jsx'
import MCsCounterContainer from './MCsCounterContainer.js'
import GradCheckerContainer from './GradCheckerContainer.js'
import Nestable from '../common/Nestable.jsx'

// Import constants and utilities
import * as constants from '../common/Constants.js';

export default class PanelRequirements extends React.Component {
  render() {
    return (
      <nav className="side-menu-addl">
        <PanelHeader title="CS Degree Requirements" icon="font-icon font-icon-page" />
        <MCsCounterContainer activePlannerId={this.props.activePlannerId}/>
        <GradCheckerContainer activePlannerId={this.props.activePlannerId}/>
      </nav>
    );
  }
}
