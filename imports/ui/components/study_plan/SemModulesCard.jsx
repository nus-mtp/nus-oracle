import React from 'react';

// Import React Components
import ModulesCard from './../common/ModulesCard.jsx';

// Import Logic Controller Methods
import { insertOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';
import { deleteOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';

/**
 * React Component that implements the container for a semester's worth of
 * modules. Contains the methods for handling those modules and renders a
 * common ModulesCard component to display all modules in a semester.
 */
export default class SemModulesCard extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Handles the event when a user selects a module code from the dropdown
   * and adds it to her study plan.
   * A module will be added when the user selects an option from the dropdown.
   *
   * @param moduleObj {[Object]}    Module object containing valid fields
   */
  handleSelectModule(moduleObj) {
    insertOneModuleInSemester(
      this.props.semesterIndex, moduleObj.moduleCode,  this.props.plannerID);
  }

  /**
   * Handles the event when a module is deleted
   *
   * @param moduleCode {[String]}  Module code to delete
   */
  handleDeleteModule(moduleCode) {
    deleteOneModuleInSemester(
      this.props.semesterIndex, moduleCode, this.props.plannerID);
  }

  render() {
    return (
      <ModulesCard
        sem={this.props.sem}
        modules={this.props.modules}
        cardStyle={{
          WebkitBoxShadow: '3px 3px 23px -6px rgba(0,0,0,0.35)',
          MozBoxShadow: '3px 3px 23px -6px rgba(0,0,0,0.35)',
          BoxShadow: '3px 3px 23px -6px rgba(0,0,0,0.35)'}}
        footer={
          <div className="card-typical-section"
               style={{padding: '0.5em 1em 0.5em 1em'}}>
            <div className="card-typical-linked">
              {this.props.sem}
            </div>
          </div>}
        handleSelectModule={this.handleSelectModule.bind(this)}
        handleDeleteModule={this.handleDeleteModule.bind(this)} />
    );
  }
}

SemModulesCard.propTypes = {
  // String representation of the semester
  sem: React.PropTypes.string,

  // List of module objects that will be rendered as a list of <Module/> components
  modules: React.PropTypes.object,
}
