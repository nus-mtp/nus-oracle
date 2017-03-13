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
  handleClick() {
    this.props.onButtonClick();
  }

  /**
   * Handles button hovers on this button
   */
  handleMouseEnter() {
    this.props.onMouseEnter();
  }

  handleMouseLeave() {
    this.props.onMouseLeave();
  }

  render() {
    return (
      <button className={this.props.buttonClass} style={this.props.style}
              onClick={this.handleClick.bind(this)}
              onMouseEnter={this.handleMouseEnter.bind(this)}
              onMouseLeave={this.handleMouseLeave.bind(this)}>
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

  /* Custom button text */
  buttonText: React.PropTypes.string,

  /* Custom button icon JSX object */
  // Must be a JSX element, e.g. you can pass in something like
  // <i className="my-icon-class-name" style={{ color: red }}>My Icon!</i>
  buttonIcon: React.PropTypes.element,

  // Handler for button clicks
  onButtonClick: React.PropTypes.func
}
