import React from 'react';
import AcadYrRow from './AcadYrRow.jsx';

export default class AcadYrSection extends React.Component {
  render() {
    const plannerID = this.props.plannerID;
    const listOfSemesters = this.props.listOfSemesters;
    return (
      <article className="activity-line-item box-typical">
        <div className="activity-line-action-list">
          {listOfSemesters.map((semester, rank) => {
            // renders only an academic year which contains 2 semesters
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
  listOfSemesters: React.PropTypes.array,
}
