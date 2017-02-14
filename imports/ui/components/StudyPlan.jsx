import React from 'react';
import SignIn from './SignIn'
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
    var contentPanelsList = [<BasicTable />, <BasicTable />];

    return (
          <TabbedContainer tabTitleList={["Plan A", "Plan B"]}
                           contentPanelsList={contentPanelsList}/>
    );
  }
}
