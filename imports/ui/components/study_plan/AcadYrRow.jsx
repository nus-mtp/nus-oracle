import React from 'react';
import SemModulesCardContainer from './SemModulesCardContainer.js';
import SemSpecialModulesCardContainer from './SemSpecialModulesCardContainer.js';

export default class AcadYrRow extends React.Component {
  render() {
    return (
      <section className="activity-line-action">
        <div className="time">
            {this.props.acadYr}
        </div>
        <div className="cont">
          <div className="cont-in">
            <SemModulesCardContainer sem="Sem I" semesterIndex={this.props.semesterIndex[0]} plannerID={this.props.plannerID} />
            <SemModulesCardContainer sem="Sem II" semesterIndex={this.props.semesterIndex[1]} plannerID={this.props.plannerID} />
            <div className="col-md-4">
              <SemSpecialModulesCardContainer specialSem="Special Sem I" semesterIndex={this.props.semesterIndex[2]} plannerID={this.props.plannerID}/>
              <SemSpecialModulesCardContainer specialSem="Special Sem II" semesterIndex={this.props.semesterIndex[3]} plannerID={this.props.plannerID}/>
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
