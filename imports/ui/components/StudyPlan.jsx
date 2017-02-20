import React from 'react';

import TabbedContainer from './common/TabbedContainer';
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

    return (
          <TabbedContainer tabTitleList={plannerNames}
                           plannerIDs={this.props.plannerIDs} />
    );
  }
}

StudyPlan.propTypes = {
  plannerIDs: React.PropTypes.array,
}
