import React from 'react';
import SignIn from './SignIn2'
import AcadYrSection from './study_plan/AcadYrSection';
import TabbedContainer from './common/TabbedContainer';
import AcadYrRow from './study_plan/AcadYrRow';
import { getPlannerName,
         getPlannerUserID } from '../../api/crud-controller/planner/methods';

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
    let plannerNames = [];
    if (this.props.plannerIDs)  {
      for (var i = 0; i < this.props.plannerIDs.length; i++)  {
        plannerNames.push(getPlannerName(this.props.plannerIDs[i]));
      }
    }

    let contentPanelsList = [<AcadYrSection plannerIDs= {this.props.plannerIDs}/>];

    return (
          <TabbedContainer tabTitleList={plannerNames}
                           contentPanelsList={contentPanelsList} />
    );
  }
}

StudyPlan.propTypes = {
  plannerIDs: React.PropTypes.array,
}
