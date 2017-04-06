import React from 'react';

export default class MCsCounter extends React.Component {
  /**
   * Render grad status icon depending on whether the user has met the number
   * of MCs required to graduate
   *
   * @return {Node} React component for displaying MCs graduation status
   */
  renderGradStatusIcon() {
    if (this.props.canGraduate) {
      return (
        <div className="glyphicon glyphicon-ok-sign"
             style={{top: '3px', fontSize: '1.2em', color: '#05c905'}}></div>
      );
    } else {
      return (
        <div className="circle orange"
             style={{marginBottom: '-2px'}}></div>
      );
    }
  }

  /**
   * Render grad status font color depending on whether the user has met the
   * number of MCs required to graduate
   *
   * @return {String} String representation of the hex color if can graduate or not
   */
  getFontColorBasedOnGradStatus() {
    if (this.props.canGraduate) {
      return '#05c905';
    } else {
      return '#fff'
    }
  }

  render() {
    return (
      <div className="chart-legend"
           style={{padding: '5px 0px', margin: '-15px 0px 15px 15px'}}>

        {/* Number of MCs completed out of total number needed to graduate */}
        <div className="percent"
             style={{
               marginLeft: '5px',
               fontSize: '1.5em',
               color: this.getFontColorBasedOnGradStatus(),
             }}>
          {/* Proportion of MCs completed */}
          <div>{this.props.numMCs} / 160</div>

          <div className="caption" style={{color: '#fff'}}>
            {/* Grad Status circle icon on the left side */}
            {this.renderGradStatusIcon()} MCs Completed
          </div>
        </div>

      </div>
    );
  }
}

MCsCounter.propTypes = {
  // Number of MCs
  numMCs: React.PropTypes.string
}
