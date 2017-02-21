import React from 'react';
import AcadYrSectionContainer from '../study_plan/AcadYrSectionContainer.js';
import Button from './Button.jsx';
import IconButton from './IconButton.jsx';

/**
 * React Component for a TabbedContainer that holds the user's study plan.
 * Every study plan is displayed in a panel within the TabbedContainer.
 * Different study plans may be viewed by selecting its corresponding Tab.
 */
export default class TabbedContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      tabSelectedIndex: 0
    }
  }

  handleSwitchTab(index) {
    this.setState({tabSelectedIndex: index});
  }

  handleAddStudyPlanClick() {
    console.log("ADD STUDY PLAN!");
  }

  render() {
    var tabTitleList = this.props.tabTitleList;
    var plannerIDs = this.props.plannerIDs;
    var currentlyActivePanelIndex = this.state.tabSelectedIndex;
    let contentPanels = [];

    for (var i = 0; i < plannerIDs.length; i++) {
      contentPanels.push(<AcadYrSectionContainer plannerID={plannerIDs[i]}/>);
    }

    return (
      <section className='tabs-section' style={{margin: 0}}>
        <div className='tabs-section-nav tabs-section-nav-icons'
             style={{ border: 0 }}>
          <div className='tbl'>
            <ul className='nav' role='tablist'>
              {tabTitleList.map((tabTitle, index) => {
                return (
                    <Tab key={index}
                         tabWidth="9em"
                         navSpanClass="nav-link-in"
                         isFirstTab={(index === 0) ? true : false}
                         tabTitle={tabTitle}
                         onSwitchTab={this.handleSwitchTab.bind(this, index)}
                         isActiveTab={(this.state.tabSelectedIndex === index)} />)
              })}

              {/* "Add" button for a study plan */}
              <Tab tabWidth="3em"
                   isFirstTab={false}
                   tabTitle={
                     <IconButton
                       icon="glyphicon glyphicon-plus"
                       style={{margin: '0.6em 0.25em'}}
                       displayColor="#505050" onMouseOverColor="#2b9cd5"
                       onButtonClick={this.handleAddStudyPlanClick.bind(this)} />}
                   />
            </ul>
          </div>
        </div>

        <div className='tab-content' style={{padding: '8px'}}>
          <div role='tabpanel' className='tab-pane fade in active'
               id={ 'tab' + currentlyActivePanelIndex}>
            {contentPanels[currentlyActivePanelIndex]}
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
 * selects its corresponding study plan.
 */
class Tab extends React.Component {
  render() {
    return (
      <li className='nav-item'
          style={{float: "left", width: this.props.tabWidth}}
          onClick={this.props.onSwitchTab}>
        <a className={'nav-link' + (this.props.isActiveTab ? ' active' : '')}
           role='tab'>
          <span className={this.props.navSpanClass}
                style={{paddingTop: '8px', paddingBottom: '8px'}}>
            {this.props.tabTitle}
          </span>
        </a>
      </li>
    )
  }
}

Tab.propTypes = {
  // Title of the tab (max: 15 chars, or a "..." will be rendered in place)
  tabTitle: React.PropTypes.node,

  // String representation of the width of each tab. Recommended to be in em
  // units like this, for example: "9em"
  tabWidth: React.PropTypes.string,

  // String representation of the class of the span tag within a Tab
  navSpanClass: React.PropTypes.string,

  // Handler for when a user clicks on this Tab
  onSwitchTab: React.PropTypes.func,

  // Boolean if true means this Tab is currently selected, false otherwise
  isActiveTab: React.PropTypes.bool
}
