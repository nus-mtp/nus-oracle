import _ from 'underscore';
import React from 'react';
import Module from '../study_plan/Module.jsx';
import ModuleSearchBar from '../study_plan/ModuleSearchBar.jsx';

import { addStudentExemptedModule } from '../../../api/database-controller/student/methods.js';
import { deleteStudentExemptedModule } from '../../../api/database-controller/student/methods.js';
import { addStudentWaivedModule } from '../../../api/database-controller/student/methods.js';
import { deleteStudentWaivedModule } from '../../../api/database-controller/student/methods.js';
import { getStudentID } from '../../../api/database-controller/student/methods.js';

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
            <ModuleSearchBar handleAddModule={this.handleAddModule.bind(this)} />
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
