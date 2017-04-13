import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import IconButton from '../IconButton.jsx';

describe('<IconButton />', function() {
  it('renders without any error', () => {
    expect(shallow(<IconButton />));
  });

  it ('should have props defined', function() {
    const wrapper = shallow(<IconButton />);
    expect(wrapper.props().style).to.be.defined;
    expect(wrapper.props().icon).to.be.defined;
    expect(wrapper.props().displayColor).to.be.defined;
    expect(wrapper.props().onMouseOverColor).to.be.defined;
    expect(wrapper.props().onButtonClick).to.be.defined;
  });

  it ('props contains matching properties', function() {
    const styleColor = '#ffd400';
    const styleMouseoverColor = '#ff0000';
    const wrapper = mount(
      <IconButton
        icon='btn'
        style={{padding: '5px'}}
        displayColor={styleColor}
        onMouseOverColor={styleMouseoverColor} />
    );

    expect(wrapper.props().icon).to.equal('btn');
    expect(wrapper.props().style.padding).to.equal('5px');
    expect(wrapper.props().displayColor).to.equal(styleColor);
    expect(wrapper.props().onMouseOverColor).to.equal(styleMouseoverColor);
  });

  it ('has a <button></button> rendered', function() {
    const wrapper = shallow(<IconButton />);
    expect(wrapper.find('i')).to.have.length(1);
  })

  it ('should simulate click event', function() {
    const wrapper = mount(<IconButton onButtonClick={() => {}} />);
    wrapper.find('i').simulate('click');
  });
});
