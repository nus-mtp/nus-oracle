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
      <li className="dd-grey dd-item">
        <ClickOutHandler onClickOut={this.onClickOut.bind(this)}>
          <tbody>
            <tr onChange={this.updateModuleInput.bind(this)}>
              <td>
                <form className="input-group" style={{width: '100%'}}>
                  <input type="text" className="form-control"
                         value={this.state.moduleCode}/>
                </form>
              </td>
            </tr>
          </tbody>
        </ClickOutHandler>
      </li>
    );
  }
}

Module.propTypes = {

}

/*
// For locking module in afer typing in the name
<div className="dd-handle">
  {this.props.moduleCode}
</div>
 */
