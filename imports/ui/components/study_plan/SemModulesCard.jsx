import React from 'react';

// Import React Components
import Module from './Module.jsx';
import SearchBar from './../common/SearchBar.jsx';

// Import Logic Controller Methods
import { insertOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';
import { deleteOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';

/**
 * React Component that implements the container for a semester's worth of
 * modules - all lists are in columnal form with rows of Modules.
 *
 * Also contains a search bar for fast-searching modules to be added to the
 * user's study plan.
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
   * @param {[Object]}    Module object containing valid fields
   */
  handleSelectModuleCode(moduleObj) {
    if (moduleObj) {
      insertOneModuleInSemester(
        this.props.semesterIndex, moduleObj.moduleCode,  this.props.plannerID);
    }
  }

  /**
   * Handles the event when a module is deleted
   */
  handleDeleteModule(moduleCode) {
    deleteOneModuleInSemester(this.props.semesterIndex, moduleCode, this.props.plannerID);
  }

  render() {
    const modules = this.props.modules;

    return (
      <div className="card-grid-col">
				<article className="card-typical"
                 style={{
                   WebkitBoxShadow: '3px 3px 23px -6px rgba(0,0,0,0.35)',
                   MozBoxShadow: '3px 3px 23px -6px rgba(0,0,0,0.35)',
                   BoxShadow: '3px 3px 23px -6px rgba(0,0,0,0.35)'}}>
					<div className="card-typical-section card-typical-content"
               style={{padding: '0.75em'}}>
            <div style={{paddingBottom: '0.75em'}}>

              {/* Renders all modules from the user's study plan */}
              {Object.keys(modules).map((moduleCode, index) => {
                return <Module key={index}
                               moduleCode={moduleCode}
                               handleDeleteModule={
                                 this.handleDeleteModule.bind(this, moduleCode)} />;
              })}

            </div>

            {/* Search bar to retrieve thousands of records */}
            <SearchBar
              placeholder="Add a module..."
              noResultsText="No modules found"
              menuBuffer={50}
              handleSelectOption={this.handleSelectModuleCode.bind(this)}/>

          </div>

					<div className="card-typical-section"
               style={{padding: '0.5em 1em 0.5em 1em'}}>
						<div className="card-typical-linked">
              {this.props.sem}
            </div>
					</div>

				</article>
			</div>
    );
  }
}

SemModulesCard.propTypes = {
  sem: React.PropTypes.string,
  modules: React.PropTypes.object
}
