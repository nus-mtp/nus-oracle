import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import PanelListItem from '../PanelListItem.jsx';

describe('<PanelListItem />', function(){
  const minProps={
    displayType: 'displayType',
    isEditable: true,
    isEditing: false,
    icon: 'icon',
    iconClick: ()=>{},
    text: 'text'
  }

  it('renders without exploding', ()=>{
      expect(shallow(<PanelListItem />).length).to.equal(1);
  });

  it('has props with matching properties', ()=>{
      const wrapper = mount(<PanelListItem {...minProps} />);
      expect(wrapper.props()).to.deep.equal(minProps);
  });

  it('is not clickable if not editable', ()=>{
    var count = 0;
    var handleClick = function(){
      count = 1;
    }
    const wrapper = shallow(<PanelListItem {...minProps} isEditable = {false} handleEditClick={handleClick}/>);
    wrapper.find('a').simulate('click');
    expect(count).to.equal(0);
  });

  it('renders different component when editable', ()=>{
    const wrapper = shallow(<PanelListItem {...minProps} isEditable = {false}/>);
    expect(wrapper.find('.disabled').length).to.equal(1);
  });
});
