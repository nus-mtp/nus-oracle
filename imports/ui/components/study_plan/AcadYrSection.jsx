import React from 'react';
import AcadYrRow from './AcadYrRow.jsx';
import Button from '../common/Button.jsx';

import { insertNewAcademicYearInPlanner } from '../../../api/crud-controller/semester/methods.js';

export default class AcadYrSection extends React.Component {
  handleAddAYButtonClick() {
    insertNewAcademicYearInPlanner(this.props.plannerID);
  }

  isLastAcadYr(acadYrIndex, numOfAcadYrs) {
    // acadYrIndex is 0-indexed, hence we must add 1
    return acadYrIndex + 1 === numOfAcadYrs;
  }

  render() {
    const plannerID = this.props.plannerID;
    const listOfSemesters = this.props.listOfSemesters;

    return (
      <article className="activity-line-item box-typical tab-content-box">
        <div className="activity-line-action-list">

          {listOfSemesters.map((semester, rank) => {
            // 0-indexed acad year (0: first acad year, 1: second acad year...)
            let acadYrIndex = rank % 4; // '4' since each acad year has 4 sems

            if (acadYrIndex === 0) {
              return <AcadYrRow key={rank}
                        isLastAcadYr={
                          this.isLastAcadYr(rank / 4, listOfSemesters.length / 4)}
                        semesterIndex={[rank, rank + 1, rank + 2, rank + 3]}
                        acadYr={semester.academicYear}
                        plannerID={plannerID} />;
            }
          })}

          {/* Add New Academic Year Button at the bottom of the study plan */}
          <fieldset className="form-group"
                    style={{textAlign: 'center', margin: '2.5rem 0 2rem 0'}}>

            <Button buttonClass="btn btn-rounded btn-secondary-outline"
                    style={{position: "relative",
                            padding: "0.4em 0.5em 0.5em 0.6em",
                            height: "2.5em"}}
                    buttonText=""
                    buttonIcon={
                      <i className="glyphicon glyphicon-plus"
                         style={{fontSize: "1.5em", lineHeight: "1em"}}></i>}
                    onButtonClick={this.handleAddAYButtonClick.bind(this)} />

            <small className="text-muted" style={{fontSize: '0.75em'}}>
              Add New Academic Year
            </small>

          </fieldset>

        </div>
      </article>
    );
  }
}

AcadYrSection.propTypes = {
  plannerID: React.PropTypes.string,
  listOfSemesters: React.PropTypes.array,
}
