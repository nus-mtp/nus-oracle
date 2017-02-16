import React from 'react';
import Sidebar from '../components/sidebar_menu/Sidebar';
import StudyPlan2 from '../components/StudyPlan2';
import StudyPlan from '../components/StudyPlan';
import { Planner } from '../../api/crud-controller/planner/planner';

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
    // in here, will need to call list of planner ids from accounts
    // without accounts done, just return an empty id array
    const userID = '9f91pejfj912ras';

    const plannerIDs = Planner.find({userID: userID});
    // contents panel lists show what semesters and modules are in this planner
    // to show what semesters and modules are in here, requires planner number


    return (
      <div className="with-side-menu">
          <Sidebar />
        <div className="page-content">
          <div className="container-fluid">
            <StudyPlan plannerIDs={plannerIDs}/>
          </div>
        </div>
      </div>
    );
  }
}
