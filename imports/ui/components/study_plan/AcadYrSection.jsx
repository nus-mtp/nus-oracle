import React from 'react';
import AcadYrRow from './AcadYrRow';

export default class AcadYrSection extends React.Component {
  render() {

    // retrieve size of semesters from here and input into list of acadYrRows

    let listOfAcadYrRows = [<AcadYrRow key='1' semesterIndex={[0, 1]} acadYr="AY14/15" plannerID={this.props.plannerID} />,
                            <AcadYrRow key='2' semesterIndex={[2, 3]} acadYr="AY15/16" plannerID={this.props.plannerID}/>,
                            <AcadYrRow key='3' semesterIndex={[4, 5]} acadYr="AY16/17" plannerID={this.props.plannerID}/>,
                            <AcadYrRow key='4' semesterIndex={[6, 7]} acadYr="AY17/18" plannerID={this.props.plannerID}/>];


    return (
      <article className="activity-line-item box-typical">
        <div className="activity-line-action-list">
          {listOfAcadYrRows.map((acadYrRow) => {
            return acadYrRow;
          })}
        </div>
      </article>
    );
  }
}

AcadYrSection.propTypes = {
  plannerID: React.PropTypes.string,
}
