/* Import React components */
import React from 'react';
import ReactClickOut from 'react-onclickout';
import IconButton from '../common/IconButton.jsx';

/**
 * React Component for each Tab in the TabbedContainer.
 * Users will click on this Tab to select a study plan.
 *
 * This Tab component handles click, hover, click-outside and dropdown
 * events and is recommended to be used with the TabbedContainer component.
 */
export default class Tab extends React.Component {
  constructor() {
    super();
    this.state = {
      onMouseOver: false,
      onClickDropdown: false
    }
  }

  //======================================================
  // EVENT HANDLERS WITHIN THIS TAB
  //======================================================
  /**
   * Handlers for hover events
   */
  handleOnMouseEnter(event) {
    this.setState({ onMouseOver: true });
  }

  handleOnMouseLeave(event) {
    this.setState({ onMouseOver: false });
  }

  /**
   * Handlers for dropdown events
   */
  handleToggleDropdown(event) {
    this.setState({ onClickDropdown: !this.state.onClickDropdown });
  }

  handleOnBlurDropdown(event) {
    this.setState({ onClickDropdown: false });
  }

  /**
   * Handlers for click events - click on Edit or Delete
   */
  handleClickDropdown() {
    this.setState({ onClickDropdown: false });
  }

  handleEditClick() {
    this.props.onClickEditTab();
    this.handleClickDropdown();
  }

  handleDeleteClick() {
    this.props.onClickDeleteTab();
    this.handleClickDropdown();
  }

  /**
   * Sets the style of this this whether it is a active or not. On active
   * tab is a tab that was clicked on by the user and represents the study
   * plan the user is currently viewing.
   *
   * @param {[String]} cssClass    Current default CSS class for a tab
   * @param {[boolean]} isActiveTab    True if is active tab, false otherwise
   * @return    String representation of a CSS class to apply for an active tab
   */
  setActiveTabClass(cssClass, isActiveTab) {
    if (isActiveTab) {
      return cssClass + " active";
    } else {
      return cssClass;
    }
  }

  //======================================================
  // RENDER FUNCTIONS FOR DISTINCT UI PARTS WITHIN THE TAB
  //======================================================
  /**
   * Renders the dropdown caret on the right hand side of a tab
   *
   * @param {[boolean]} enabledMouseOver    Whether mouse over is activated
   *                                        for this tab or not
   * @param {[boolean]} onMouseOver    Whether this tab is being hovered over
   * @return    Dropdown caret React component
   */
  renderDropdownCaret(enabledMouseOver, onMouseOver) {
    return (
      <IconButton
        icon="fa fa-sort-down"
        style={{position: 'absolute', top:'0.3em', right: '0.5em',
                paddingTop: '0.15em', opacity: '0.8'}}
        displayColor="#505050" onMouseOverColor="#ff9100"
        onButtonClick={this.handleToggleDropdown.bind(this)}
      />
    )
  }

  /**
   * Renders the dropdown menu anchored below a tab
   *
   * @param {[boolean]} onClickDropdown    Whether or not user clicked to
   *                                       activate dropdown menu or not
   * @return    Dropdown menu React component with dropdown menu buttons
   */
  renderDropDownMenu(onClickDropdown) {
    return (
      <div className="card-typical"
           onBlur={this.handleOnBlurDropdown.bind(this)}
           style={{position: 'fixed', zIndex: '300', top: '3.3em',
                   width: '7.75em', textAlign: 'left',
                   webkitBoxShadow: '4px 4px 26px -6px rgba(0,0,0,0.5)',
                   mozBoxShadow: '4px 4px 26px -6px rgba(0,0,0,0.5)',
                   boxShadow: '4px 4px 26px -6px rgba(0,0,0,0.5)'}}>

        {/* Edit study plan name dropdown selection */}
        {this.renderDropDownMenuSelection(
          "dropdown-item", "fa fa-edit",
          {position: 'relative', float: 'left',
           paddingTop: '0.35em', marginRight: '0.8em'},
          "Delete", this.handleDeleteClick
        )}

        {/* Delete study plan dropdown selection */}
        {this.renderDropDownMenuSelection(
          "dropdown-item", "fa fa-trash",
          {position: 'relative', float: 'left',
           paddingTop: '0.25em', marginRight: '1em'},
          "Edit", this.handleEditClick
        )}
      </div>
    )
  }

  /**
   * Renders the dropdown menu anchored below a tab
   *
   * @param {[String]} String rep of class of this dropdown selection
   * @param {[String]} String rep of class of icon
   * @param {[Object]} Object rep of style of icon
   * @param {[String]} Dropdown selection text
   * @param {[Func]} Handler for click events on this dropdown menu item
   *
   * @return    Dropdown menu selection button React component
   */
  renderDropDownMenuSelection(className, iconClassName, iconStyle, text, clickHandler) {
    return (
      <div className={className} onClick={clickHandler.bind(this)}>
        <i className={iconClassName} style={iconStyle}></i>
        <div>{text}</div>
      </div>
    )
  }

  render() {
    return (
      /* ReactClickOut listens for and handles all click-outside events */
      <ReactClickOut onClickOut={this.handleOnBlurDropdown.bind(this)} >
        <li className='nav-item' style={{float: "left", width: this.props.tabWidth}}
            onClick={this.props.onClickTab}
            onMouseEnter={this.handleOnMouseEnter.bind(this)}
            onMouseLeave={this.handleOnMouseLeave.bind(this)}>
          <a className={this.setActiveTabClass("nav-link", this.props.isActiveTab)} role='tab'>
            <span className={this.props.navSpanClass} style={this.props.navSpanStyle}>

              {/* The label of this Tab is rendered here */}
              {this.props.tabTitle}

              {/* Render dropdown caret */}
              {this.props.enabledMouseOver && this.state.onMouseOver ?
                this.renderDropdownCaret() : null
              }

              {/* Toggle Dropdown menu for this tab */}
              {this.state.onClickDropdown ?  this.renderDropDownMenu() : null}

            </span>
          </a>
        </li>
      </ReactClickOut>
    )
  }
}

Tab.propTypes = {
  // Title of the tab (max: 15 chars, or a "..." will be rendered in place)
  tabTitle: React.PropTypes.node,

  // String representation of the width of each tab. Recommended to be in em
  // units like: "9em"
  tabWidth: React.PropTypes.string,

  // String representation of the class of the span tag within a Tab
  navSpanClass: React.PropTypes.string,

  // String representation of the style of the span tag within a Tab
  // If you don't want to use the style tag, simply pass in an empty object
  // like: {}
  navSpanStyle: React.PropTypes.object,

  // Handler for when a user clicks on this Tab
  onClickTab: React.PropTypes.func,

  // Handler for when a user clicks on delete button on the Tab
  onClickDeleteTab: React.PropTypes.func,

  // Boolean true means this Tab is currently selected, false otherwise
  isActiveTab: React.PropTypes.bool,

  // Boolean true means this Tab will deactivate mouse over events, false otherwise
  enabledMouseOver: React.PropTypes.bool
}
