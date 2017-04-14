import React from 'react';

export default class PanelHeader extends React.Component{
  /**
   * This component is used to render the title of each sidebar panels
   */

  render(){
    return(
        <header className="side-menu-addl-title">
          <div className="caption">{this.props.title}</div>
          <i className={this.props.icon}></i>
        </header>
    );
  }
}

PanelHeader.propTypes = {
  title: React.PropTypes.string,
  icon: React.PropTypes.string
}
