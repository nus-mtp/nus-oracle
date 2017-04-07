import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';

import Button from '../Button.jsx';

describe('<Button />', function () {
  it ('should have props for buttonClass', function() {
    const wrapper = shallow(<Button />);
    expect(wrapper.props().buttonClass).to.be.defined;
  });
});

/*
const modCode = 'CS1010S';
const plannerIDs = getPlannerIDsGivenUserID(userID);
const semesterIndex = 0;

const module = m_insertOneModuleInSemester.call({
  semesterIndex: semesterIndex,
  moduleCode: modCode,
  plannerID: plannerIDs[0]
});
assert.equal(module, modCode);
 */
