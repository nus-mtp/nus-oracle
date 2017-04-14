import React from 'react';

/**
 * Generic button React component.
 * Check out the PropTypes below to see how to set your own styles
 */
export default class TranslucentOverlay extends React.Component {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          margin: '-15px -15px -15px',
          height: '100%',
          width: '100%',
          zIndex: '10',
        }}>
        {this.props.children}
      </div>
    );
  }
}

TranslucentOverlay.propTypes = {
  // Any renderable React component(s)
  children: React.PropTypes.node
}
