import React from 'react';
import ModulesCardContainer from './ModulesCardContainer.js';

export default class ExemptedModules extends React.Component {
  render() {
    return (
      <section className="activity-line-action">
        <div className="time">
            {this.props.acadYr}
        </div>
        <div className="cont">
          <div className="cont-in">
            <ModulesCardContainer sem="Sem I" semesterIndex={this.props.semesterIndex[0]} plannerID={this.props.plannerID} />
            <ModulesCardContainer sem="Sem II" semesterIndex={this.props.semesterIndex[1]} plannerID={this.props.plannerID} />
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
