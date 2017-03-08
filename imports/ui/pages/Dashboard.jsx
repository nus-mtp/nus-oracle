import React from 'react';
import Sidebar from '../components/sidebar_menu/Sidebar';
import StudyPlan from '../components/study_plan/StudyPlan';
import * as constants from '../components/common/Constants.js';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="with-side-menu">
          <Sidebar />
        <div className="page-content" style={{padding: '0 0 0 350px'}}>
          <div className="container-fluid" style={{padding: '0px'}}>
            <StudyPlan plannerIDs={this.props.plannerIDs}/>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  plannerIDs: React.PropTypes.array
}
