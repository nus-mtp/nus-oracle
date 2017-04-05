import React from 'react';
import ReactDOM from 'react-dom';

/* Import React components */
import ReactClickOut from 'react-onclickout';
import IconButton from '../common/IconButton.jsx';
import ModalContainer from '../common/ModalContainer.jsx';
import DialogContainer from '../common/DialogContainer.jsx';
import Button from '../common/Button.jsx';

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
      onClickDropdown: false,
      deleteIsConfirmed: false,
      launchConfirmDelete: false,
      dimension: { width: -1, left: -1}
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

    // close other opened dropdowns
    var page = document.getElementsByTagName("BODY")[0];
    page.click();

    this.setState({ onClickDropdown: !this.state.onClickDropdown });
  }

  handleOnBlurDropdown(event) {
    this.setState({
      onMouseOver: false,
      onClickDropdown: false
    });
  }

  handleRightClick(event){
    // to disable right click context menu from appearing
    event.preventDefault();
    if(this.props.isActiveTab){
      this.props.onClickTab(event);
      this.handleToggleDropdown(event);
    }
    else{
      this.props.onClickTab(event);
    }
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
    this.setState({
      launchConfirmDelete: true
    });
  }

  handleConfirmDelete() {
    this.props.onClickDeleteTab();
    this.handleClickDropdown();
    this.resetDeleteState();
  }

  resetDeleteState() {
    this.setState({
      launchConfirmDelete: false,
      deleteIsConfirmed: false
    });
  }

  /**
   * Sets the style of this this whether it is a active or not. On active
   * tab is a tab that was clicked on by the user and represents the study
   * plan the user is currently viewing.
   *
   * @param {[String]} cssClass    Current default CSS class for a tab
   * @return    String representation of a CSS class to apply for an active tab
   */
  setActiveTabClass(cssClass) {
    if (this.props.isActiveTab) {
      return cssClass + " active";
    } else {
      return cssClass;
    }
  }

  // updates dimension of tab when loaded / reloaded
  updateTabDimension(dimension){
    this.setState({dimension: dimension});
  }

  //======================================================
  // RENDER FUNCTIONS FOR DISTINCT UI PARTS WITHIN THE TAB
  //======================================================
  /**
   * Renders the dropdown caret on the right hand side of a tab
   *
   * @return    Dropdown caret React component
   */
  renderDropdownCaret() {
    return (
      <IconButton
        icon="fa fa-caret-down"
        style={{float: "right", paddingLeft:"0.8em", margin:0}}
        displayColor="#505050" onMouseOverColor="#ff6600"
        onButtonClick={this.handleToggleDropdown.bind(this)}
      />
    )
  }

  /**
   * Renders the dropdown menu anchored below a tab
   *
   * @return    Dropdown menu React component with dropdown menu buttons
   */
  renderDropDownMenu(dimension) {
    return (
      <ReactClickOut onClickOut={this.handleOnBlurDropdown.bind(this)}>
        <div className="card-typical" onBlur={this.handleOnBlurDropdown.bind(this)}
          style={{width: dimension.width + 'px', left: dimension.left + 'px'}}>
          {/* Edit study plan name dropdown selection */}
          {this.renderDropDownMenuSelection(
            "dropdown-item",
            "fa fa-edit",
            {position: 'relative', float: 'left', paddingTop: '0.25em', marginRight: '0.8em'},
            "Rename",
            this.handleEditClick
          )}

          {/* Delete study plan dropdown selection */}
          {this.renderDropDownMenuSelection(
            "dropdown-item",
            "fa fa-trash",
            {position: 'relative', float: 'left', paddingTop: '0.35em', marginRight: '1.0em'},
            "Delete",
            this.handleDeleteClick
          )}
        </div>
      </ReactClickOut>
    );
  }

  /**
   * Renders the dropdown menu anchored below a tab
   *
   * @param {[String]} CSS Class of this dropdown selection
   * @param {[String]} CSS Class of icon
   * @param {[Object]} Style prop of icon
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
    var onRightClick = this.props.onRightClickTab;
    return (
      /* ReactClickOut listens for and handles all click-outside events */
      <ReactClickOut onClickOut={this.handleOnBlurDropdown.bind(this)}>
          <li className='nav-item'
              onClick={this.props.onClickTab}
              onContextMenu={onRightClick ? onRightClick : this.handleRightClick.bind(this)}
              onMouseEnter={this.handleOnMouseEnter.bind(this)}
              onMouseLeave={this.handleOnMouseLeave.bind(this)}>
            <a className={this.setActiveTabClass('nav-link')} role='tab'>
              <span className={this.props.navSpanClass} style={this.props.navSpanStyle}
                  ref={(el)=> {
                    var node = ReactDOM.findDOMNode(el);
                    if(node){
                      if(this.state.dimension.left != node.getBoundingClientRect().left ||
                      this.state.dimension.width != node.getBoundingClientRect().width){
                        this.updateTabDimension(node.getBoundingClientRect());
                      }
                    }
              }}>

                {/* The label of this Tab is rendered here */}
                { this.props.tabTitle }

                {/* Render dropdown caret */}
                { this.props.enabledDropdown && this.props.enabledMouseOver &&
                  !this.props.isEditingPlanName ?
                  this.renderDropdownCaret() : null }

                {/* Toggle Dropdown menu for this tab */}
                { this.props.enabledDropdown && this.state.onClickDropdown ?
                  this.renderDropDownMenu(this.state.dimension) : null}

                {/* Render delete modal */}
                {this.state.launchConfirmDelete ?
                  <ModalContainer
                    onHidden={this.resetDeleteState.bind(this)}
                    content={
                      <DialogContainer
                        title={"Are you sure you want to delete this study plan, '" +
                               this.props.fullTabTitle + "'?"}
                        content={
                          <div>
                            <Button buttonClass={"btn btn-rounded btn-inline btn-warning-outline"}
                                    buttonText="Yes"
                                    onButtonClick={this.handleConfirmDelete.bind(this)} />
                            <Button buttonClass={"btn btn-rounded btn-inline btn-secondary-outline"}
                                    buttonText="No"
                                    onButtonClick={this.resetDeleteState.bind(this)} />
                          </div>
                        }
                      /> }
                  /> : null}

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

  // String representation of the class of the span tag within a Tab
  navSpanClass: React.PropTypes.string,

  // Style object of the span tag within this Tab
  navSpanStyle: React.PropTypes.object,

  // Handler for when a user clicks on this Tab
  onClickTab: React.PropTypes.func,

  // Handler for when a user clicks on delete button on the Tab dropdown
  onClickDeleteTab: React.PropTypes.func,

  // Handler for when a user clicks on edit button on the Tab dropdown
  onClickDeleteTab: React.PropTypes.func,

  // Boolean true means this Tab is currently in edit state, false otherwise
  isEditingPlanName: React.PropTypes.bool,

  // Boolean true means this Tab is currently selected, false otherwise
  isActiveTab: React.PropTypes.bool,

  // Boolean true means this Tab will deactivate mouse over events, false otherwise
  enabledMouseOver: React.PropTypes.bool,

  // Boolean true means this Tab will render a dropdown menu, false otherwise
  enabledDropdown: React.PropTypes.bool
}

Tab.defaultProps = {
  tabTitle: <div>default title node</div>,
  navSpanStyle: {},
  isActiveTab: false,
  enabledMouseOver: true,
  enabledDropdown: true
}
