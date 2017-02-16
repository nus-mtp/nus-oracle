import React from 'react';
import ClickOutHandler from 'react-onclickout';
import Autosuggest from 'react-autosuggest';

import Module from './Module'

export default class SemModulesCard extends React.Component {
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
    // console.log executes 7 or 8 times and not only once because each input
    // field is not given a unique key. React identifies unique objects this way.
    // this.props.handleAddModule(this.state.moduleCode);
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card-grid-col">
  				<article className="card-typical">
  					<div className="card-typical-section card-typical-content">
              <table>
                <tbody>
                  <tr onChange={this.updateModuleInput.bind(this)}>
                    <td>
                      <ClickOutHandler onClickOut={this.onClickOut.bind(this)}>
                        <form className="input-group" style={{width: '100%'}}>
                          <input type="text" className="form-control"
                                 value={this.state.moduleCode}/>
                        </form>
                      </ClickOutHandler>
                    </td>
                  </tr>
                </tbody>
              </table>
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
  sem: React.PropTypes.string
}

/*
// Autosuggestion react component example:
// https://github.com/moroshko/react-autosuggest
<Autosuggest
  suggestions={suggestions}
  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
  getSuggestionValue={getSuggestionValue}
  renderSuggestion={renderSuggestion}
  inputProps={inputProps}
/>
 */

/*
// Hardcoded modules - I'll put these aside first.
<Module moduleCode="CS1010" />
<Module moduleCode="CS1020" />
<Module moduleCode="MA1521" />
<Module moduleCode="MA1101R" />
<Module moduleCode="IS1103" />
 */
