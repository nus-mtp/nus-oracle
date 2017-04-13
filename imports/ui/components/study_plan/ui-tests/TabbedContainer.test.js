import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import TabbedContainer from '../TabbedContainer.jsx';

describe('Integrated UI test <TabbedContainer />', function() {
  it('renders without any error', () => {
    const wrapper = shallow(
      <TabbedContainer
        tabTitleList={["A", "B", "C"]}
        plannerIDs={["123", "456", "789"]} />
    );
    expect(wrapper);
  });

  it ('should have props defined', function() {
    const wrapper = shallow(
      <TabbedContainer
        tabTitleList={["A", "B", "C"]}
        plannerIDs={["123", "456", "789"]} />
    );

    expect(wrapper.props().tabTitleList).to.be.defined;
    expect(wrapper.props().plannerIDs).to.be.defined;
  });

  it ('number of tabs to be rendered are rendered', function() {
    const wrapper = shallow(
      <TabbedContainer
        tabTitleList={["A", "B", "C"]}
        plannerIDs={["123", "456", "789"]} />
    );

    // Expect 4 tabs even though we defined 3 because the 4th
    // is the "+" Add Study Plan tab
    expect(wrapper.find('Tab').length).to.equal(4);
  });

  it ('all tab titles to be rendered are rendered', function() {
    const wrapper = shallow(
      <TabbedContainer
        tabTitleList={["A", "B", "C"]}
        plannerIDs={["123", "456", "789"]} />
    );

    expect(wrapper.find('Tab').nodes[0].props.fullTabTitle).to.equal("A");
    expect(wrapper.find('Tab').nodes[1].props.fullTabTitle).to.equal("B");
    expect(wrapper.find('Tab').nodes[2].props.fullTabTitle).to.equal("C");
  })
});
