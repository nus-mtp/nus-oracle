import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import AcadYrRow from '../AcadYrRow.jsx';

describe('<AcadYrRow />', function() {
  it('renders without any error', () => {
    const wrapper = shallow(
      <AcadYrRow
        semesterIndex={[0, 1, 2, 3]}
        acadYr={"AY 2015/2016"}
        plannerID="12345" />
    );
    expect(wrapper);
  });

  it ('should have props defined', function() {
    const wrapper = shallow(
      <AcadYrRow
        semesterIndex={[0, 1, 2, 3]}
        acadYr={"AY 2015/2016"}
        plannerID="12345" />
    );
    expect(wrapper.props().semesterIndex).to.be.defined;
    expect(wrapper.props().acadYr).to.be.defined;
    expect(wrapper.props().plannerID).to.be.defined;
  });

  it ('acad year is rendered correctly', function() {
    const wrapper = shallow(
      <AcadYrRow
        semesterIndex={[0, 1, 2, 3]}
        acadYr={"AY 2015/2016"}
        plannerID="12345" />
    );
    expect(wrapper.find('.time').text()).to.equal("AY 2015/2016");
  });
});
