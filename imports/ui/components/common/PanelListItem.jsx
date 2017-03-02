import React from 'react'
import IconButton from './IconButton.jsx'

export default class PanelListItem extends React.Component{
  constructor(){
    super();
    this.state = {
      isEditing: false
    }

  }

  /**
   * Handler for when user is entering a new study plan's name
   *
   * @param {[Object]} event    Event object of this HTML object
   */
  // handleEnterFieldText(event) {
  //   if (isDefinedObj(event)) {
  //     let userInputStudyPlanName = event.target.value;
  //
  //     if (event.charCode == ENTER_CHAR_KEY_CODE) { // If pressed ENTER
  //       if (this.state.isEditing) {
  //         this.setState({ isEditing: false });
  //         createPlanner(userInputStudyPlanName, focusArea);
  //       }
  //     }
  //   }
  // }

  /**
   * Handler for when user clicks outside of the input field when
   * editing a user data field
   *
   * @param {[Object]} event    Event object of this HTML object
   */
  // handleCancelEditField(event) {
  //   this.setState({ isEditing: false });
  //
  //   // If the user already entered a name, add study plan for convenience
  //   if (isDefinedObj(event)) {
  //     let userInputStudyPlanName = event.target.value;
  //     if (userInputStudyPlanName) {
  //       createPlanner(userInputStudyPlanName, focusArea);
  //     }
  //   }
  // }

  /**
   * Handler for add study plan button on the right hand side of all tabs
   */
  // handleEditFieldClick() {
  //   this.setState({ isEditing : true });
  // }

  /**
   *  returns text field for editing panel list item
   */
  // editField(){
  //   return(
  //   <input autoFocus type="text" className="form-control"
  //          style={{height: "1.5em"}}
  //          onKeyPress={this.handleEnterFieldText.bind(this)}
  //          onBlur={this.handleCancelEditField.bind(this)} />
  //   );
  // }

/**
 *  returns non editable panel list item
 */
  // viewField(){
  //   return(
  //       <span className="tbl-cell tbl-cell-caption">{this.props.text}</span>
  //   );
  // }

  render(){
    return(
        <li className={this.props.type}>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">
                {this.props.text}
                {this.props.editable}
              </span>
            </span>
          </a>
        </li>
    );
  }
}

PanelListItem.propTypes ={
}
