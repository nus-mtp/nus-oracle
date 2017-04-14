import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import Nestable from '../Nestable.jsx';
import Item from '../Nestable.jsx';
import ListItem from '../Nestable.jsx';
import OrderedList from '../Nestable.jsx';

describe('<Nestable />', function() {
  it('renders without exploding', () => {
    expect(shallow(<Nestable />).length).to.equal(1);
  });

  it('should have props defined', () => {
    const nestable_wrapper = shallow(<Nestable />);
    expect(nestable_wrapper.props().items).to.be.defined;
  });

  it ('has props containing matching properties', function() {
    var list = [1,2,3];
    const wrapper = mount(
      <Nestable
        items={list}
      />
    );
    expect(wrapper.props().items).to.equal(list);
  });

  it ('renders supplied list object correctly', function() {
    const items = [ { name: "parent 1", isFulfilled : true, isCollapsed : false, children: [{ name: "child 1", isFulfilled : true}]}, { name: "parent 2", isFulfilled : false} ];
    const wrapper = mount(
      <Nestable
        items={items}
      />
    );
    expect(wrapper.find('OrderedList').nodes[0].props.items).to.equal(items);
    expect(wrapper.find('ListItem').props().listName).to.equal("parent 1");
    expect(wrapper.find('ListItem').props().isFulfilled).to.equal(true);
    expect(wrapper.find('Item').nodes[0].props.itemName).to.equal("child 1");
    expect(wrapper.find('Item').nodes[0].props.isFulfilled).to.equal(true);
    expect(wrapper.find('Item').nodes[1].props.itemName).to.equal("parent 2");
    expect(wrapper.find('Item').nodes[1].props.isFulfilled).to.equal(false);
  })
});

describe('<Item />', function() {
  it('renders without exploding', () => {
    expect(shallow(<Item />));
  });

  it('should have props defined', () => {
    const item_wrapper = shallow(<Item />);
    expect(item_wrapper.props().isFulfilled).to.be.defined;
    expect(item_wrapper.props().itemName).to.be.defined;
  });

  it ('has props containing matching properties', function() {
    const wrapper = mount(
      <Item
        itemName='item name'
        isFulfilled={true}
      />
    );
    expect(wrapper.props().itemName).to.equal('item name');
    expect(wrapper.props().isFulfilled).to.equal(true);
  });
});

describe('<ListItem />', function() {
  it('renders without exploding', () => {
    expect(shallow(<ListItem />));
  });

  it('should have props defined', () => {
    const item_wrapper = shallow(<ListItem />);
    expect(item_wrapper.props().isFulfilled).to.be.defined;
    expect(item_wrapper.props().itemName).to.be.defined;
  });

  it ('has props containing matching properties', function() {
    const wrapper = mount(
      <ListItem
        listName='name'
        isFulfilled={true}
      />
    );
    expect(wrapper.props().listName).to.equal('name');
    expect(wrapper.props().isFulfilled).to.equal(true);
  });
});

describe('<OrderedList />', function() {
  it('renders without exploding', () => {
    expect(shallow(<OrderedList />));
  });

  it('should have props defined', () => {
    const item_wrapper = shallow(<OrderedList />);
    expect(item_wrapper.props().isFulfilled).to.be.defined;
    expect(item_wrapper.props().itemName).to.be.defined;
  });
});
