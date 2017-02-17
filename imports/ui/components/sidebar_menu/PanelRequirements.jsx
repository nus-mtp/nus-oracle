import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'

export default class PanelRequirements extends React.Component {
  constructor(){
    super();
  }

  render() {
    const items = [
      { name: 'University Level Requirements' },
      { name: 'Computer Science Foundation', children:[
        { name: 'CS1010' },
        { name: 'CS1020' },
        { name: 'CS2010' },
        { name: 'CS1231' },
        { name: 'CS2100' },
        { name: 'CS2103T' },
        { name: 'CS2105' },
        { name: 'CS2106' },
        { name: 'CS3230' }
      ]},
      { name: 'Computer Science Breadth and Depth', children: [
        { name: '24 MCs of CS modules', children:[
          { name: 'Satisfy at least one CS Focus Area'},
          { name: '8 MCs of Computer Systems Team Project'}
        ]},
        { name: 'Industrial Experience Requirement'}
      ]},
      { name: 'IT Professionalism', children: [
        { name: 'IS1103/FC/X'},
        { name: 'CS2101'},
        { name: 'ES2660'}
      ]},
      { name: 'Mathematics and Sciences', children: [
        { name: 'MA1301/FC/X'},
        { name: 'MA1521'},
        { name: 'MA1101R'},
        { name: 'EITHER', children: [
          { name: 'ST2334'},
          { name: 'ST2131 and ST2132'}
        ]},
        { name: 'PC1221/FC/X or PC1222/X'},
        { name: 'Science Module'}
      ]},
      { name: 'UNRESTRICTED ELECTIVES'}
    ];

    return (
      <nav className="side-menu-addl">
        <PanelHeader  title="Degree Requirements" icon="font-icon font-icon-page" />
        <Nestable items={items} />
      </nav>
    );
  }
}
