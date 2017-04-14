import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import FormInput from '../FormInput.jsx';

describe('<FormInput />', function () {
  it('renders without any error', () => {
    expect(shallow(<FormInput />));
  })

  it ('should have default props defined', function() {
    const wrapper = shallow(<FormInput />);
    expect(wrapper.props().className).to.be.defined;
    expect(wrapper.props().style).to.be.defined;
    expect(wrapper.props().type).to.be.defined;
    expect(wrapper.props().placeholder).to.be.defined;
    expect(wrapper.props().onChange).to.be.defined;
  });

  it ('props contains matching properties', function() {
    const wrapper = mount(
      <FormInput
        className='btn'
        style={{padding: '5px'}}
        type={"submit"}
        placeholder={'placeholder'} />
    );

    expect(wrapper.props().className).to.equal('btn');
    expect(wrapper.props().style.padding).to.equal('5px');
    expect(wrapper.props().type).equal("submit");
    expect(wrapper.props().placeholder).to.equal('placeholder');
  });

  it ('has a <input></input> rendered', function() {
    const wrapper = shallow(<FormInput />);
    expect(wrapper.find('input')).to.have.length(1);
  })

  it ('should simulate onChange event', function() {
    const wrapper = mount(<FormInput onChange={() => {}} />);
    wrapper.find('input').simulate('change');
  });
});
