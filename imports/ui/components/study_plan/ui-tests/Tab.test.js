import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import Tab from '../Tab.jsx';

describe('Integrated UI test <Tab />', function() {
  it('renders without any error', () => {
    expect(shallow(<Tab />));
  });

  it ('should have props defined', function() {
    const wrapper = shallow(
      <Tab
        tabTitle={'Something'}
        navSpanClass={'btn'}
        navSpanStyle={{color: '#cccccc'}}
        isEditingPlanName={false}
        isActiveTab={true}
        enabledMouseOver={false}
        enabledDropdown={false}
      />
    );

    expect(wrapper.props().tabTitle).to.be.defined;
    expect(wrapper.props().navSpanClass).to.be.defined;
    expect(wrapper.props().navSpanStyle).to.be.defined;
    expect(wrapper.props().onClickTab).to.be.defined;
    expect(wrapper.props().onClickDeleteTab).to.be.defined;
    expect(wrapper.props().onClickDeleteTab).to.be.defined;
    expect(wrapper.props().isEditingPlanName).to.be.defined;
    expect(wrapper.props().isActiveTab).to.be.defined;
    expect(wrapper.props().enabledMouseOver).to.be.defined;
    expect(wrapper.props().enabledDropdown).to.be.defined;
  });

  it ('props contains matching style properties', function() {
    const wrapper = shallow(
      <Tab
        tabTitle={'Something'}
        navSpanClass={'btn'}
        navSpanStyle={{color: '#cccccc'}}
        isEditingPlanName={false}
        isActiveTab={true}
        enabledMouseOver={false}
        enabledDropdown={false}
      />
    );

    expect(wrapper.find('span').text()).to.equal('Something');
    expect(wrapper.children().children().props().children.props.style.color).to.equal('#cccccc');
    expect(wrapper.children().children().props().children.props.className).to.equal('btn');
  });

  it ('has tabTitle rendered', function() {
    const wrapper = shallow(
      <Tab
        tabTitle={'Something'}
        navSpanClass={'btn'}
        navSpanStyle={{color: '#cccccc'}}
        isEditingPlanName={false}
        isActiveTab={true}
        enabledMouseOver={false}
        enabledDropdown={false}
      />
    );
    expect(wrapper.find('a').text()).to.equal('Something');
  })

  it ('should have dropdown rendered', function() {
    const wrapper = shallow(
      <Tab
        tabTitle={'Something'}
        navSpanClass={'btn'}
        navSpanStyle={{color: '#cccccc'}}
        isEditingPlanName={false}
        isActiveTab={true}
        enabledMouseOver={true}
        enabledDropdown={true}
      />
    );
    wrapper.setState({ onClickDropdown: true });
    expect(wrapper.find('.card-typical').length).to.equal(1);
  });
});
