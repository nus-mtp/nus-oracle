import React from 'react';
import SemModulesCard from './SemModulesCard';
import SemSpecialModulesCard from './SemSpecialModulesCard';

export default class AcadYrRow extends React.Component {
  render() {
    return (
      <section className="activity-line-action">
        <div className="time">
            {this.props.acadYr}
        </div>
        <div className="cont">
          <div className="cont-in">
            <SemModulesCard sem="Sem I" semesterIndex={this.props.semesterIndex[0]} plannerID={this.props.plannerID} />
            <SemModulesCard sem="Sem II" semesterIndex={this.props.semesterIndex[1]} plannerID={this.props.plannerID} />
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
  semesterIndex: React.PropTypes.array,
  acadYr: React.PropTypes.string,
  plannerID: React.PropTypes.string
}
