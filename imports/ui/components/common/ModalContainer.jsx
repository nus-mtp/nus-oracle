import React from 'react'
import { Modal } from 'react-bootstrap'

/**
 * Modal window with animations resembling Bootstrap modal windows
 * Animations for the window are applied once this component is mounted.
 */
export default class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.setState({ show: true });
  }

  /**
   * Hides this modal if the disableHide flag is off
   */
  hide() {
    if(!this.props.disableHide){
      this.props.onHidden();
      this.setState({ show: false });
    }
  }

  render() {
    return (
      <Modal dialogClassName="custom-modal"
             show={this.state.show}
             onHide={this.hide.bind(this)}>
        <Modal.Body>
          {this.props.content}
        </Modal.Body>
      </Modal>
    )
  }
}

ModalContainer.propTypes = {
  // Content of this ModalContainer. Can be any JSX element
  content: React.PropTypes.node,

  // Set to true if you want to prevent this Modal from being hidden by
  // the user (e.g. by clicking outside the Modal window), false otherwise.
  disableHide: React.PropTypes.bool,

  // Listener for when user clicks to hide this Modal
  onHidden: React.PropTypes.func
}
