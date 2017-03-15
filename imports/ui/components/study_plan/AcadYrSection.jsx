import React from 'react';
import AcadYrRow from './AcadYrRow.jsx';
import Button from '../common/Button.jsx';

import { insertNewAcademicYearInPlanner } from '../../../api/crud-controller/semester/methods.js';

export default class AcadYrSection extends React.Component {
  handleAddAYButtonClick() {
    insertNewAcademicYearInPlanner(this.props.plannerID);
  }

  render() {
    const plannerID = this.props.plannerID;
    const listOfSemesters = this.props.listOfSemesters;

    return (
      <article className="activity-line-item box-typical">
        <div className="activity-line-action-list">

          {listOfSemesters.map((semester, rank) => {
            // renders an  academic year which contains 2 semesters
            if (rank % 4 == 0)  {
              return <AcadYrRow key={rank} acadYrIndex={rank/2}
                                numOfAcadYrs={listOfSemesters.length/2}
                                semesterIndex={[rank, rank + 1, rank + 2, rank + 3]}
                                acadYr={semester.academicYear}
                                plannerID={plannerID} />;
            }
          })}

          <div style={{position: "relative", left: "50%", margin: "3em 0em 1em 0em"}}>
            <Button buttonClass="btn btn-rounded btn-secondary-outline"
                    style={{position: "relative",
                            padding: "0.4em 0.5em 0.5em 0.6em",
                            height: "2.5em"}}
                    buttonText=""
                    buttonIcon={
                      <i className="glyphicon glyphicon-plus"
                         style={{fontSize: "1.5em", lineHeight: "1em"}}></i>}
                    onButtonClick={this.handleAddAYButtonClick.bind(this)} />
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
