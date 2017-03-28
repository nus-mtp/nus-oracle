import React from 'react';

// Import React components
import ReactTooltip from 'react-tooltip';

export default class ModuleInfoTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  //===========================================================
  // RENDERING COMPUTATION FUNCTIONS
  //===========================================================
  /**
   * Computes the semester text label from a semester index.
   * Semester: Sem 1 or 2, Special Semester: Sem 3 or 4
   *
   * @param {[int]} sem  Semester index
   *
   * @return {[String]} Text that represents this semester
   */
  computeSemType(sem) {
    if (sem === 1 || sem === 2) {
      return "Sem";
    } else {
      return "Special sem";
    }
  }

  /**
   * Flattens duplicate academic years in a module object's termOffered
   * field for easy rendering as it contains terms in this JSON format:
   *
   * "termOffered": [
     {
       "termYear": "AY 2014/2015",
       "semester": 1
     }, {
       "termYear": "AY 2014/2015",
       "semester": 2
     }
   ]
   * @param {[array]} terms List of terms (AY and Sem) this module was offered
   *
   * @return {[array]} List of AY and Sem display objects
   */
  flattenTermYears(terms) {
    let result = [];
    let sem = 1;
    let nextSem = 1;
    for (let i = 0; i < terms.length; i++) {
      if (i+1 !== terms.length && terms[i].termYear === terms[i+1].termYear) {
        // If we've not reached the end of the list and consecutive years are the same
        sem = terms[i].semester;
        nextSem = terms[i+1].semester;
        result.push({
          "displayAY": terms[i].termYear,
          "displaySems": this.computeSemType(sem) + " " + sem + " & " + nextSem
        })
        ++i;
      }
    }
    return result;
  }

  //===========================================================
  // RENDER METHODS
  //===========================================================
  /**
   * Renders the list of years and sems a module was offered
   *
   * @param {[array]} terms List of terms (AY and Sem) this module was offered
   *
   * @return {[node]} Unordered list of AYs and Sems
   */
  renderTermYearAndSem(terms) {
    return(
      <ul>
        {this.flattenTermYears(terms).map((term, index) => {
          return(
            <li key={index}>
              {term.displayAY}, {term.displaySems}
            </li>
          );
        })}
      </ul>
    );
  }

  /**
   * Renders the section of the tooltip with the left vertical bar
   *
   * @param {[string]} title Title of this section
   * @param {[node]} content Any other node to mount into this section
   *
   * @return {[node]} React node of section of tooltip with the left vertical bar
   */
  renderVerticalQuote(title, content) {
    return(
      <div className="comment-row-item quote"
           style={{width: '100%', padding: '0.25em 0.2em 0.25em 0.5em', marginBottom: '0.5em'}}>
        <div className="comment-row-item-content" style={{padding: '0'}}>
          <p style={{fontSize: '1.1em'}}>
            <strong>{title}</strong>
          </p>
          {content}
        </div>
      </div>
    );
  }

  render() {
    let module = this.props.module

    return (
      <ReactTooltip id={module.moduleCode} place="bottom" effect="solid">
        <div style={{width: '34em'}}>

          {/* Title of the tooltip */}
          <div className="tbl-cell"
               style={{width: '7em', color: '#f2aa4c', fontSize: '1.2em', paddingRight: '1em'}}>

            {/* Title text */}
            <div className="tbl-row">
              <strong>{module.moduleCode}</strong>
            </div>
            <div className="tbl-row">
              {module.moduleName}
            </div>

            {/* MCs tag at top right hand corner of tooltip */}
            <div className="tbl-row">
              <span className="label label-warning"
                    style={{fontSize: '0.75em', float: 'left', marginTop: '1em'}}>
                4 MCs
              </span>
            </div>
          </div>

          {/* Module prerequisites and preclusions sections */}
          <div className="tbl-cell" style={{width: '25em'}}>
            {module.modulePrerequisite ?
              this.renderVerticalQuote("Prerequisites", module.modulePrerequisite) :
              null}
            {module.modulePreclusion ?
              this.renderVerticalQuote("Preclusions", module.modulePreclusion) :
              null}
            {module.termOffered ?
              this.renderVerticalQuote(
                "Terms Offered", this.renderTermYearAndSem(module.termOffered)) :
              null}
          </div>
        </div>
      </ReactTooltip>
    );
  }
}
