import React from 'react';
import TabbedContainer from './study_plan/TabbedContainer.jsx';
import { getPlannerName,
         getPlannerUserID } from '../../api/crud-controller/planner/methods.js';

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
                           plannerIDs={this.props.plannerIDs}/>
    );
  }
}

StudyPlan.propTypes = {
  plannerIDs: React.PropTypes.array,
}
