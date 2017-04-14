import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import PanelHeader from '../PanelHeader.jsx';

describe('<PanelHeader />', function(){
  const minProps = {
    title: 'title',
    icon: 'icon'
  };

  it('renders without exploding', ()=>{
    expect(shallow(<PanelHeader />).length).to.equal(1);
  });

  it('has props with matching properties', ()=>{
      const wrapper = mount(<PanelHeader {...minProps} />);
      expect(wrapper.props()).to.deep.equal(minProps);
  });
})
