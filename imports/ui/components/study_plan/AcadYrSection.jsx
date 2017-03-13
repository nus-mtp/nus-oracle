import React from 'react';
import AcadYrRow from './AcadYrRow.jsx';
import Button from '../common/Button.jsx';

import { insertNewAcademicYearInPlanner } from '../../../api/crud-controller/semester/methods.js';
import { deleteAcademicYearInPlanner } from '../../../api/crud-controller/semester/methods.js';

export default class AcadYrSection extends React.Component {
  handleAddAYButtonClick() {
    insertNewAcademicYearInPlanner(this.props.plannerID);
  }

  handleDelAYButtonClick() {
    deleteAcademicYearInPlanner(this.props.plannerID);
  }

  render() {
    const plannerID = this.props.plannerID;
    const listOfSemesters = this.props.listOfSemesters;

    return (
      <article className="activity-line-item box-typical">
        <div className="activity-line-action-list">

          {listOfSemesters.map((semester, rank) => {
            // renders only an academic year which contains 2 semesters
            if (rank % 4 == 0)  {
              return <AcadYrRow key={rank}
                                semesterIndex={[rank, rank + 1, rank + 2, rank + 3]}
                                acadYr={semester.academicYear}
                                plannerID={plannerID} />;
            }
          })}

          <div style={{position: "relative", left: "30%", marginTop: '5em'}}>
            <Button buttonClass="btn btn-inline btn-primary"
                    style={{position: "relative"}}
                    buttonText="Add new Acad Year"
                    buttonIcon={
                      <i className="glyphicon glyphicon-plus"
                         style={{marginTop: "0.15em", marginRight: "0.5em"}}></i>}
                    onButtonClick={this.handleAddAYButtonClick.bind(this)} />
            <Button buttonClass="btn btn-inline btn-danger-outline"
                    style={{position: "relative"}}
                    buttonText="Delete latest Acad Year"
                    buttonIcon={
                      <i className="font-icon font-icon-trash"
                         style={{marginTop: "0.15em", marginRight: "0.5em"}}></i>}
                    onButtonClick={this.handleDelAYButtonClick.bind(this)} />
          </div>

        </div>
      </article>
    );
  }
}

AcadYrSection.propTypes = {
  plannerID: React.PropTypes.string,
  listOfSemesters: React.PropTypes.array,
}
