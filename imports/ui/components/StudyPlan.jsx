import React from 'react';
import SignIn from './SignIn2'
import TabbedContainer from './common/TabbedContainer';
import BasicTable from './common/BasicTable';

/*export default function StudyPlan() {
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="col-xxl-3 col-md-6">
          Study Plan
        </div>
      </div>
    </div>
  );
}*/

export default class StudyPlan extends React.Component {
  render() {
    // in here, will need to call list of planner ids from accounts
    // without accounts done, just return an empty id array

    // from list of planner ids, loop and call getPlanner to get an array of planner objects

    // for each planner object, create a 'basic table' tab that will input the necessay inputs (such as semesters) into the table
    // do loop and for each do a push <BasicTable /> component into the array


    var contentPanelsList = [<BasicTable />]; // basic table will need input of basic information using props

    // tab list will contain the string name of planner

    return (
          <TabbedContainer tabTitleList={["Plan A", "Plan B"]}
                           contentPanelsList={contentPanelsList}/>
    );
  }
}
