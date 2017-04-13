import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import TranslucentOverlay from '../TranslucentOverlay.jsx';

describe('Integrated UI test <TranslucentOverlay />', function() {
  it('renders without any error', () => {
    expect(shallow(<TranslucentOverlay />));
  });

  it ('should have props defined', function() {
    const wrapper = shallow(<TranslucentOverlay />);
  });

  it ('props contains matching properties', function() {
    const wrapper = mount(
      <TranslucentOverlay children={"children"} />
    );
    expect(wrapper.props().children).to.equal('children');
  });

  it ('has a <div> rendered', function() {
    const wrapper = shallow(
      <TranslucentOverlay children={"children"} />
    );
    expect(wrapper.find('div')).to.have.length(1);
  })
});
