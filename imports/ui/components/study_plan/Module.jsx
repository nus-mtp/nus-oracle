import React from 'react';
import ModuleButton from './ModuleButton.jsx'

export default class Module extends React.Component {
  constructor() {
    super();
    this.state = {
      onMouseOver: false
    }
  }

  handleOnMouseEnter(event) {
    this.setState({ onMouseOver: true });
  }

  handleOnMouseLeave(event) {
    this.setState({ onMouseOver: false });
  }

  handleButtonClick(buttonPressType) {
    console.log("Button Press type: " + buttonPressType);

    switch(buttonPressType) {
      case "DELETE":
        this.props.handleDeleteModule();
        break;
      default:
        console.log("NO VALID BUTTON PRESS TYPE DETECTED.")
    }
  }

  render() {
    return (
      <li className="dd-grey dd-item"
          onMouseEnter={this.handleOnMouseEnter.bind(this)}
          onMouseLeave={this.handleOnMouseLeave.bind(this)}>
        <div className="dd-handle" style={{cursor: 'pointer'}}>

          {/* Only want the delete button rendered on hover */}
          {this.state.onMouseOver ?
            <ModuleButton
              icon="font-icon font-icon-trash"
              displayColor="#505050"
              onMouseOverColor="#8b2a2a"
              buttonType="DELETE"
              onButtonClick={this.handleButtonClick.bind(this)}/> :
            null
          }
          {this.props.moduleCode}
        </div>
      </li>
    );
  }
}

Module.propTypes = {
  // Module code to be rendered
  moduleCode: React.PropTypes.string,

  // Handler for deleting modules
  handleDeleteModule: React.PropTypes.func
}
