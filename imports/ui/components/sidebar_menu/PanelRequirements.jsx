import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import GradCheckerContainer from './GradCheckerContainer.js'
import GridLoader from '../common/halogen/GridLoader.js';
import * as constants from '../common/Constants.js';

export default class PanelRequirements extends React.Component {
  constructor(){
    super();
    this.state = {isGradCheckerLoaded: false};
  }

  componentDidMount(){
    this.setState({isGradCheckerLoaded: true});
  }

  renderGradChecker(){
    return(
    <GradCheckerContainer activePlannerId={this.props.activePlannerId}/>);
  }

  render() {
    return (
      <nav className="side-menu-addl">
        <PanelHeader title="CS Degree Requirements" icon="font-icon font-icon-page" />
        {this.state.isGradCheckerLoaded ? this.renderGradChecker(): <GridLoader color="#ff6600" />}
      </nav>
    );
  }
}
