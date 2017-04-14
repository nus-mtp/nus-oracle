import React from 'react'

/**
 * Class that implements each form input field, e.g. for Usernames or
 * Passwords
 */
export default class FormInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    }
  }

  /**
   * Handles the event when the user changes the value of the input field
   *
   * @param {Object} event    Event object collected
   */
  handleChange(event) {
    if (event) {
      this.setState({ value: event.target.value });
      this.props.onChange(event.target.value);
    }
  }

  render() {
    return(
      <div className="form-group">
        <input className={this.props.className}
               style={this.props.style}
               type={this.props.type}
               value={this.state.value}
               placeholder={this.props.placeholder}
               onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

FormInput.propTypes = {
  // String representation of the form input's CSS class
  className: React.PropTypes.string,

  // Object representation of CSS, e.g. you can pass in something like
  // { float:'right', paddingTop: '0.15em' } as a style
  style: React.PropTypes.object,

  // Type of this <input />, e.g. "text" or "password"
  type: React.PropTypes.string,

  // Placeholder in this <input />. A good way to indicate what this
  // input field is meant for.
  placeholder: React.PropTypes.string,

  // Handler in the event that the value of this input field changes
  onChange: React.PropTypes.func
}

FormInput.defaultProps = {
  className: "form-control",
  style: {},
  type: "text",
  placeholder: "Placeholder Text",
  onChange: () => {},
}
