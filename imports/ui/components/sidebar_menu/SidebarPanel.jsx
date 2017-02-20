import React from 'react';

export default class SidebarPanel extends React.Component {
constructor(){
  super();

  this.state = {
    isCollapsed: true
  }
}

toggleCollapse() {
  this.setState({isCollapsed: !isCollapsed});
}

render(){
  return(
    <nav className="side-menu-addl">
      <header className="side-menu-addl-title">
        <div className="caption">Filter by Type</div>
        <i className="font-icon font-icon-burger"></i>
      </header>
      <ul className="side-menu-addl-list">
        <li className="header">
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Video</span>
              <span className="tbl-cell tbl-cell-num">16</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Action Required</span>
              <span className="tbl-cell tbl-cell-num">4</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Fund YouTuber</span>
              <span className="tbl-cell tbl-cell-num">1</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Hired & Funded</span>
              <span className="tbl-cell tbl-cell-num">1</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Edit Requested</span>
              <span className="tbl-cell tbl-cell-num">10</span>
            </span>
          </a>
        </li>
        <li className="divider"></li>
        <li className="header">
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Proposals</span>
              <span className="tbl-cell tbl-cell-num">15</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">New</span>
              <span className="tbl-cell tbl-cell-num">4</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Declined</span>
              <span className="tbl-cell tbl-cell-num">10</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Changes Requested</span>
              <span className="tbl-cell tbl-cell-num">1</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Changes Declined</span>
              <span className="tbl-cell tbl-cell-num">2</span>
            </span>
          </a>
        </li>
        <li className="divider"></li>
        <li className="header">
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Approvals</span>
              <span className="tbl-cell tbl-cell-num">15</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Waiting for Approval Long Example</span>
              <span className="tbl-cell tbl-cell-num">4</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Approved / Completed</span>
              <span className="tbl-cell tbl-cell-num">10</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">Video in Dispute</span>
              <span className="tbl-cell tbl-cell-num">11</span>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

}
