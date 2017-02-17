import React from 'react';
import AcadYrRow from './AcadYrRow';
import { getAllSemestersInPlanner } from '../../../api/crud-controller/planner/methods';

export default class AcadYrSection extends React.Component {
  render() {
    // does a check to see if plannerID is a valid character, else return an empty string
    let plannerID = this.props.plannerID;
    if (!plannerID) {
      plannerID = '';
    }

    let listOfSemesters = getAllSemestersInPlanner(plannerID);

    return (
      <article className="activity-line-item box-typical">
        <div className="activity-line-action-list">
          {listOfSemesters.map((semester, rank) => {
            // renders an academic year which contains 2 semesters
            if (rank%2 == 0)  {
              return <AcadYrRow key={rank} semesterIndex={[rank, rank+1]} acadYr={semester.academicYear} plannerID={plannerID} />;
            }
          })}
        </div>
      </article>
    );
  }
}

AcadYrSection.propTypes = {
  plannerID: React.PropTypes.string,
}
