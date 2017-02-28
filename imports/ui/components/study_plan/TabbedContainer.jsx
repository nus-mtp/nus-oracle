/* Import common utilities */
import { ENTER_CHAR_KEY_CODE } from '../common/Constants.js';
import { MAX_STUDY_PLAN_NAME_LENGTH } from '../common/Constants.js';
import { isDefinedObj } from '../../../utils/util.js';
import { getFirstNChars } from '../../../utils/util.js';

/* Import React components */
import React from 'react';
import Select from 'react-select';
import ReactClickOut from 'react-onclickout';
import Button from '../common/Button.jsx';
import IconButton from '../common/IconButton.jsx';
import Tab from './Tab.jsx';
import AcadYrSectionContainer from './AcadYrSectionContainer.js';

/* Import server-side methods */
import { createPlanner } from '../../../api/crud-controller/planner/methods.js';
import { removePlanner } from '../../../api/crud-controller/planner/methods.js';
import { setPlannerName } from '../../../api/crud-controller/planner/methods.js';

// TEMPORARY
const focusArea = ['dunnoWhatFocusArea'];

/**
 * React Component for a TabbedContainer that holds the user's study plan.
 * Every study plan is displayed in a panel within the TabbedContainer.
 * Different study plans may be viewed by selecting its corresponding Tab.
 */
export default class TabbedContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      tabSelectedIndex: 0,
      isAddingNewPlan: false,
      isEditingPlanName: false,
      planNameToEdit: false
    }
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
          createPlanner(userInputStudyPlanName, focusArea);
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
        createPlanner(userInputStudyPlanName, focusArea);
      }
    }
  }

  /**
   * Handler for add study plan button on the right hand side of all tabs
   */
  handleAddStudyPlanClick() {
    this.setState({ isAddingNewPlan : true });
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
  }

  /**
   * Handler for editing a study plan's name
   *
   * @param {[String]} plannerID    Planner ID of the planner the user is going
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
    let enabledMouseOver = true;
    let tabTitleComponent = tabTitle;

    if (this.state.planNameToEdit == plannerID && this.state.isEditingPlanName) {
      // Enable the input field only for the study plan the user wants to edit
      enabledMouseOver = false;
      tabTitleComponent = this.renderTabTitleInput(tabTitle, plannerID);
    } else {
      tabTitleComponent = this.renderTabTitle(tabTitle, plannerID)
    }

    return (
      <Tab key={index} tabWidth="9em"
           navSpanClass="nav-link-in" navSpanStyle={{position: "relative"}}
           tabTitle={tabTitleComponent}
           enabledMouseOver={true}
           isFirstTab={(index === 0) ? true : false}
           onClickTab={this.handleClickTab.bind(this, index)}
           onClickDeleteTab={this.handleDeleteStudyPlanClick.bind(this, index)}
           onClickEditTab={this.handleEditStudyPlan.bind(this, plannerID)}
           isActiveTab={(this.state.tabSelectedIndex === index)} />
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
  renderTabTitle(tabTitle, plannerID) {
    let trimmedTabTitle =  getFirstNChars(tabTitle, MAX_STUDY_PLAN_NAME_LENGTH);
    if (trimmedTabTitle.length < tabTitle.length) {
      // If the tab title was so long that it got trimmed
      trimmedTabTitle += "...";
    }
    return trimmedTabTitle
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
             className="form-control" style={{height: "1.5em"}}
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
      <Tab tabWidth="9em"
           navSpanClass="nav-link-in" navSpanStyle={{padding: "0.37em"}}
           enabledMouseOver={false} isFirstTab={false}
           tabTitle={
             <input autoFocus type="text" className="form-control"
                    style={{height: "1.5em"}}
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
      <Tab tabWidth="3em" isFirstTab={false}
           tabTitle={
             <IconButton
               icon="glyphicon glyphicon-plus"
               style={{margin: '0.75em 0.25em'}}
               displayColor="#505050" onMouseOverColor="#00a8ff"
               onButtonClick={this.handleAddStudyPlanClick.bind(this)}
               enabledMouseOver={false} />}
      />
    )
  }

  render() {
    var tabTitleList = this.props.tabTitleList;
    var plannerIDs = this.props.plannerIDs;

    return (
      <section className='tabs-section' style={{margin: 0}}>
        <div className='tabs-section-nav tabs-section-nav-icons' style={{border: 0}}>
          <div className='tbl'>
            <ul className='nav' role='tablist'>

              {/* Render the Tabs on the top of the TabbedContainer */}
              {tabTitleList.map((tabTitle, index) => {
                return this.renderTab(tabTitle, index, plannerIDs[index]);
              })}

              {/* Renders the tab used to enter a new study plan's name when
                  user clicks on "Add" study plan button */}
                  {this.state.isAddingNewPlan ? this.renderAddPlanTab() : null}

              {/* "Add" study plan button with a "+" symbol */}
              {this.renderAddPlanButton()}

            </ul>
          </div>
        </div>

        <div className='tab-content' style={{padding: '8px'}}>
          <div role='tabpanel' className='tab-pane fade in active'
               id={'tab' + this.state.tabSelectedIndex}>

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

  // List of all plannerIDs to render
  plannerIDs: React.PropTypes.array
}
