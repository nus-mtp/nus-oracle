import React from 'react';
import Module from './Module';
import { getAllModulesInSemester } from '../../../api/crud-controller/semester/methods';

export default class SemModulesCard extends React.Component {
  render() {
    const modules = getAllModulesInSemester(this.props.semesterIndex, this.props.plannerID);
    return (
      <div className="col-md-4">
        <div className="card-grid-col">
  				<article className="card-typical">
  					<div className="card-typical-section card-typical-content">
              {Object.keys(modules).map((moduleName, rank) => {
                return <Module key={rank} moduleCode={moduleName} />;
              })}
  					</div>
  					<div className="card-typical-section">
  						<div className="card-typical-linked">
                {this.props.sem}
              </div>
  					</div>
  				</article>
  			</div>
      </div>
    );
  }
}

SemModulesCard.propTypes = {
  sem: React.PropTypes.string,
  semesterIndex: React.PropTypes.integer,
  plannerID: React.PropTypes.string
}
