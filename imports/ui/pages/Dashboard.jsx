import React from 'react';
import Sidebar from '../components/sidebar_menu/Sidebar';
import StudyPlan2 from '../components/StudyPlan2';
import StudyPlan from '../components/StudyPlan';

/*export default function Dashboard() {
  return (
    <div className="with-side-menu">
      <Sidebar />
      <StudyPlan2 />
    </div>
  );
}*/

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="with-side-menu">
          <Sidebar />
        <div className="page-content">
          <div className="container-fluid">
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
