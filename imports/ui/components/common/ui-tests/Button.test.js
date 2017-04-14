import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import Button from '../Button.jsx';

describe('<Button />', function () {
  it('renders without any error', () => {
    expect(shallow(<Button />));
  })

  it ('should have props defined', function() {
    const wrapper = shallow(<Button />);
    expect(wrapper.props().buttonClass).to.be.defined;
    expect(wrapper.props().style).to.be.defined;
    expect(wrapper.props().type).to.be.defined;
    expect(wrapper.props().buttonText).to.be.defined;
    expect(wrapper.props().buttonIcon).to.be.defined;
    expect(wrapper.props().onButtonClick).to.be.defined;
  });

  it ('props contains matching properties', function() {
    const styleColor = '#ffd400';
    const wrapper = mount(
      <Button buttonClass='btn'
              style={{color: styleColor}}
              type="button"
              buttonText="test" />
    );

    expect(wrapper.props().buttonClass).to.equal('btn');
    expect(wrapper.props().style.color).to.equal(styleColor);
    expect(wrapper.props().type).to.equal('button');
    expect(wrapper.props().buttonText).to.equal('test');
  });

  it ('has a <button></button> rendered', function() {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('button')).to.have.length(1);
  })

  it ('should simulate click event', function() {
    const wrapper = mount(<Button onButtonClick={() => {}} />);
    wrapper.find('button').simulate('click');
  });
});
