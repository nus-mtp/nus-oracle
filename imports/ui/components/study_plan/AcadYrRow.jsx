import React from 'react';
import Button from '../common/Button.jsx';
import SemModulesCardContainer from './SemModulesCardContainer.js';

import { deleteAcademicYearInPlanner } from '../../../api/crud-controller/semester/methods.js';

export default class AcadYrRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    }
  }

  handleDelAYButtonClick() {
    deleteAcademicYearInPlanner(this.props.plannerID);
  }

  handleMouseEnterDel() {
    this.setState({ isHover: true });
  }

  handleMouseLeaveDel() {
    this.setState({ isHover: false });
  }

  getAcadYrHoverColor() {
    if (this.state.isHover) {
      return 'rgba(254, 64, 64, 0.17)'
    } else {
      return '#ffffff';
    }
  }

  render() {
    return (
      <section className="activity-line-action">
        <div className="time">

          {this.props.acadYr}

          {this.props.isLastAcadYr ?
          <Button buttonClass="btn btn-inline btn-danger-outline"
                  style={{position: "relative",
                          fontSize: "0.75em",
                          padding: "0.2em 0.75em 0.2em 0.65em",
                          margin: " 1em 0em 1em 0em"}}
                  buttonText="Delete"
                  buttonIcon={
                    <i className="font-icon font-icon-trash"
                       style={{marginTop: "0.15em", marginRight: "0.5em"}}></i>}
                  onButtonClick={this.handleDelAYButtonClick.bind(this)}
                  onMouseEnter={this.handleMouseEnterDel.bind(this)}
                  onMouseLeave={this.handleMouseLeaveDel.bind(this)} /> :
          null}

        </div>
        <div className="cont">
          <div className="cont-in">
            <div className="col-md-4">
              <SemModulesCardContainer sem="Sem I" semesterIndex={this.props.semesterIndex[0]} plannerID={this.props.plannerID} />
            </div>
            <div className="col-md-4">
              <SemModulesCardContainer sem="Sem II" semesterIndex={this.props.semesterIndex[1]} plannerID={this.props.plannerID} />
            </div>
            <div className="col-md-4">
              <SemModulesCardContainer sem="Special Sem I" semesterIndex={this.props.semesterIndex[2]} plannerID={this.props.plannerID}/>
              <SemModulesCardContainer sem="Special Sem II" semesterIndex={this.props.semesterIndex[3]} plannerID={this.props.plannerID}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AcadYrRow.propTypes = {
  /**
   *  Array of the indices of all the semesters in this academic year.
   *  Namely, we have 2 normal sems and 2 special sems.
   *  Normal sems are at positions 1 and 2, special sems are at positions 3 and 4.
   *
   *  NOTE: The next academic year's semester indices are CONTINUED LIKE THIS:
   *  Normal sems are at positions 5 and 6, special sems are at positions 7 and 8.
   */
  semesterIndex: React.PropTypes.array,

  // Academic Year represented by this row
  acadYr: React.PropTypes.string,

  // Planner ID containing this academic year
  plannerID: React.PropTypes.string
}
