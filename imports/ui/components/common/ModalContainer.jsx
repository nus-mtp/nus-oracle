import React from 'react'
import { Modal } from 'react-bootstrap'

/**
 * Modal window with animations resembling Bootstrap modal windows
 * Animations for the window are applied once this component is mounted.
 */
export default class ModalContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.setState({ show: true });
  }

  hide() {
    this.props.onHidden();
    this.setState({ show: false });
  }

  render() {
    return (
      <Modal dialogClassName="custom-modal"
             show={this.state.show}
             onHide={this.hide.bind(this)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {this.props.content}
        </Modal.Body>
      </Modal>
    )
  }
}

ModalContainer.propTypes = {
  content: React.PropTypes.node,
  onHiden: React.PropTypes.func
}
