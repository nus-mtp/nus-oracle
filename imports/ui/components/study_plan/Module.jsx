import React from 'react';
import ClickOutHandler from 'react-onclickout'

export default class Module extends React.Component {
  constructor() {
    super();

    this.state = {
      moduleCode: ""
    }
  }

  updateModuleInput(event) {
    this.setState({
      moduleCode: event.target.value
    });
  }

  onClickOut() {
    console.log("Clicked outside!");
    // this.props.handleAddModule(this.state.moduleCode);
  }

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

/*
// For locking module in afer typing in the name
<div className="dd-handle">
  {this.props.moduleCode}
</div>
 */
