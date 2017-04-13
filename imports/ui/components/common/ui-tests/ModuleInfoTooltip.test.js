import React from 'react';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { mount, shallow } from 'enzyme';
import 'jsdom-global/register'; // Mock load a global HTML doc

import ModuleInfoTooltip from '../ModuleInfoTooltip.jsx';

describe('Integrated UI test <ModuleInfoTooltip />', function() {
  it('renders without any error', () => {
    expect(shallow(<ModuleInfoTooltip module={{}} />));
  });

  it ('should have props defined', function() {
    const wrapper = shallow(<ModuleInfoTooltip module={{}} />);
    expect(wrapper.props().module).to.be.defined;
  });

  it ('props contains matching properties', function() {
    const wrapper = mount(
      <ModuleInfoTooltip module={{ moduleCode: 'CS3283' }} />
    );
    expect(wrapper.props().module.moduleCode).to.equal('CS3283');
  });

  it ('no vertical | quotes rendered if there are no module properties', function() {
    const wrapper = shallow(<ModuleInfoTooltip module={{}} />);
    expect(wrapper.find('.comment-row-item').length).to.equal(0);
  })

  it ('renders the correct academic term', function() {
    const wrapper = shallow(
      <ModuleInfoTooltip
        module={
          {
            moduleCode: 'CS3283',
            termOffered: [
              {
                "termYear": "AY 2014/2015",
                "semester": 1
              }
            ]
          }
        }
      />);

    expect(wrapper.find('.comment-row-item-content').text())
           .to.equal('Terms OfferedAY 2014/2015, Sem 1');
    expect(wrapper.find('.comment-row-item-content').length).to.equal(1);
  });
});
