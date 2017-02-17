import React from 'react';
import SemModulesCard from './SemModulesCard';
import SemSpecialModulesCard from './SemSpecialModulesCard';

import Util from '../../../../api/util';

export default class AcadYrRow extends React.Component {
  render() {
    return (
      <section className="activity-line-action">
        <div className="time">
            {this.props.acadYr}
        </div>
        <div className="cont">
          <div className="cont-in">
            <SemModulesCard sem="Sem I" />
            <SemModulesCard sem="Sem II" />
            <div className="col-md-4">
              <SemSpecialModulesCard specialSem="Special Sem I" />
              <SemSpecialModulesCard specialSem="Special Sem II" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AcadYrRow.propTypes = {
  acadYr: React.PropTypes.string
}
