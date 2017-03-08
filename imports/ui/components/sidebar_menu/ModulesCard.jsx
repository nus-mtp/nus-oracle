import _ from 'underscore';
import React from 'react';
import Module from '../study_plan/Module.jsx';
import VirtualizedSelect from 'react-virtualized-select';

import { addStudentExemptedModule } from '../../../api/database-controller/student/methods.js';
import { deleteStudentExemptedModule } from '../../../api/database-controller/student/methods.js';
import { addStudentWaivedModule } from '../../../api/database-controller/student/methods.js';
import { deleteStudentWaivedModule } from '../../../api/database-controller/student/methods.js';
import { sendQuery } from '../../../api/searcher-controller/controller.js'

/**
 * React Component that implements the container for a semester's worth of
 * modules - all list in columnal form with rows of Modules. Also has a
 * autosuggest box for searching for modules to be added to the user's study plan.
 */

export default class ModulesCard extends React.Component {

  /**
   * Handles the event when a module is added
   **/
  handleAddModule(moduleCode) {
    var isExemptedList = this.props.listType == "Exempted";
    if(isExemptedList){
      addStudentExemptedModule(moduleCode, function() {console.log("add exempted module")});
      // console.log("add exempted module");
    }
    else {
      addStudentWaivedModule(moduleCode);
      console.log("add waived module");
    }
  }

  /**
   * Handles the event when a module is deleted
   */
  handleDeleteModule(moduleCode) {
    var isExemptedList = this.props.listType == "Exempted";
    if(isExemptedList){
      deleteStudentExemptedModule(moduleCode);
      console.log("delete exempted module");
    }
    else{
      deleteStudentWaivedModule(moduleCode);
      console.log("delete waived module");
    }
  }

  /**
   * Handles the event when a user selects a module code from the dropdown.
   * Even if the user presses Enter, an appropriate module code, the module
   * code sent by the server itself, will be added to the study plan.
   *
   * @param input {[String]}    User's input. Updates as the user types.
   * @param callback {[func]}    Callback to invoke once async call is done.
   */
  getModulesListFromDB(input, callback) {
    input = input.trim().toLowerCase();

    let fetchedListOfModulesFromDB = [];
    if (input.length !== 0) { // Only fetch if user typed in something
      // Get suggestions from modules DB which best matches input
      fetchedListOfModulesFromDB = sendQuery(input);
    }

    // Callback for an async call. This tells us we're done with the call,
    // and ready to pass VirtualizedSelect the search options to render
    callback(null, {
      options: fetchedListOfModulesFromDB,
      complete: true
    });
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

  render() {
    const modules = this.props.modules;

    return (
      <div className="" style={{padding: 1+"em"}}>
  			<article className="card-typical">
          <div className="card-typical-section">
            <div className="card-typical-linked">
              {this.props.listType + " modules"}
            </div>
          </div>
  				<div className="card-typical-section card-typical-content">
            {/* Renders all modules from the user's study plan */}
            {Object.keys(modules).map((moduleCode, index) => {
              return <Module key={index} moduleCode={moduleCode}
                             handleDeleteModule={
                               this.handleDeleteModule.bind(this, moduleCode)}/>;
            })}
            <VirtualizedSelect searchable async clearable={false}
              labelKey="moduleCode" placeholder="Add a module..."
              loadOptions={this.getModulesListFromDB.bind(this)}
              onChange={this.handleSelectModuleCode.bind(this)} />
          </div>
  			</article>
      </div>
    );
  }
}

ModulesCard.propTypes = {
  listType: React.PropTypes.string,
  modules: React.PropTypes.object
}
