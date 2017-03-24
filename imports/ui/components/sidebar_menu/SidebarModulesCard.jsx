import React from 'react';

// Import React components
import ModulesCard from '../common/ModulesCard.jsx';
import IconButton from '../common/IconButton.jsx';

// Import logic functions
import { addStudentExemptedModule } from '../../../api/database-controller/student/methods.js';
import { deleteStudentExemptedModule } from '../../../api/database-controller/student/methods.js';
import { addStudentWaivedModule } from '../../../api/database-controller/student/methods.js';
import { deleteStudentWaivedModule } from '../../../api/database-controller/student/methods.js';

/**
 * React Component that implements the container for a semester's worth of
 * modules - all list in columnal form with rows of Modules. Also has a
 * autosuggest box for searching for modules to be added to the user's study plan.
 */
export default class SidebarModulesCard extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Handles the event when a user selects a module code from the dropdown.
   * Even if the user presses Enter, an appropriate module code, the module
   * code sent by the server itself, will be added to the list of exempted or
   * waived modules.
   *
   * @param moduleObj {[Object]}    Module object containing valid fields
   */
  handleAddModule(moduleObj) {
    let moduleCode = moduleObj.moduleCode;
    let isExemptedList = this.props.listType == "Exempted";
    if(isExemptedList){
      addStudentExemptedModule(moduleCode);
    }
    else {
      addStudentWaivedModule(moduleCode);
    }
  }

  /**
   * Handles the event when a module is deleted
   *
   * @param moduleCode {[String]}  Module code to delete
   */
  handleDeleteModule(moduleCode) {
    var isExemptedList = this.props.listType == "Exempted";
    if(isExemptedList){
      deleteStudentExemptedModule(moduleCode);
    }
    else{
      deleteStudentWaivedModule(moduleCode);
    }
  }

  render() {
    return (
      <ModulesCard
        modules={this.props.modules}
        header={
          <div className="card-typical-section"
               data-tip data-for={this.props.listType}>

            <div className="card-typical-linked">
              {this.props.listType + " modules"}
            </div>

            <div>
              <IconButton style={{float: "right"}}
                          icon={"fa fa-info-circle"}
                          displayColor= {"#A0A0A0"}
                          onMouseOverColor= {"#505050"}
                          onButtonClick={this.props.handleInfoClick}/>
            </div>

            { this.props.tooltip }

          </div>
        }
        handleSelectModule={this.handleAddModule.bind(this)}
        handleDeleteModule={this.handleDeleteModule.bind(this)} />
    );
  }
}

SidebarModulesCard.propTypes = {
  listType: React.PropTypes.string,
  modules: React.PropTypes.object,
  tooltip: React.PropTypes.node,
  handleInfoClick: React.PropTypes.func,
}
