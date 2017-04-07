import React from 'react';
import ReactDOM from 'react-dom';

// Import React libraries
import Select from 'react-select';
import ReactClickOut from 'react-onclickout';
import scrollIntoView from 'scroll-into-view';

// Import React components
import Button from '../common/Button.jsx';
import IconButton from '../common/IconButton.jsx';
import ModalContainer from '../common/ModalContainer.jsx';
import Tab from './Tab.jsx';
import AcadYrSectionContainer from './AcadYrSectionContainer.js';
import AddNewPlannerContainer from './AddNewPlannerContainer.js';

// Import server-side methods
import { createPlanner,
         removePlanner,
         duplicatePlanner,
         setPlannerName } from '../../../api/crud-controller/planner/methods.js';

 // Import common constants and utilities
 import { ENTER_CHAR_KEY_CODE,
          MAX_STUDY_PLAN_NAME_LENGTH,
          MIN_STUDY_PLAN_NAME_LENGTH } from '../common/Constants.js';
 import { isDefinedObj,
          getFirstNChars } from '../../../utils/util.js';


/**
 * React Component for a TabbedContainer that holds the user's study plan.
 * Every study plan is displayed in a panel within the TabbedContainer.
 * Different study plans may be viewed by selecting its corresponding Tab.
 */
export default class TabbedContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      newPlannerDialog: null,
      tabSelectedIndex: 0,
      isAddingNewPlan: false,
      isModalVisible: false,
      isEditingPlanName: false,
      planNameToEdit: false
    }
  }

  /**
   * Display Add New Planner Dialog only when component is completely mounted
   */
  componentDidMount(){
    this.setState({
      newPlannerDialog:
        <AddNewPlannerContainer
          handleAddBlankTemplate={this.handleAddBlankTemplate.bind(this)}
          handleAddedTemplate={this.handleAddTemplate.bind(this)} />
    });
  }

  //======================================================
  // EVENT HANDLERS WITHIN THIS TAB
  //======================================================
  /**
   * Handler for when user clicks on a tab
   *
   * @param {[int]} index    Index of the tab the user clicked on. From the
   *                         left onscreen, the indices start from 0.
   */
  handleClickTab(index) {
    this.props.handleSelectTab(index);
    this.setState({tabSelectedIndex: index});
  }

  /**
   * Handler for when user is entering a new study plan's name
   *
   * @param {[Object]} event    Event object of this HTML object
   */
  handleEnterStudyPlanName(event) {
    if (isDefinedObj(event)) {
      let userInputStudyPlanName = event.target.value;

      if (event.charCode == ENTER_CHAR_KEY_CODE) { // If pressed ENTER
        if (this.state.isAddingNewPlan) {
          this.setState({ isAddingNewPlan: false });
          createPlanner(userInputStudyPlanName, ["focusArea"]);
          this.setState({tabSelectedIndex:this.props.plannerIDs.length});
        }
      }
    }
  }

  /**
   * Handler for when user clicks outside of the input field when adding a
   * study plan and entering a new study plan's name
   *
   * @param {[Object]} event    Event object of this HTML object
   */
  handleCancelAddStudyPlan(event) {
    this.setState({ isAddingNewPlan: false });
    // If the user already entered a name, add study plan for convenience
    if (isDefinedObj(event)) {
      let userInputStudyPlanName = event.target.value;
      if (userInputStudyPlanName) {
        createPlanner(userInputStudyPlanName, ["focusArea"]);
        this.setState({tabSelectedIndex:this.props.plannerIDs.length});
      }
    }
  }

  /**
   * Handler for add study plan button on the right hand side of all tabs
   */
  handleAddStudyPlanClick() {
    this.setState({ isModalVisible : true });
  }

  /**
   * Handler for hiding study plan modal
   */
  handleCloseAddPlanModal() {
    this.setState({ isModalVisible : false });
  }

  /**
   * Handles event where user already selected a study
   * plan template that isn't a blank one
   */
  handleAddTemplate() {
    let indexOfStudyPlanTabAdded = this.props.plannerIDs.length;
    this.props.handleSelectTab(indexOfStudyPlanTabAdded);

    this.setState({
      isModalVisible : false,
      tabSelectedIndex:this.props.plannerIDs.length
    });
  }

  /**
   * Handles event where user selected a blank study
   * plan template
   */
  handleAddBlankTemplate(){
    let indexOfStudyPlanTabAdded = this.props.plannerIDs.length;
    this.props.handleSelectTab(indexOfStudyPlanTabAdded);

    this.setState({
      isModalVisible : false,
      isAddingNewPlan : true
    });
  }

  /**
   * Handler for deleting study plan.
   *
   * @param {[int]} index    Index of the study plan to delete represented by
   *                         the tab's index from the left. From the
   *                         left onscreen, the indices start from 0.
   */
  handleDeleteStudyPlanClick(index) {
    let studyPlanIDToDelete = this.props.plannerIDs[index];
    removePlanner(studyPlanIDToDelete);

    // if deleting last planner, auto select previous planner
    if(index == this.props.plannerIDs.length - 1){
      this.setState({
        tabSelectedIndex: index-1
      })
    }
  }

  /**
   * Handler for duplicating a study plan
   *
   * @param {[String]} plannerID    Planner ID of the planner to
   *                                duplicate.
   */
  handleDuplicateStudyPlanClick(plannerID) {
    duplicatePlanner(plannerID);
  }

  /**
   * Handler for editing a study plan's name
   *
   * @param {[String]} plannerID    Planner ID of the planner
   *                                to edit.
   */
  handleEditStudyPlan(plannerID) {
    this.setState({
      isEditingPlanName: true,
      planNameToEdit: plannerID
    });
  }

  /**
   * Handler for editing a study plan's name
   *
   * @param {[String]} plannerID    Planner ID of study plan to be edited
   * @event {[Object]} event    Event object of this HTML object
   */
  handleEditStudyPlanName(plannerID, event) {
    if (isDefinedObj(event)) {
      let userInput = event.target.value;

      if (event.charCode == ENTER_CHAR_KEY_CODE) { // If pressed ENTER
        if (this.state.isEditingPlanName) {
          this.setState({ isEditingPlanName: false });
          setPlannerName(plannerID, userInput);
        }
      }
    }
  }

  /**
   * Handler for when user clicks outside of the input field when editing a
   * study plan and entering a new name for this
   *
   * @param {[String]} plannerID    Planner ID of study plan to be edited
   * @event {[Object]} event    Event object of this HTML object
   */
  handleCancelEditStudyPlan(plannerID, event) {
    this.setState({ isEditingPlanName: false });

    // If the user already entered a name, add study plan for convenience
    if (isDefinedObj(event)) {
      let userInput = event.target.value;
      if (userInput) {
        setPlannerName(plannerID, userInput);
      }
    }
  }

  scrollToElement(el){
    var node = ReactDOM.findDOMNode(el);
    if(node)
      scrollIntoView(node, {time:500});
  }

  //===================================================================
  // RENDER FUNCTIONS FOR DISTINCT UI PARTS WITHIN THE TABBEDCONTAINER
  //===================================================================
  /**
   * Renders a tab with its internal UI components and event handlers.
   * Tabs contain a caret that activates a dropdown menu and event handlers
   * for selecting an active tab, editing or deleting a study plan.
   *
   * @param {[String]} tabTitle    Text of tab's title
   * @param {[int]} index    Index of this tab. From the left onscreen, the
   *                         indices start from 0.
   * @param {[String]} plannerID     ID of this tab's study plan
   * @return    React component representing a Tab.
   */
  renderTab(tabTitle, index, plannerID) {
    let tabTitleComponent = tabTitle;
    let isActiveTab = (this.state.tabSelectedIndex === index);

    // Enable the input field only for the study plan the user wants to edit
    if (this.state.planNameToEdit == plannerID && this.state.isEditingPlanName) {
      tabTitleComponent = this.renderTabTitleInput(tabTitle, plannerID);
    } else {
      tabTitleComponent = this.renderTabTitle(tabTitle, plannerID, isActiveTab);
    }

    return (
      <Tab key={index} ref={isActiveTab ? this.scrollToElement : null}
           navSpanClass="nav-link-in"
           fullTabTitle={tabTitle}
           tabTitle={tabTitleComponent} enabledDropdown={isActiveTab}
           onClickTab={this.handleClickTab.bind(this, index)}
           onClickDeleteTab={this.handleDeleteStudyPlanClick.bind(this, index)}
           onClickDuplicateTab={this.handleDuplicateStudyPlanClick.bind(this, plannerID)}
           onClickEditTab={this.handleEditStudyPlan.bind(this, plannerID)}
           isEditingPlanName={this.state.isEditingPlanName}
           isActiveTab={isActiveTab} />
    )
  }

  /**
   * Renders the title of a tab. If the number of characters for this tab
   * is too long (>MAX_STUDY_PLAN_NAME_LENGTH chars), it will be sliced so
   * that tab titles don't contain Strings that are too long to fit in a tab.
   *
   * @param {[String]} tabTitle    Text of tab's title
   * @param {[String]} plannerID     ID of this tab's study plan
   * @return    Shortened String representation of this tab title.
   */

  renderTabTitle(tabTitle, plannerID, isActiveTab) {
    let trimmedTabTitle =  getFirstNChars(tabTitle, MAX_STUDY_PLAN_NAME_LENGTH);
    if (trimmedTabTitle.length < tabTitle.length) {
      // If the tab title was so long that it got trimmed
      trimmedTabTitle += "...";
    }
    // If the tab title was too short
    else if(isActiveTab && trimmedTabTitle.length < MIN_STUDY_PLAN_NAME_LENGTH){
      let space = '\u2003';
      while(trimmedTabTitle.length < 6)
        trimmedTabTitle = space + trimmedTabTitle + space;
    }
    return trimmedTabTitle;
  }

  /**
   * Renders the input field title of a tab. This renders the input field
   * used for editing a study plan's name.
   *
   * @param {[String]} plannerID     ID of this tab's study plan
   * @return    Input field for editing this study plan's name
   */
  renderTabTitleInput(tabTitle, plannerID) {
    return(
      <input autoFocus type="text" defaultValue={tabTitle}
             placeholder={tabTitle} style={{width: '7em'}}
             className= "form-control studyplan-tab-name-input"
             onKeyPress={this.handleEditStudyPlanName.bind(this, plannerID)}
             onBlur={this.handleCancelEditStudyPlan.bind(this, plannerID)} />
    )
  }

  /**
   * Renders tab that contains the input field for users to add another
   * new study plan. This tab is anchored to the right of every study plan tab.
   *
   * @return    React component Tab representing a Tab with an input field for
   *            users to input new study plan's name.
   */
  renderAddPlanTab() {
    return (
        <Tab navSpanClass="nav-link-in" ref={this.scrollToElement}
           enabledMouseOver={false} enabledDropdown={false} isActiveTab={this.props.plannerIDs.length==0}
           tabTitle={
             <input autoFocus type="text" className="form-control studyplan-tab-name-input"
                    placeholder="Untitled" style={{width: '7em'}}
                    onKeyPress={this.handleEnterStudyPlanName.bind(this)}
                    onBlur={this.handleCancelAddStudyPlan.bind(this)} />
           }
      />
    )
  }

  /**
   * Renders tab that contains the add icon button for users to add another
   * study plan.
   *
   * @return    React component Tab representing a Tab with the add new
   *            study plan button
   */
  renderAddPlanButton() {
    return (
      <Tab enabledMouseOver={false} enabledDropdown={false} isActiveTab={false}
           navSpanClass="nav-link-in"
           navLinkClass="add-planner-btn"
           onRightClickTab={()=>{}}
           onClickTab={this.handleAddStudyPlanClick.bind(this)}
           tabTitle={
             <IconButton
               icon="glyphicon glyphicon-plus"
               style={{margin:0}}
               displayColor="#999" onMouseOverColor="#595959"
               onButtonClick={this.handleAddStudyPlanClick.bind(this)} />}
      />
    )
  }

  renderAddPlanModal(){
    return(
      <ModalContainer
        onHidden={this.handleCloseAddPlanModal.bind(this)}
        content={
          <AddNewPlannerContainer
            handleAddBlankTemplate={this.handleAddBlankTemplate.bind(this)}
            handleAddedTemplate={this.handleAddTemplate.bind(this)} />
        }
      />
    );
  }

  render() {
    var tabTitleList = this.props.tabTitleList;
    var plannerIDs = this.props.plannerIDs;

    return (
      <section className='tabs-section'>
        <div className='tabs-section-nav tabs-section-nav-icons'>
          <div className='tbl'>
            <ul className='nav' role='tablist'>

              {/* Render the Tabs on the top of the TabbedContainer */}
              {tabTitleList.map((tabTitle, index) => {
                return this.renderTab(tabTitle, index, plannerIDs[index]);
              })}

              {/* Renders the tab used to enter a new study plan's name when
                  user clicks on "Add" study plan button */}
              {this.state.isAddingNewPlan ? this.renderAddPlanTab() : null}
              {this.state.isModalVisible ? this.renderAddPlanModal(): null}

              {/* "Add" study plan button with a "+" symbol */}
              {plannerIDs.length!=0 ? this.renderAddPlanButton() : null}

            </ul>
          </div>
        </div>

        <div className='tab-content'>
          <div role='tabpanel' className='tab-pane fade in active' style={{overflowY: 'auto'}}
               id={'tab' + this.state.tabSelectedIndex}>
                 {
                   // Show add menu dialog when no planners in dashboard
                   (plannerIDs.length == 0 && !this.state.isAddingNewPlan) ? this.state.newPlannerDialog : null
                 }

            {/* Renders a Academic Year content panel under each tab. */}
            {plannerIDs.map((plannerID, index) => {
              if (this.state.tabSelectedIndex == index) {
                // Only render acad year of the study tab the user selected
                // This is known by looking at which tab index is active
                return <AcadYrSectionContainer key={index} plannerID={plannerID} />
              }
            })}

          </div>
        </div>
      </section>
    )
  }
}

TabbedContainer.propTypes = {
  // List of all the tab titles to render
  // (max: MAX_STUDY_PLAN_NAME_LENGTH chars, or "..." will be added to the back)
  tabTitleList: React.PropTypes.node,
  handleSelectTab: React.PropTypes.func,

  // List of all plannerIDs to render
  plannerIDs: React.PropTypes.array
}
