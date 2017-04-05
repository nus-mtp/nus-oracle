import React from 'react';
import Button from '../common/Button.jsx';
import SemModulesCardContainer from './SemModulesCardContainer.js';

import { duplicatePlanner } from './../../../api/crud-controller/planner/methods.js';

export default class AddNewPlanner extends React.Component {
  render() {
    return (
      <div className="add-customers-screen tbl">
        <div className="add-customers-screen-in">
          <h2>
            Create a new Study Plan
          </h2>
          <p className="lead color-blue-grey-lighter">
            Choose your template
          </p>
          <button type="button" className="btn-square-icon" onClick={this.props.handleAddBlankTemplate}>
            <i className="fa fa-file-o"></i>
            Blank Study Plan
          </button>
          <button type="button" className="btn-square-icon">
            <i className="fa fa-file-text-o"></i>
            CS Template
          </button>
          <button type="button" className="btn-square-icon">
            <i className="fa fa-file-code-o"></i>
            Focus Areas
            <span className="label label-pill label-info">12</span>
          </button>
        </div>
      </div>
    );
  }
}
