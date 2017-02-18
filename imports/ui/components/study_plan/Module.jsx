import React from 'react';

export default class Module extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <li className="dd-grey dd-item">
        <div className="dd-handle" style={{cursor: 'pointer'}}>
          {this.props.moduleCode}
        </div>
      </li>
    );
  }
}

Module.propTypes = {
  moduleCode: React.PropTypes.string
}
