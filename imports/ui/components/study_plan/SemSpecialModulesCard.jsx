import React from 'react';
import Module from './Module'

export default class SemSpecialModulesCard extends React.Component {
  render() {
    return (
      <div className="card-grid-col">
				<article className="card-typical">
					<div className="card-typical-section card-typical-content">
            <Module moduleCode="BT1101" />
					</div>
					<div className="card-typical-section">
						<div className="card-typical-linked">
              {this.props.specialSem}
            </div>
					</div>
				</article>
			</div>
    );
  }
}

SemSpecialModulesCard.propTypes = {
  specialSem: React.PropTypes.string
}
