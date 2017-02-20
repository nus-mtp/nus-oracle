import React from 'react';

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

  render() {
    var tabTitleList = this.props.tabTitleList;
    var contentPanels = this.props.contentPanelsList;
    var currentlyActivePanelIndex = this.state.tabSelectedIndex;

    return (
      <section className='tabs-section' style={{margin: 0}}>
        <div className='tabs-section-nav tabs-section-nav-icons'
             style={{ border: 0 }}>
          <div className='tbl'>
            <ul className='nav' role='tablist'>
              {tabTitleList.map((tabTitle, index) => {
                return (
                    <Tab key={index}
                         isFirstTab={(index === 0) ? true : false}
                         tabTitle={tabTitle}
                         onSwitchTab={this.handleSwitchTab.bind(this, index)}
                         isActiveTab={(this.state.tabSelectedIndex === index)} />)
              })}
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
  contentPanelsList: React.PropTypes.node
}

class Tab extends TabbedContainer {
  render() {
    var widthEachTab = "200px";

    return (
      <li className='nav-item'
          style={(this.props.isFirstTab ? {width: widthEachTab} : {})}
          onClick={this.props.onSwitchTab}>
        <a className={'nav-link' + (this.props.isActiveTab ? ' active' : '')}
           role='tab' style={{width: widthEachTab}}>
          <span className='nav-link-in'
                style={{paddingTop: '8px', paddingBottom: '8px'}}>
            {this.props.tabTitle}
          </span>
        </a>
      </li>
    )
  }
}
