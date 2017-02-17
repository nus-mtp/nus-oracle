import React from 'react';
import Module from './Module';

export default class SemModulesCard extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="card-grid-col">
  				<article className="card-typical">
  					<div className="card-typical-section card-typical-content">
              {Object.keys(this.props.modules).map((moduleName) => {
                return <Module moduleCode={moduleName} />;
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
  modules: React.PropTypes.object
}
