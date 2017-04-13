import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import ModulesCard from '../ModulesCard.jsx';

describe('<ModulesCard />', function() {
  it('renders without any error', () => {
    const wrapper = shallow(<ModulesCard />);
    expect(wrapper);
  });

  it ('should have props defined', function() {
    const wrapper = shallow(
      <ModulesCard
        sem={""}
        modules={[{
          moduleCode: "CS1010"
        }]}
        cardStyle={{ color: "#cccccc" }}
        header={"header"}
        footer={"footer"}
      />
    );
    expect(wrapper.props().modules).to.be.defined;
    expect(wrapper.props().cardStyle).to.be.defined;
    expect(wrapper.props().header).to.be.defined;
    expect(wrapper.props().footer).to.be.defined;
  });

  it ('elements are rendered correctly', function() {
    const wrapper = shallow(
      <ModulesCard
        sem={""}
        modules={[{
          moduleCode: "CS1010"
        }]}
        cardStyle={{ color: "#cccccc" }}
        header={"header"}
        footer={"footer"}
      />
    );
    expect(wrapper.find('article').text()).to.equal("header<Module /><SearchBar />footer");
  });

  it ('elements are rendered correctly', function() {
    const wrapper = shallow(
      <ModulesCard
        sem={""}
        modules={[{
          moduleCode: "CS1010"
        }]}
        cardStyle={{ color: "#cccccc" }}
        header={"header"}
        footer={"footer"}
      />
    );
    expect(wrapper.find("article").node.props.style.color).to.equal("#cccccc");
  });
});
