import React from 'react';

/**
 * Generic button React component.
 * Check out the PropTypes below to see how to set your own styles
 */
export default class ProgressSteps extends React.Component {
  render() {
    return (
      <div className="steps-icon-progress" style={{height: '2em'}}>
				<ul style={{marginLeft: '-28.5px', marginRight: '-28.5px'}}>
					<li className="active">
            <div className="icon"></div>
          </li>
					<li>
            <div className="icon"></div>
          </li>
					<li>
            <div className="icon"></div>
          </li>
				</ul>
			</div>
    );
  }
}

ProgressSteps.propTypes = {

}
