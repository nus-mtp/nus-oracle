import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import FormInputErrorBox from '../FormInputErrorBox.jsx';

describe('<FormInputErrorBox />', function () {
  it('renders without any error', () => {
    expect(shallow(<FormInputErrorBox />));
  })

  it ('should have default props defined', function() {
    const wrapper = mount(
      <FormInputErrorBox
        errorMsgList={['error1', 'error2']}
        title={"title"} />
    );
    expect(wrapper.props().errorMsgList).to.be.defined;
    expect(wrapper.props().title).to.be.defined;
  });

  it ('title is rendered correctly', function() {
    const wrapper = mount(
      <FormInputErrorBox
        errorMsgList={['error1', 'error2']}
        title={"title"} />
    );
    expect(wrapper.find('h5').text()).to.equal('title');
  });

  it ('error messages are rendered correctly', function() {
    const wrapper = mount(
      <FormInputErrorBox
        errorMsgList={['error1', 'error2']}
        title={"title"} />
    );
    expect(wrapper.find('li').length).to.equal(2);
    expect(wrapper.find('.form-error-text-block').text()).to.equal("titleerror1error2");
  });
});
