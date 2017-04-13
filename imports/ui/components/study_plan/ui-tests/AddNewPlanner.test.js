import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import AddNewPlanner from '../AddNewPlanner.jsx';

describe('Integrated UI test <AddNewPlanner />', function() {
  it('renders without any error', () => {
    const wrapper = shallow(<AddNewPlanner />);
    expect(wrapper);
  });

  it ('should have props defined', function() {
    const wrapper = shallow(
      <AddNewPlanner
        genericCSPlannerName={"programming_languages"}
        genericCSPlannerID={"12345"}
        focusAreaPlannerObjs={
          {
            "programming_languages" : "09876"
          }
        } />
    );
    expect(wrapper.props().genericCSPlannerName).to.be.defined;
    expect(wrapper.props().genericCSPlannerID).to.be.defined;
    expect(wrapper.props().focusAreaPlannerObjs).to.be.defined;
  });

  it ('template titles are rendered correctly', function() {
    const wrapper = shallow(
      <AddNewPlanner
        genericCSPlannerName={"programming_languages"}
        genericCSPlannerID={"12345"}
        focusAreaPlannerObjs={
          {
            "programming_languages" : "09876"
          }
        } />
    );
    expect(wrapper.find('StudyPlanTemplateButton').nodes[0].props.templateTitle).to.equal("Start from scratch!");
    expect(wrapper.find('StudyPlanTemplateButton').nodes[1].props.templateTitle).to.equal("CS Foundation");
    expect(wrapper.find('StudyPlanTemplateButton').nodes[2].props.templateTitle).to.equal("programming_languages");
  });

  it ('number of study plan template buttons is correct', function() {
    const wrapper = shallow(
      <AddNewPlanner
        genericCSPlannerName={"programming_languages"}
        genericCSPlannerID={"12345"}
        focusAreaPlannerObjs={
          {
            "programming_languages" : "09876"
          }
        } />
    );
    expect(wrapper.find('StudyPlanTemplateButton').nodes.length).to.equal(3);
  })
});
