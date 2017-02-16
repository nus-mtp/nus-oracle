import React from 'react';
import AcadYrRow from './AcadYrRow';

export default class AcadYrSection extends React.Component {
  render() {

    // retrieve planner number here

    let listOfAcadYrRows = [<AcadYrRow key="1" acadYr="Y1 AY14/15" />,
                            <AcadYrRow key="2" acadYr="Y2 AY15/16" />,
                            <AcadYrRow key="3" acadYr="Y3 AY16/17" />,
                            <AcadYrRow key="4" acadYr="Y4 AY17/18" />];


    return (
      <article className="activity-line-item box-typical">
        <div className="activity-line-action-list">
          {listOfAcadYrRows.map((acadYrRow) => {
            return acadYrRow;
          })}
        </div>
      </article>
    );
  }
}

AcadYrSection.propTypes = {
  plannerIDs: React.PropTypes.array
}
