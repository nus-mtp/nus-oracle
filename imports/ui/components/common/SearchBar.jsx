import React from 'react'

// Import React Search Component libraries
// Special thanks to JedWatson from https://github.com/JedWatson/react-select
// and bvaughn from https://github.com/bvaughn/react-virtualized-select and
// https://github.com/bvaughn/react-select-fast-filter-options
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

// Import logic methods
import { getAllModules } from '../../../api/searcher-controller/controller.js';

// Import constants for char limits and line height limits for search options
import { SMALL_LINE_CHAR_LIMIT } from '../common/Constants.js';
import { MEDIUM_LINE_CHAR_LIMIT } from '../common/Constants.js';
import { SMALL_LINE_HEIGHT } from '../common/Constants.js';
import { MEDIUM_LINE_HEIGHT } from '../common/Constants.js';
import { LARGE_LINE_HEIGHT } from '../common/Constants.js';

/**
 * Prepare the module database that is saved serverside for ALL
 * SemModulesCard components so that you do not need to reactively
 * load the database again. (Done for clientside performance improvement).
 */
const allModules = getAllModules();
const filterOptions = createFilterOptions({ options: allModules });

/**
 * React Component that implements common features needed for the Search Bar.
 *
 * This component heavily relies on the 'react-virtualized-select' and
 * 'react-select-fast-filter-options' libraries that implement the UI and
 * filter properties of the search bar.
 *
 * Since this component is widely used throughout the application, this
 * wrapper class will help standardize all Search Bar UI elements.
 */
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Handles the event when a user selects an option  from the dropdown.
   * Even if the user presses Enter, an option listed in the dropdown will
   * be added to the study plan. So, in a way, you can guarantee that a valid
   * option from the list of options will be selected.
   *
   * @param {[Object]}    Object representing the chosen dropdown selection
   */
  handleSelectOption(optionObj) {
    this.props.handleSelectOption(optionObj);
  }

  /**
   * Calculates the height of each option in the search bar based on the
   * number of characters in the option's label field.
   *
   * This is a workaround for the issue faced in the react-select library
   * where the height of each dropdown option isn't dynamic and must be set
   * prior to rendering the search bar.
   *
   * Note: The constants used here are very conservative to cater to smaller screens.
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
    return (
      <VirtualizedSelect
        openOnFocus={true} tabSelectsValue={false}
        placeholder={this.props.placeholder}
        noResultsText={this.props.noResultsText}
        menuBuffer={this.props.menuBufferFromViewport}
        optionHeight={this.computeLineHeight}
        options={allModules}
        filterOptions={filterOptions}
        onChange={this.handleSelectOption.bind(this)} />
    )
  }
}

SearchBar.propTypes = {
  // Static placeholder text for search bar to prompt users to type something in
  placeholder: React.PropTypes.string,

  // Static placeholder text for search bar when no search results can be found
  noResultsText: React.PropTypes.string,

  // Integer that measures the number of pixels of the end of the dropdown box
  // from the bottom of the viewport
  menuBuffer: React.PropTypes.number,

  // onChange handler that will be invoked when the user selects an option
  // from the dropdown
  onChange: React.PropTypes.func,
}
