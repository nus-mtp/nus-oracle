import React from 'react';

/**
 * Study plan template button React component.
 *
 * Handles the styles and click/hover events of the template buttons
 * meant for the user to select from a list of study plan templates.
 */
export default class StudyPlanTemplateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onMouseOver: false
    }
  }

  //==============================================
  // EVENT HANDLERS
  //==============================================
  handleClick(event) {
    this.props.onClick(event);
  }

  handleOnMouseEnter(event) {
    this.setState({ onMouseOver: true });
  }

  handleOnMouseLeave(event) {
    this.setState({ onMouseOver: false });
  }

  /**
   * Returns the appropriate style upon hover, or returns nothing
   */
  getHoverStyle() {
    if (this.state.onMouseOver) {
      return {
        color: '#000000',
        cursor: 'pointer',
        WebkitBoxShadow: '4px 7px 12px -2px rgba(0,0,0,0.7)',
        MozBoxShadow: '4px 7px 12px -2px rgba(0,0,0,0.7)',
        BoxShadow: '4px 7px 12px -2px rgba(0,0,0,0.7)',
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={this.props.alignmentClass}>
        <article className="statistic-box"
                 style={{backgroundColor: this.props.bgColor}}>

          <div style={this.getHoverStyle()}
               onMouseOver={this.handleOnMouseEnter.bind(this)}
               onMouseLeave={this.handleOnMouseLeave.bind(this)}
               onClick={this.handleClick.bind(this)}>

            <div className="number">
              {this.props.icon}
            </div>

            <div style={{padding: "5px", wordWrap: "break-word"}}>
              <b>{this.props.templateTitle}</b>
            </div>
          </div>

        </article>
      </div>
    );
  }
}

StudyPlanTemplateButton.propTypes = {
  /* Custom button CSS */
  // String representation of the CSS class.
  alignmentClass: React.PropTypes.string,

  // Hex representation of the color of this button's background
  bgColor: React.PropTypes.string,

  // The Study Plan template's title
  templateTitle: React.PropTypes.string,

  /* Custom button icon JSX object */
  // Must be a JSX element, e.g. you can pass in something like
  // <i className="my-icon-class-name" style={{ color: red }}>My Icon!</i>
  icon: React.PropTypes.element,

  // Handler for button clicks
  onClick: React.PropTypes.func,
}
