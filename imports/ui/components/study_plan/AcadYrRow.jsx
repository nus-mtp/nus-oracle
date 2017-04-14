import React from 'react';
import Button from '../common/Button.jsx';
import SemModulesCardContainer from './SemModulesCardContainer.js';
import TranslucentOverlay from './../common/TranslucentOverlay.jsx';

import { deleteAcademicYearInPlanner } from '../../../api/student-logic-controller/crud-controller/semester/methods.js';

export default class AcadYrRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteAcadYr: false
    }
  }

  //======================================================
  // EVENT HANDLERS
  //======================================================
  handleDelAYButtonClick() {
    this.setState({ isDeleteAcadYr: true });
  }

  handleConfirmDeleteAcadYr() {
    deleteAcademicYearInPlanner(this.props.plannerID);
    this.setState({ isDeleteAcadYr: false });
  }

  resetDeleteAcadYrState() {
    this.setState({ isDeleteAcadYr: false });
  }

  //===================================================================
  // RENDER FUNCTIONS FOR DISTINCT UI PARTS WITHIN THE ACADYRROW
  //===================================================================
  /**
   * Renders the confirmation overlay when user clicks to delete
   * an academic year's worth of modules.
   *
   * @return {Node} React component for delete confirmation overlay
   */
  renderDeleteAcadYrConfirmation() {
    return (
      <TranslucentOverlay>
        <div className="box-typical box-typical-padding"
             style={{margin: '30px',
                     color: '#ffffff',
                     backgroundColor: 'transparent',
                     border: 'transparent',
                     textAlign: 'center'}}>
          <h5 className="m-t-lg">
            <strong>Are you sure you want to delete all modules in this academic year?</strong>
          </h5>
          <div>
            <Button buttonClass={"btn btn-rounded btn-inline btn-warning-outline"}
              buttonText="Yes"
              onButtonClick={this.handleConfirmDeleteAcadYr.bind(this)} />
            <Button buttonClass={"btn btn-rounded btn-inline btn-secondary-outline"}
              buttonText="No"
              onButtonClick={this.resetDeleteAcadYrState.bind(this)} />
          </div>
        </div>
      </TranslucentOverlay>
    );
  }

  render() {
    return (
      <section className="activity-line-action">
        {/* Confirmation overlay when user clicks on delete acad year */}
        {this.state.isDeleteAcadYr ? this.renderDeleteAcadYrConfirmation() : null}

        {/* Left hand section with acad year and additional buttons */}
        <div className="time">
          {/* Academic Year Label */}
          <strong>{this.props.acadYr}</strong>

          {/* Left hand section's Delete All button */}
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
          /> :
          null}
        </div>

        {/* Cards layout to hold all of this acad year's modules */}
        <div className="cont">
          <div className="cont-in">

            {/* Normal Semesters */}
            <div className="col-md-4">
              <SemModulesCardContainer
                sem="Sem I"
                semesterIndex={this.props.semesterIndex[0]}
                plannerID={this.props.plannerID} />
            </div>
            <div className="col-md-4">
              <SemModulesCardContainer
                sem="Sem II"
                semesterIndex={this.props.semesterIndex[1]}
                plannerID={this.props.plannerID} />
            </div>

            {/* Special Semesters */}
            <div className="col-md-4">
              <SemModulesCardContainer
                sem="Special Sem I"
                semesterIndex={this.props.semesterIndex[2]}
                plannerID={this.props.plannerID} />
              <SemModulesCardContainer
                sem="Special Sem II"
                semesterIndex={this.props.semesterIndex[3]}
                plannerID={this.props.plannerID} />
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
   *  Normal sems are at positions 1 and 2, special sems are at
   *  positions 3 and 4.
   *
   *  NOTE: The next academic year's semester indices are
   *        CONTINUED LIKE THIS:
   *        Normal sems are at positions 5 and 6, special sems
   *        are at positions 7 and 8, and so on...
   */
  semesterIndex: React.PropTypes.array,

  // Academic Year represented by this row
  acadYr: React.PropTypes.string,

  // Planner ID containing this academic year
  plannerID: React.PropTypes.string
}
