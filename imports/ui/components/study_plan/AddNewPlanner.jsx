import React from 'react';

// Import React Components
import Button from '../common/Button.jsx';
import StudyPlanTemplateButton from '../common/StudyPlanTemplateButton.jsx';

// Import logic methods
import { duplicatePlanner } from './../../../api/crud-controller/planner/methods.js';

export default class AddNewPlanner extends React.Component {

  /**
   * Event handler for selection of a blank study plan template. We will
   * let the attached handler in a parent component handle this event.
   */
  handleClickOnAddBlankTemplate() {
    this.props.handleAddBlankTemplate();
  }

  /**
   * Event handler for selection of study plan template
   *
   * @param {String} plannerName    Name of the planner to add
   */
  handlePlannerClick(plannerName) {
    if (this.props.defaultPlannerIDs) {
      let plannerIDToAdd = this.props.defaultPlannerIDs[plannerName];

      if (plannerIDToAdd) {
        duplicatePlanner(this.props.defaultPlannerIDs[plannerName]);
        this.props.handleAddedTemplate();
      }
    }
  }

  /**
   * Renders each of the focus area template buttons and puts them in a
   * composable grid for alignment
   *
   * @return {Node} React component containing a 3-col grid of all focus area
   *                template buttons
   */
  renderFocusAreaTemplateButtons() {
    if (this.props.defaultPlannerIDs) {
      return(
        <div className="gallery-grid">
          {Object.keys(this.props.defaultPlannerIDs).map((plannerName, index) => {
            if (plannerName !== this.props.genericCSPlannerName) {
              // Only render focus area study plan templates,
              // not the CS Foundation template
              return(
                <StudyPlanTemplateButton
                  key={index}
                  alignmentClass="col-md-4"
                  bgColor="#f99834"
                  icon={<i className="fa fa-file-text-o"></i>}
                  templateTitle={plannerName}
                  onClick={this.handlePlannerClick.bind(this, plannerName)} />
              );
            }
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="add-customers-screen tbl">
        <div className="add-customers-screen-in">
          {/* Title */}
          <h2><b>Create a new Study Plan</b></h2>
          <h4><b>Choose a template</b></h4>

          {/* Study Plan Template Buttons */}
          <p className="lead color-blue-grey-lighter">General Templates</p>
          <StudyPlanTemplateButton
            alignmentClass="col-md-6"
            bgColor="#0275d8"
            icon={<i className="fa fa-file-o"></i>}
            templateTitle={"Blank"}
            onClick={this.handleClickOnAddBlankTemplate.bind(this)} />

          <StudyPlanTemplateButton
            alignmentClass="col-md-6"
            bgColor="#0275d8"
            icon={<i className="fa fa-file-code-o"></i>}
            templateTitle={"CS Foundation"}
            onClick={
              this.handlePlannerClick.bind(
                this, this.props.genericCSPlannerName)}
          />

          <p className="lead color-blue-grey-lighter">Focus Area Templates</p>
          {this.renderFocusAreaTemplateButtons()}
        </div>
      </div>
    );
  }
}
