import React from 'react';
import Sidebar from '../components/Sidebar';
import StudyPlan2 from '../components/StudyPlan2';

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
            <StudyPlan />
          </div>
        </div>
      </div>
    );
  }
}
