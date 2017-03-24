import React from 'react';
import IconButton from './IconButton.jsx';

export default class Module extends React.Component {
  constructor() {
    super();
    this.state = {
      onMouseOver: false
    }
  }

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
    return (
      <li className="dd-item"
          onMouseEnter={this.handleOnMouseEnter.bind(this)}
          onMouseLeave={this.handleOnMouseLeave.bind(this)}>
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
