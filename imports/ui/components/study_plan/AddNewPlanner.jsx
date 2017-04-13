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
  handleAddBlankTemplateClick() {
    this.props.handleAddBlankTemplate();
  }

  /**
   * Event handler for adding a generic CS template
   */
  handleAddCSGenericTemplateClick() {
    if (this.props.genericCSPlannerID) {
      duplicatePlanner(this.props.genericCSPlannerID);
      this.props.handleAddedTemplate();
    }
  }

  /**
   * Event handler for selection of a focus area study plan template
   *
   * @param {String} plannerName    Name of the planner to add
   */
  handleAddFocusAreaTemplate(plannerName) {
    if (this.props.focusAreaPlannerObjs) {
      let plannerIDToAdd = this.props.focusAreaPlannerObjs[plannerName];

      if (plannerIDToAdd) {
        duplicatePlanner(plannerIDToAdd);
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
    return(
      <div className="gallery-grid">
        {Object.keys(this.props.focusAreaPlannerObjs).map((plannerName, index) => {
          // Only render focus area study plan templates,
          // not the CS Foundation template
          return(
            <StudyPlanTemplateButton
              key={index}
              alignmentClass="col-md-4"
              bgColor="#f99834"
              icon={<i className="fa fa-file-text-o"></i>}
              templateTitle={plannerName}
              onClick={this.handleAddFocusAreaTemplate.bind(this, plannerName)} />
          );
        })}
      </div>
    );
  }

  getAlignmentClass() {
    // If there are no generic CS planners, the Add Blank Study Plan Template
    // button will be centralized
    if (this.props.genericCSPlannerName) {
      return "col-md-6";
    } else {
      return "col-md-6 col-md-offset-3";
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
          <div className="row">
            <p className="lead color-blue-grey-lighter">
              General Templates
            </p>

            {/* Add Blank Study Plan Button */}
            <StudyPlanTemplateButton
              alignmentClass={this.getAlignmentClass()}
              bgColor="#0275d8"
              icon={<i className="fa fa-file-o"></i>}
              templateTitle={"Start from scratch!"}
              onClick={this.handleAddBlankTemplateClick.bind(this)} />

            {/* Add CS Generic Study Plan Template Button */}
            {this.props.genericCSPlannerName ?
              <StudyPlanTemplateButton
                alignmentClass="col-md-6"
                bgColor="#0275d8"
                icon={<i className="fa fa-file-code-o"></i>}
                templateTitle={"CS Foundation"}
                onClick={this.handleAddCSGenericTemplateClick.bind(this)} /> :
              null
            }
          </div>

          {/* Focus Area Study Plan Template Buttons */}
          <div className="row">
            {this.props.focusAreaPlannerObjs ?
              <div>
                <p className="lead color-blue-grey-lighter">Focus Area Templates</p>
                {this.renderFocusAreaTemplateButtons()}
              </div> :
              null
            }
          </div>
        </div>
      </div>
    );
  }
}

AddNewPlanner.propTypes = {
  // Generic CS Planner refers to a study plan that only contains CS foundation
  // modules. So a typical planner name would be "CS Foundation"
  genericCSPlannerName: React.PropTypes.string,

  // ID of the Generic CS Planner
  genericCSPlannerID: React.PropTypes.string,

  // JSON Object representation of a mapping of
  // {
  //   name_of_focus_area_planner1 : ID_of_focus_area_planner_1,
  //   name_of_focus_area_planner2 : ID_of_focus_area_planner_2
  //   ...
  // }
  //
  // e.g.
  // {
  //   "programming_languages" : "JaiWE123jJiawe1212",
  //   ...
  // }
  //
  focusAreaPlannerObjs: React.PropTypes.object
}
