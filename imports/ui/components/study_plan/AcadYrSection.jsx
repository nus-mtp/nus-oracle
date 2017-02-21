import React from 'react';
import AcadYrRow from './AcadYrRow.jsx';
import Button from '../common/Button.jsx';

export default class AcadYrSection extends React.Component {
  handleAddAYButtonClick() {
    console.log("ADDDED AY!!");
  }

  render() {
    const plannerID = this.props.plannerID;
    const listOfSemesters = this.props.listOfSemesters;
    const addSemesterButtonIcon =
      <i className="glyphicon glyphicon-plus"
         style={{marginTop: "0.15em", marginRight: "0.5em"}}></i>

    return (
      <article className="activity-line-item box-typical">
        <div className="activity-line-action-list">
          {listOfSemesters.map((semester, rank) => {
            // renders only an academic year which contains 2 semesters
            if (rank % 2 == 0)  {
              return <AcadYrRow key={rank}
                                semesterIndex={[rank, rank + 1]}
                                acadYr={semester.academicYear}
                                plannerID={plannerID} />;
            }
          })}
          <Button buttonClass="btn btn-inline btn-warning-outline"
                  style={{position: "relative", left: "40%"}}
                  buttonText="New Academic Year"
                  buttonIcon={addSemesterButtonIcon}
                  onButtonClick={this.handleAddAYButtonClick.bind(this)} />
        </div>
      </article>
    );
  }
}

AcadYrSection.propTypes = {
  plannerID: React.PropTypes.string,
  listOfSemesters: React.PropTypes.array,
}
