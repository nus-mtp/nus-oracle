import React from 'react';
import { Session } from 'meteor/session';

// Import React Components
import Module from './Module.jsx';
import VirtualizedSelect from 'react-virtualized-select';

// Import constants for char limits and line height limits for search options
import { SMALL_LINE_CHAR_LIMIT } from '../common/Constants.js';
import { MEDIUM_LINE_CHAR_LIMIT } from '../common/Constants.js';
import { SMALL_LINE_HEIGHT } from '../common/Constants.js';
import { MEDIUM_LINE_HEIGHT } from '../common/Constants.js';
import { LARGE_LINE_HEIGHT } from '../common/Constants.js';

// Import Logic Controller Methods
import { insertOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';
import { deleteOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';
import { sendQuery } from '../../../api/searcher-controller/controller.js'
import { getAllModules } from '../../../api/searcher-controller/controller.js'

// Import fixtures acting as a local database for all modules
import { getModuleFixtures } from './fixtures/module_fixtures.js';

// Import Session variable name constant that contains the cached modules
import { ALL_MODULES_FOR_SEARCH } from '../../pages/DashboardContainer.jsx'
import { ALL_MODULES_FOR_SEARCH_FILTER_OPTIONS } from '../../pages/DashboardContainer.jsx'

// TODO :TESTING
import createFilterOptions from 'react-select-fast-filter-options';

const STRINGS = ['programming methodology',
				 'topics in urban studies shaping liveable places',
				 'advanced independent study in accounting and physics and mathematics',
				 'managing the environment in a productive way to reduce pollution']

// const NUM_OPTIONS = 1e4
// const options = Array
//   .from(Array(NUM_OPTIONS))
//   .map((_, index) => ({
//     label: `${index}: ${STRINGS[Math.floor(Math.random() * STRINGS.length)]}`,
//     value: index
//   }))
//
// const filterOptions = createFilterOptions({ options })

/**
 * React Component that implements the container for a semester's worth of
 * modules - all lists are in columnal form with rows of Modules.
 *
 * Also contains a search bar for fast-searching modules to be added to the
 * user's study plan.
 */
export default class SemModulesCard extends React.Component {
  constructor() {
    super();
  }

  /**
   * Handles the event when a module is added
   **/
  handleAddModule(moduleCode) {
    insertOneModuleInSemester(this.props.semesterIndex, moduleCode,  this.props.plannerID);
  }

  /**
   * Handles the event when a module is deleted
   */
  handleDeleteModule(moduleCode) {
    deleteOneModuleInSemester(this.props.semesterIndex, moduleCode, this.props.plannerID);
  }

  /**
   * Handles the event when a user selects a module code from the dropdown.
   * Even if the user presses Enter, an appropriate module code, the module
   * code sent by the server itself, will be added to the study plan.
   *
   * @param {[Object]}    Module object containing valid fields
   */
  handleSelectModuleCode(moduleObj) {
    if (moduleObj) {
      this.handleAddModule(moduleObj.moduleCode);
    }
  }

  /**
   * Calculates the height of each option in the search bar based on the
   * number of characters in the module code and name.
   *
   * This is a workaround for the issue faced in the react-select library
   * where the height of each dropdown option isn't dynamic and must be set
   * prior to rendering the search bar.
   *
   * Note: The constants used here are very conservative to cater to smaller
   *       screens.
   *
   * @param {[Object]}    Module object containing valid fields
   */
  computeLineHeight(option) {
    let module = option.option;
    let moduleCodeAndName = module.moduleCode + " " + module.moduleName;

    if (moduleCodeAndName) { // Defensive check if it is defined
      let moduleCodeAndNameLen = moduleCodeAndName.length;

      if (moduleCodeAndNameLen <= SMALL_LINE_CHAR_LIMIT) {
        return SMALL_LINE_HEIGHT;
      } else if (moduleCodeAndNameLen <= MEDIUM_LINE_CHAR_LIMIT) {
        return MEDIUM_LINE_HEIGHT;
      } else {
        return LARGE_LINE_HEIGHT;
      }
    }
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
                return <Module key={index} moduleCode={moduleCode}
                               handleDeleteModule={
                                 this.handleDeleteModule.bind(this, moduleCode)} />;
              })}

            </div>

            {/* Search bar to retrieve thousands of records */}
            <VirtualizedSelect
              placeholder="Add a module..." noResultsText="No modules found"
              openOnFocus={true} tabSelectsValue={false}
              options={this.props.modulesForSearch}
              filterOptions={this.props.filterOptsForSearch}
              menuBuffer={50}
              optionHeight={this.computeLineHeight}
              onChange={this.handleSelectModuleCode.bind(this)} />

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
