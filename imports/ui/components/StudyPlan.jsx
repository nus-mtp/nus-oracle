import React from 'react';
import TabbedContainer from './common/TabbedContainer';
import BasicTable from './common/BasicTable';

import AcadYrSection from './study_plan/AcadYrSection';
import AcadYrRow from './study_plan/AcadYrRow';

export default class StudyPlan extends React.Component {
  render() {
    let contentPanelsList = [<AcadYrSection />];

    return (
          <TabbedContainer tabTitleList={["Plan A", "Plan B"]}
                           contentPanelsList={contentPanelsList} />
    );
  }
}
