import React from 'react';
import Sidebar from '../components/sidebar_menu/Sidebar';
import StudyPlan from '../components/study_plan/StudyPlan';
import * as constants from '../components/common/Constants.js';

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      tabSelectedIndex: 0
    }
  }
  handleSelectTab(index) {
    this.setState({tabSelectedIndex: index});
  }
  render() {
    return (
      <div className="with-side-menu">
          <Sidebar activePlannerId={this.props.plannerIDs[this.state.tabSelectedIndex]}/>
        <div className="page-content" style={{padding: '0 0 0 350px'}}>
          <div className="container-fluid" style={{padding: '0px'}}>
            <StudyPlan plannerIDs={this.props.plannerIDs}
                       handleSelectTab={this.handleSelectTab.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  plannerIDs: React.PropTypes.array
}
