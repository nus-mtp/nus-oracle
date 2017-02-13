import React from 'react';

export default class Module extends React.Component {
  render() {
    return (
      <li className="dd-grey dd-item" data-id="1">
      	<div className="dd-handle">
          {this.props.moduleCode}
        </div>
      </li>
    );
  }
}

Module.propTypes = {
  moduleCode: React.PropTypes.node
}
