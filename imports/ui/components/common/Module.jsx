import React from 'react';

// Import React components
import ModuleInfoTooltip from './ModuleInfoTooltip.jsx';
import IconButton from './IconButton.jsx';

export default class Module extends React.Component {
  constructor() {
    super();
    this.state = {
      onMouseOver: false
    }
  }

  //===========================================================
  // EVENT HANDLERS
  //===========================================================
  /**
   * Handlers for mouse hover events over this Module component
   */
  handleOnMouseEnter(event) {
    this.setState({ onMouseOver: true });
  }

  handleOnMouseLeave(event) {
    this.setState({ onMouseOver: false });
  }

  /**
   * Handles button clicks on the delete icon button
   */
  handleDeleteClick() {
    this.props.handleDeleteModule();
  }

  render() {
    let module = this.props.module;

    return (
      <li className="dd-item" data-tip data-for={module.moduleCode}
          onMouseOver={this.handleOnMouseEnter.bind(this)}
          onMouseLeave={this.handleOnMouseLeave.bind(this)}>

        {/* Tooltip that shows module information on hover */}
        <ModuleInfoTooltip module={module} />

        <div className="dd-handle"
             style={{backgroundColor: '#fbcb83', cursor: 'pointer', border: '0'}}>

          {/* Only want the delete button rendered on hover */}
          {this.state.onMouseOver ?
            <IconButton
              icon="font-icon font-icon-trash"
              style={{float:'right', paddingTop: '0.15em'}}
              displayColor="#505050" onMouseOverColor="#b11919"
              onButtonClick={this.handleDeleteClick.bind(this)} /> :
            null
          }

          {/* Module Code which identifies this Module */}
          {module.moduleCode}

        </div>
      </li>
    );
  }
}

Module.propTypes = {
  // Module to be rendered
  module: React.PropTypes.object,

  // Handler for deleting modules
  handleDeleteModule: React.PropTypes.func
}
