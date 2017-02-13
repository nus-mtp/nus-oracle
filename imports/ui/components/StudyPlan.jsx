import React from 'react';
import TabbedContainer from './common/TabbedContainer';
import BasicTable from './common/BasicTable';

export default class StudyPlan extends React.Component {
  render() {
    var contentPanelsList = [<BasicTable />, <BasicTable />];

    return (
          <TabbedContainer tabTitleList={["Plan A", "Plan B"]}
                           contentPanelsList={contentPanelsList}/>
    );
  }
}
