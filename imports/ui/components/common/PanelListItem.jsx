import React from 'react'

export default class PanelListItem extends React.Component{
  render(){
    return(
        <li className={this.props.type}>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">{this.props.text}</span>
            </span>
          </a>
        </li>
    );
  }
}
