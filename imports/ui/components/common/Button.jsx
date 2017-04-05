import React from 'react';

/**
 * Generic button React component.
 * Check out the PropTypes below to see how to set your own styles
 */
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    }
  }

  /**
   * Handles button clicks on this button
   */
  handleClick(event) {
    this.props.onButtonClick(event);
  }

  render() {
    return (
      <button className={this.props.buttonClass} style={this.props.style}
              type={this.props.type}
              onClick={this.handleClick.bind(this)}>
        {this.props.buttonIcon}
        {this.props.buttonText}
      </button>
    );
  }
}

Button.propTypes = {
  /* Custom button icon */
  // String representation of the CSS class of the button
  // Recommended to use StartUI btn classes
  buttonClass: React.PropTypes.string,

  /* Custom button CSS */
  // Object representation of CSS, e.g. you can pass in something like
  // { float:'right', paddingTop: '0.15em' } as a style
  style: React.PropTypes.object,

  /* Type of button */
  // Standard HTML type, e.g. "submit", "button"
  type: React.PropTypes.string,

  /* Custom button text */
  buttonText: React.PropTypes.string,

  /* Custom button icon JSX object */
  // Must be a JSX element, e.g. you can pass in something like
  // <i className="my-icon-class-name" style={{ color: red }}>My Icon!</i>
  buttonIcon: React.PropTypes.node,

  /* Event listener for button clicks */
  onButtonClick: React.PropTypes.func,
}
