import React from 'react';

const DELETE_BUTTON_PRESS_TYPE = "DELETE"

export default class ModuleButton extends React.Component {
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

  /**
   * Handles button clicks of the varying {buttonType} types.
   *
   * Depending on the button type, buttonType will be passed into the
   * button click handler to the parent component so that the correct
   * button type may be detected.
   */
  handleClick() {
    this.props.onButtonClick(this.props.buttonType);
  }

  render() {
    let iconColor = this.state.onMouseOver ?
                    this.props.onMouseOverColor : this.props.displayColor;

    return (
      <i className={this.props.icon}
         style={{color: iconColor, float:'right', paddingTop: '0.15em'}}
         onClick={this.handleClick.bind(this)}
         onMouseEnter={this.handleOnMouseEnter.bind(this)}
         onMouseLeave={this.handleOnMouseLeave.bind(this)}>
      </i>
    );
  }
}

ModuleButton.propTypes = {
  // Custom button styles
  // String representation of the icon CSS class
  icon: React.PropTypes.string,

  // String representation of the icon color style
  displayColor: React.PropTypes.string,

  // String representation of the icon color style when hovered
  onMouseOverColor: React.PropTypes.string,

  // Button type
  // Accepted Button types: "DELETE"
  buttonType: React.PropTypes.string,

  // Handler for button clicks
  onButtonClick: React.PropTypes.func
}
