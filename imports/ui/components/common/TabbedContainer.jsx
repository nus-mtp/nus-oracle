/* Import common utilities */
import { ENTER_CHAR_KEY_CODE } from './Constants.js';
import { isDefinedObj } from '../../../utils/util.js';
import { getFirstNChars } from '../../../utils/util.js';

/* import React components */
import React from 'react';
import Select from 'react-select';
import ReactClickOut from 'react-onclickout';
import AcadYrSectionContainer from '../study_plan/AcadYrSectionContainer.js';
import Button from './Button.jsx';
import IconButton from './IconButton.jsx';

/* Import server-side methods */
import { createPlanner } from '../../../api/crud-controller/planner/methods.js';
import { removePlanner } from '../../../api/crud-controller/planner/methods.js';

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
      isAddingNewModule: false
    }
  }

  handleClickTab(index) {
    this.setState({tabSelectedIndex: index});
  }

  handleEnterStudyPlanName(event) {
    if (isDefinedObj(event)) {
      let userInputStudyPlanName = event.target.value;
      if (event.charCode == ENTER_CHAR_KEY_CODE) { // If pressed ENTER
        this.setState({ isAddingNewModule: false });
        createPlanner(userInputStudyPlanName, focusArea);
      }
    }
  }

  handleCancelAddStudyPlan(event) {
    this.setState({isAddingNewModule: false});

    // If the user already entered a name, add study plan for convenience
    if (isDefinedObj(event)) {
      let userInputStudyPlanName = event.target.value;
      if (userInputStudyPlanName) {
        createPlanner(userInputStudyPlanName, focusArea);
      }
    }
  }

  handleAddStudyPlanClick() {
    this.setState({isAddingNewModule : true});
  }

  handleDeleteStudyPlanClick(index) {
    let studyPlanIDToDelete = this.props.plannerIDs[index];
    removePlanner(studyPlanIDToDelete);
  }

  render() {
    var tabTitleList = this.props.tabTitleList;
    var plannerIDs = this.props.plannerIDs;

    // Accumulate content panels to render under each Tab
    let contentPanels = [];
    for (var i = 0; i < plannerIDs.length; i++) {
      contentPanels.push(<AcadYrSectionContainer plannerID={plannerIDs[i]} />);
    }

    return (
      <section className='tabs-section' style={{margin: 0}}>
        <div className='tabs-section-nav tabs-section-nav-icons'
             style={{border: 0}}>
          <div className='tbl'>
            <ul className='nav' role='tablist'>

              {/* Render the Tabs on the top of the TabbedContainer */}
              {tabTitleList.map((tabTitle, index) => {
                return (
                  <Tab key={index} tabWidth="9em"
                       navSpanClass="nav-link-in" navSpanStyle={{position: "relative"}}
                       tabTitle={getFirstNChars(tabTitle, 12) + "..."}
                       enabledMouseOver={true}
                       isFirstTab={(index === 0) ? true : false}
                       onClickTab={this.handleClickTab.bind(this, index)}
                       onClickDeleteTab={this.handleDeleteStudyPlanClick.bind(this, index)}
                       isActiveTab={(this.state.tabSelectedIndex === index)} />
                )
              })}

              {/* Renders the tab used to enter a new study plan's name when
                  user clicks on "Add" study plan button */}
              {this.state.isAddingNewModule ?
                <Tab tabWidth="9em"
                     navSpanClass="nav-link-in" navSpanStyle={{padding: "0.37em"}}
                     enabledMouseOver={false}
                     isFirstTab={false}
                     tabTitle={
                       <input autoFocus type="text" className="form-control"
                              style={{height: "1.5em"}}
                              onKeyPress={this.handleEnterStudyPlanName.bind(this)}
                              onBlur={this.handleCancelAddStudyPlan.bind(this)}
                       />} /> :
                null}

              {/* "Add" study plan button with a "+" symbol */}
              <Tab tabWidth="3em"
                   isFirstTab={false}
                   tabTitle={
                     <IconButton
                       icon="glyphicon glyphicon-plus"
                       style={{margin: '0.75em 0.25em'}}
                       displayColor="#505050" onMouseOverColor="#00a8ff"
                       onButtonClick={this.handleAddStudyPlanClick.bind(this)}
                       enabledMouseOver={false} />} />
            </ul>
          </div>
        </div>

        <div className='tab-content' style={{padding: '8px'}}>
          <div role='tabpanel' className='tab-pane fade in active'
               id={ 'tab' + this.state.tabSelectedIndex}>
            {contentPanels[this.state.tabSelectedIndex]}
          </div>
        </div>
      </section>
    )
  }
}

TabbedContainer.propTypes = {
  tabTitleList: React.PropTypes.node,
  plannerIDs: React.PropTypes.array
}

/**
 * React Component for each Tab in the TabbedContainer. Click on this Tab to
 * select a study plan.
 */
class Tab extends React.Component {
  constructor() {
    super();
    this.state = {
      onMouseOver: false,
      onClickDropdown: false
    }
  }

  handleOnMouseEnter(event) {
    this.setState({ onMouseOver: true });
  }

  handleOnMouseLeave(event) {
    this.setState({ onMouseOver: false });
  }

  handleToggleDropdown(event) {
    this.setState({ onClickDropdown: !this.state.onClickDropdown });
  }

  handleOnBlurDropdown(event) {
    console.log("On Blur!!");
    this.setState({ onClickDropdown: false });
  }

  handleEditClick() {
    console.log("Editing!!");
    this.setState({ onClickDropdown: false });
  }

  handleDeleteClick() {
    this.props.onClickDeleteTab();
    this.setState({ onClickDropdown: false });
  }

  onClickOutDropdown() {
    this.setState({ onClickDropdown: false });
  }

  render() {
    return (
      <ReactClickOut onClickOut={this.onClickOutDropdown.bind(this)} >
        <li className='nav-item'
            style={{float: "left", width: this.props.tabWidth}}
            onClick={this.props.onClickTab}
            onMouseEnter={this.handleOnMouseEnter.bind(this)}
            onMouseLeave={this.handleOnMouseLeave.bind(this)}>
          <a className={'nav-link' + (this.props.isActiveTab ? ' active' : '')} role='tab'>
            <span className={this.props.navSpanClass} style={this.props.navSpanStyle}>

              {this.props.tabTitle}

              {/* Only want the delete button rendered if activated or on hover,
                  if not, we don't render anything. */}
              {this.props.enabledMouseOver && this.state.onMouseOver ?
                <IconButton
                  icon="fa fa-sort-down"
                  style={{position: 'absolute', top:'0.3em', right: '0.5em',
                          paddingTop: '0.15em', opacity: '0.8'}}
                  displayColor="#505050" onMouseOverColor="#ff9100"
                  onButtonClick={this.handleToggleDropdown.bind(this)} /> :
                null}

              {/* Toggle Dropdown menu for this tab */}

                {this.state.onClickDropdown ?
                  <div className="card-typical" onBlur={this.handleOnBlurDropdown.bind(this)}
                       style={{position: 'fixed', zIndex: '300', top: '7.3em', width: '7.75em'}}>

                    {/* A single dropdown selection */}
                  	<div onClick={this.handleEditClick.bind(this)} className="dropdown-item">
                      <i className="fa fa-edit"
                         style={{position: 'relative', float: 'left', paddingTop: '0.35em', left: '1.5em'}}></i>
                  		<div>Edit</div>
                  	</div>

                    {/* A single dropdown selection */}
                  	<div onClick={this.handleDeleteClick.bind(this)} className="dropdown-item">
                      <i className="fa fa-trash"
                         style={{position: 'relative', float: 'left', paddingTop: '0.25em', left: '1em'}}></i>
                  		<div>Delete</div>
                  	</div>
                  </div> :
                  null
                }

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
