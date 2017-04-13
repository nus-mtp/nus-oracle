import React from 'react';
import TabbedContainer from './TabbedContainer.jsx';
import { getPlannerName,
         getPlannerUserID } from '../../../api/student-logic-controller/crud-controller/planner/methods.js';

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
                           plannerIDs={this.props.plannerIDs}
                           handleSelectTab={this.props.handleSelectTab}/>
    );
  }
}

StudyPlan.propTypes = {
  // Planner IDs to render on user's Study Plan Dashboard
  plannerIDs: React.PropTypes.array,
}
