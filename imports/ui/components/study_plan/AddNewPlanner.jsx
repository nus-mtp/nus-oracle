import React from 'react';
import Button from '../common/Button.jsx';
import SemModulesCardContainer from './SemModulesCardContainer.js';

import { deleteAcademicYearInPlanner } from '../../../api/crud-controller/semester/methods.js';

export default class AddNewPlanner extends React.Component {

  constructor(props) {
    super(props);
    this.handleWidth = 100;
    this.state = { height: '0px' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight - 20 });
  }

  render() {
    return (
      <div className="add-customers-screen tbl" style={{height: (this.props.isFullscreen ? this.state.height : 'auto')}}>
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
AddNewPlanner.propTypes = {
 height: React.PropTypes.string,
 isFullscreen: React.PropTypes.bool
};

AddNewPlanner.defaultProps = {
 height:'400px'
};
