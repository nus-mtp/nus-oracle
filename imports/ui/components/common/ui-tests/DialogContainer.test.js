import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import DialogContainer from '../DialogContainer.jsx';

describe('<DialogContainer />', function() {
  it('renders without any error', () => {
    expect(shallow(<DialogContainer />));
  });

  it ('should have props defined', function() {
    const wrapper = shallow(<DialogContainer />);
    expect(wrapper.props().title).to.be.defined;
    expect(wrapper.props().content).to.be.defined;
  });

  it ('props contains matching properties', function() {
    const wrapper = mount(
      <DialogContainer
        title='title'
        content='content'
      />
    );
    expect(wrapper.props().title).to.equal('title');
    expect(wrapper.props().content).to.equal('content');
  });

  it ('has a title rendered', function() {
    const wrapper = mount(
      <DialogContainer
        title='title'
      />
    );
    expect(wrapper.find('h5').text()).to.equal('title');
  })

  it ('has content rendered', function() {
    const wrapper = mount(
      <DialogContainer
        content='content'
      />
    );
    expect(wrapper.find('.box-typical').text()).to.equal('content');
  });
});
