import React from 'react';
import AcadYrRow from './AcadYrRow';

export default class AcadYrSection extends React.Component {
  render() {
    let acadYears = ["Y1 AY14/15", "Y2 AY15/16", "Y3 AY16/17", "Y4 AY17/18"];

    return (
      <article className="activity-line-item box-typical">
        <div className="activity-line-action-list">
          {acadYears.map((year) => {
            return <AcadYrRow key={year} acadYr={year} />
          })}
        </div>
      </article>
    );
  }
}

AcadYrSection.propTypes = {

}
