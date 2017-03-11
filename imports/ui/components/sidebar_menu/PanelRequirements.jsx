import React from 'react';
import PanelHeader from '../common/PanelHeader.jsx'
import Nestable from '../common/Nestable.jsx'
import * as constants from '../common/Constants.js';

export default class PanelRequirements extends React.Component {
  constructor(){
    super();
  }

  render() {
    const items = [
      { name: 'Open me 1', children: [
        { name: 'Open me 2', children: [
          { name: 'Open me 3', children: [
            { name: 'Open me 4', children: [
              { name: 'Open me 5', children: [
                { name: 'Open me 6', children: [
                  { name: 'Open me 7', children: [
                    { name: 'Open me 8', children: [
                      { name: 'Open me 9', children: [
                        { name: 'Open me 10', children: [
                          { name: 'Open me 11', children: [
                            { name: 'Open me 12', children: [
                              { name: 'Open me 13', children: [
                                { name: 'Open me 14', children: [
                                  { name: 'Open me 15', children: [
                                    { name: 'Open me 16', children: [
                                      { name: 'Open me 17', children: [
                                        { name: 'Open me 18', children: [
                                          { name: 'Open me 19', children: [
                                            { name: 'Open me 20', children: [
                                              { name: 'Hi' }
                                            ]}
                                          ]}
                                        ]}
                                      ]}
                                    ]}
                                  ]}
                                ]}
                              ]}
                            ]}
                          ]}
                        ]}
                      ]}
                    ]}
                  ]}
                ]}
              ]}
            ]}
          ]}
        ]}
      ]},
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
        <PanelHeader  title="CS Degree Requirements" icon="font-icon font-icon-page" />
        <Nestable items={items} />
      </nav>
    );
  }
}
