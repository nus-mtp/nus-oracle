import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import ModalContainer from '../ModalContainer.jsx';

describe('<ModalContainer />', function () {
  beforeEach(() => require('jsdom-global')());

  it('renders without exploding', () => {
    expect(shallow(<ModalContainer />));
  });

  it ('has props defined', function() {
    const wrapper = shallow(<ModalContainer />);
    expect(wrapper.props().content).to.be.defined;
    expect(wrapper.props().onHidden).to.be.defined;
  });
});
