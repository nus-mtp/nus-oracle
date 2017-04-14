import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import Module from '../Module.jsx';

describe('Integrated UI test <Module />', function() {
  it('renders without any error', () => {
    expect(shallow(<Module module={{}} />));
  });

  it ('should have props defined', function() {
    const wrapper = shallow(<Module module={{}} />);
    expect(wrapper.props().module).to.be.defined;
    expect(wrapper.props().handleDeleteModule).to.be.defined;
  });

  it ('props contains matching properties', function() {
    const wrapper = mount(
      <Module module={{ moduleCode: 'CS3283' }} />
    );

    expect(wrapper.props().module.moduleCode).to.equal('CS3283');
  });

  it ('has an <IconButton /> within it rendered', function() {
    const wrapper = shallow(<Module module={{}} />);
    wrapper.setState({ onMouseOver: true });
    expect(wrapper.find('IconButton')).to.have.length(1);
  })

  it ('should simulate click event onHover', function() {
    const wrapper = mount(<Module module={{}} handleDeleteModule={() => {}} />);
    wrapper.setState({ onMouseOver: true });
    wrapper.find('i').simulate('click');
  });
});
