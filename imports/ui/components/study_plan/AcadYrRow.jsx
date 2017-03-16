import React from 'react';
import SemModulesCardContainer from './SemModulesCardContainer.js';
import SemSpecialModulesCardContainer from './SemSpecialModulesCardContainer.js';
import SemSpecialModulesCard from './SemSpecialModulesCard.jsx';
import Button from '../common/Button.jsx';

import { deleteAcademicYearInPlanner } from '../../../api/crud-controller/semester/methods.js';

export default class AcadYrRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    }
  }

  handleDelAYButtonClick() {
    deleteAcademicYearInPlanner(this.props.plannerID);
  }

  handleMouseEnterDel() {
    this.setState({ isHover: true });
  }

  handleMouseLeaveDel() {
    this.setState({ isHover: false });
  }

  getAcadYrHoverColor() {
    if (this.state.isHover) {
      return 'rgba(254, 64, 64, 0.17)'
    } else {
      return '#ffffff';
    }
  }

  render() {
    return (
      <section className="activity-line-action"
               style={{backgroundColor: this.getAcadYrHoverColor()}}>
        <div className="time">

          {this.props.acadYr}

          {this.props.isLastAcadYr ?
          <Button buttonClass="btn btn-inline btn-danger-outline"
                  style={{position: "relative",
                          fontSize: "0.75em",
                          padding: "0.2em 0.75em 0.2em 0.65em",
                          margin: " 1em 0em 1em 0em"}}
                  buttonText="Delete"
                  buttonIcon={
                    <i className="font-icon font-icon-trash"
                       style={{marginTop: "0.15em", marginRight: "0.5em"}}></i>}
                  onButtonClick={this.handleDelAYButtonClick.bind(this)}
                  onMouseEnter={this.handleMouseEnterDel.bind(this)}
                  onMouseLeave={this.handleMouseLeaveDel.bind(this)} /> :
          null}

        </div>
        <div className="cont">
          <div className="cont-in">
            <SemModulesCardContainer sem="Sem I" semesterIndex={this.props.semesterIndex[0]} plannerID={this.props.plannerID} />
            <SemModulesCardContainer sem="Sem II" semesterIndex={this.props.semesterIndex[1]} plannerID={this.props.plannerID} />
            <div className="col-md-4">
              <SemSpecialModulesCardContainer specialSem="Special Sem I" semesterIndex={this.props.semesterIndex[2]} plannerID={this.props.plannerID}/>
              <SemSpecialModulesCardContainer specialSem="Special Sem II" semesterIndex={this.props.semesterIndex[3]} plannerID={this.props.plannerID}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AcadYrRow.propTypes = {
  semesterIndex: React.PropTypes.array,
  acadYr: React.PropTypes.string,
  plannerID: React.PropTypes.string
}
