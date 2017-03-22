import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import GradCheckerContainer from './GradCheckerContainer.js'
import * as constants from '../common/Constants.js';

export default class PanelRequirements extends React.Component {
  constructor(){
    super();
  }

  render() {
    const items = [
      { name: 'University Level Requirements', isFulfilled: true },
      { name: 'Computer Science Foundation', children:[
        { name: 'CS1010', isFulfilled: false },
        { name: 'CS1020', isFulfilled: false },
        { name: 'CS2010', isFulfilled: false },
        { name: 'CS1231', isFulfilled: false },
        { name: 'CS2100', isFulfilled: false },
        { name: 'CS2103T', isFulfilled: false },
        { name: 'CS2105', isFulfilled: false },
        { name: 'CS2106', isFulfilled: false },
        { name: 'CS3230', isFulfilled: false }
      ]},
      { name: 'Computer Science Breadth and Depth', children: [
        { name: '24 MCs of CS modules', children:[
          { name: 'Satisfy at least one CS Focus Area', isFulfilled: false },
          { name: '8 MCs of Computer Systems Team Project', isFulfilled: false }
        ]},
        { name: 'Industrial Experience Requirement', isFulfilled: false }
      ]},
      { name: 'IT Professionalism', children: [
        { name: 'IS1103/FC/X', isFulfilled: false },
        { name: 'CS2101', isFulfilled: false },
        { name: 'ES2660', isFulfilled: false }
      ]},
      { name: 'Mathematics and Sciences', children: [
        { name: 'MA1301/FC/X', isFulfilled: false },
        { name: 'MA1521', isFulfilled: false },
        { name: 'MA1101R', isFulfilled: false },
        { name: 'EITHER', children: [
          { name: 'ST2334', isFulfilled: false },
          { name: 'ST2131 and ST2132', isFulfilled: false }
        ]},
        { name: 'PC1221/FC/X or PC1222/X', isFulfilled: false },
        { name: 'Science Module', isFulfilled: false }
      ]},
      { name: 'UNRESTRICTED ELECTIVES', isFulfilled: false }
    ];

    // console.log(this.props.activePlannerId);

    return (
      <nav className="side-menu-addl">
        <PanelHeader  title="CS Degree Requirements" icon="font-icon font-icon-page" />
        <GradCheckerContainer activePlannerId={this.props.activePlannerId}/>
        {/* <Nestable items={items} /> */}  
      </nav>
    );
  }
}
