import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import StudyPlanTemplateButton from '../StudyPlanTemplateButton.jsx';

describe('Integrated UI test <StudyPlanTemplateButton />', function() {
  it('renders without any error', () => {
    expect(shallow(<StudyPlanTemplateButton />));
  });

  it ('should have props defined', function() {
    const wrapper = shallow(<StudyPlanTemplateButton />);
    expect(wrapper.props().alignmentClass).to.be.defined;
    expect(wrapper.props().bgColor).to.be.defined;
    expect(wrapper.props().templateTitle).to.be.defined;
    expect(wrapper.props().icon).to.be.defined;
    expect(wrapper.props().onClick).to.be.defined;
  });

  it ('props contains matching properties', function() {
    const wrapper = mount(
      <StudyPlanTemplateButton
        alignmentClass='btn'
        bgColor='#cccccc'
        templateTitle='Computer Security'
        icon={<i>icon</i>}
      />
    );
    expect(wrapper.props().alignmentClass).to.equal('btn');
    expect(wrapper.props().bgColor).to.equal('#cccccc');
    expect(wrapper.props().templateTitle).to.equal('Computer Security');
    expect(wrapper.props().icon.type).to.equal('i');
    expect(wrapper.props().icon.props.children).to.equal('icon');
  });

  it ('has a template title rendered', function() {
    const wrapper = shallow(
      <StudyPlanTemplateButton
        templateTitle='Computer Security' />
    );
    expect(wrapper.find('b')).to.have.length(1);
    expect(wrapper.find('b').text()).to.equal('Computer Security');
  })

  it ('should simulate click event', function() {
    const wrapper = shallow(<StudyPlanTemplateButton onClick={() => {}} />);
    wrapper.find('article > div').simulate('click');
  });
});
