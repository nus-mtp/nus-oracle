import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import GradCheckerContainer from './GradCheckerContainer.js'
import * as constants from '../common/Constants.js';

export default class PanelRequirements extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <nav className="side-menu-addl">
        <PanelHeader title="CS Degree Requirements" icon="font-icon font-icon-page" />
        <GradCheckerContainer activePlannerId={this.props.activePlannerId}/>
      </nav>
    );
  }
}
