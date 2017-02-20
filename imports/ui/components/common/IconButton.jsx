import React from 'react';

/**
 * Generic icon button React component.
 * Check out the PropTypes below to see how to set your own styles
 */
export default class IconButton extends React.Component {
  constructor() {
    super();
    this.state = {
      onMouseOver: false
    }
  }

  handleOnMouseEnter(event) {
    this.setState({
      onMouseOver: true,
      mouseHoverColor: this.props.onMouseOverColor
     });
  }

  handleOnMouseLeave(event) {
    this.setState({
      onMouseOver: false,
      mouseHoverColor: this.props.displayColor
    });
  }

  /**
   * Handles button clicks on this button
   */
  handleClick() {
    this.props.onButtonClick();
  }

  render() {
    // Toggles mouseover colors
    let iconColor = this.state.mouseHoverColor;
    let style = this.props.style;
    style.color = iconColor; // Set this button icon's color
    return (
      <i className={this.props.icon}
         style={style}
         onClick={this.handleClick.bind(this)}
         onMouseEnter={this.handleOnMouseEnter.bind(this)}
         onMouseLeave={this.handleOnMouseLeave.bind(this)}>
      </i>
    );
  }
}

IconButton.propTypes = {
  /* Custom button CSS */
  // Object representation of CSS, e.g. you can pass in something like
  // { float:'right', paddingTop: '0.15em' } as a style
  style: React.PropTypes.object,

  /* Custom button icon */
  // String representation of the icon CSS class
  icon: React.PropTypes.string,

  // String representation of the icon color style
  displayColor: React.PropTypes.string,

  // String representation of the icon color style when hovered
  onMouseOverColor: React.PropTypes.string,

  // Handler for button clicks
  onButtonClick: React.PropTypes.func
}
