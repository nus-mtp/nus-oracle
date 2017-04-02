import React from 'react';

/**
 * Class that implements the error box that appears during input validation
 */
export default class FormInputErrorBox extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Renders an unordered list of error messages depending on the content and
   * order of error messages passed into this component
   *
   * @param {[Array]} errorMsgList Array of error messages to render
   * @returns {Node} <li></li> components of rendered error messages
   */
  renderErrorList(errorMsgList) {
    return (
      <ul>
        {errorMsgList.map((errorMsg, index) => {
          return (
            <li key={index}>
              {errorMsg}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div className="form-error-text-block" style={{textAlign: 'left'}}>
        <h5 style={{marginBottom: '0.3em'}}>
          { this.props.title }
        </h5>
        { this.renderErrorList(this.props.errorMsgList) }
      </div>
    )
  }
}

FormInputErrorBox.propTypes = {
  // An Array of error messages that will be passed into this component.
  // It will render each one of these messages in the order that they're
  // passed in and make no assumptions.
  errorMsgList: React.PropTypes.array,

  // Optional String header of this FormInputErrorBox
  title: React.PropTypes.string,
}

FormInputErrorBox.defaultProps = {
  errorMsgList: [],
  title: "",
}
