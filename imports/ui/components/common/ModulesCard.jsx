import React from 'react';

// Import React Components
import Module from './../common/Module.jsx';
import SearchBar from './../common/SearchBar.jsx';

/**
 * React Component that implements the container for a list of <Module />s.
 * Headers and Footers can be set if you need them.
 * This component also contains a search bar for fast-searching for modules.
 */
export default class ModulesCard extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Handles the event when a user selects a module from the dropdown
   * and adds it to her study plan.
   *
   * @param selectedModule {[Object]}    Module object from dropdown selection
   */
  handleSelectModule(selectedModuleObj) {
    if (selectedModuleObj) {
      this.props.handleSelectModule(selectedModuleObj);
    }
  }

  /**
   * Handles the event when a module is deleted
   *
   * @param moduleCode {[String]}  Module code to delete
   */
  handleDeleteModule(moduleCode) {
    if (moduleCode) {
      this.props.handleDeleteModule(moduleCode);
    }
  }

  render() {
    return (
      <div className="card-grid-col">
				<article className="card-typical" style={this.props.cardStyle}>

          {/* Header of this ModulesCard that can contain additional text */}
          {this.props.header}

          {/* Main Content of this ModulesCard */}
					<div className="card-typical-section card-typical-content"
               style={{padding: '0.75em'}}>

           {/* Renders all modules from a given list of modules */}
            <div style={{paddingBottom: '0.75em'}}>
              {Object.keys(this.props.modules).map((moduleCode, index) => {
                return <Module
                         key={index}
                         moduleCode={moduleCode}
                         handleDeleteModule={
                           this.handleDeleteModule.bind(this, moduleCode)
                         } />;
              })}
            </div>

            {/* Search bar to retrieve thousands of records */}
            <SearchBar
              placeholder="Add a module..."
              noResultsText="No modules found"
              menuBuffer={50}
              handleSelectOption={this.handleSelectModule.bind(this)}/>

          </div>

          {/* Footer of this ModulesCard that can contain additional text */}
          {this.props.footer}

				</article>
			</div>
    );
  }
}

ModulesCard.propTypes = {
  // String representation of the semester
  sem: React.PropTypes.string,

  // List of module objects that will be rendered as a list of <Module/> components
  modules: React.PropTypes.object,

  // Style object for this modules card
  cardStyle: React.PropTypes.object,

  // Pass in a valid React node to display a header at the top
  header: React.PropTypes.node,

  // Pass in a valid React node to display a footer at the bottom
  footer: React.PropTypes.node,

  // Handler for when a user clicks on a module from the search dropdown
  handleSelectModule: React.PropTypes.func,

  // Handler for when a user clicks on delete button on a <Module/>
  handleDeleteModule: React.PropTypes.func,
}

ModulesCard.defaultProps = {
  sem: "",
  modules: [{}],
  cardStyle: {},
  header: null,
  footer: null,
}
