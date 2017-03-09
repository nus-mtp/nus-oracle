import React from 'react';

/**
 * Generic dialog text container that fits any other React component. This
 * class wraps nicely inside any responsive div.
 */
export default class DialogContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      onMouseOver: false
    }
  }

  handleClick() {
    this.props.onButtonClick();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="box-typical box-typical-padding"
             style={{textAlign: 'center'}}>

          <h5 className="m-t-lg">
            <strong>{this.props.title}</strong>
          </h5>

          {this.props.content}

        </div>
      </div>
    );
  }
}

DialogContainer.propTypes = {
  /* Title of this dialog */
  title: React.PropTypes.string,

  /* Custom dialog content */
  // Content of this warning dialog which can be anything, e.g. buttons, icons.
  content: React.PropTypes.node,
}
