import React from 'react';

export default class SidebarPanelRequirements extends React.Component {
  constructor(){
    super();

    this.state = {
      isCollapsed: true
    }
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  render() {
    var isCollapsed = this.state.isCollapsed;
    var toggleCollapse = this.toggleCollapse.bind(this);
    return (
      <nav className="side-menu-addl">
        <header className="side-menu-addl-title">
          <div className="caption">Degree Requirements</div>
          <i className="font-icon font-icon-page"></i>
        </header>
        <div className="col-md-12">
          <div className="dd" id="nestable">
            <ol className="dd-list">
              <li className="dd-item" data-id="1">
                <div className="dd-handle" style={{height: "auto"}} >University Level Requirements</div>
              </li>
              <li className="dd-item" data-id="2" onClick={toggleCollapse}>

                {/* <ToggleCollapse key="item2"
                                toggleCollapse={this.toggleCollapse.bind(this)}
                                isCollapsed={isCollapsed}/> */}
                <div className="dd-handle" style={{cursor: "default"}}>
                  <i className={"fa fa-caret-"+ (isCollapsed ? "down" : "up")}> </i>
                  Item 2
                </div>
                <ol className="dd-list" style={isCollapsed ? {display: "none"} : {}}>
                  <li className="dd-item" data-id="3">
                    <div className="dd-handle">Item 3</div>
                  </li>
                  <li className="dd-item" data-id="4">
                    <div className="dd-handle">Item 4</div>
                  </li>
                  <li className="dd-item" data-id="5" onClick={toggleCollapse}>
                    {/* <ToggleCollapse key="item5"
                                    toggleCollapse={this.toggleCollapse.bind(this)}
                                    isCollapsed={isCollapsed}/> */}
                    <div className="dd-handle" style={{cursor: "default"}}>
                      <i className={"fa fa-caret-"+ (isCollapsed ? "down" : "up")}></i>
                      Item 5
                    </div>
                    <ol className="dd-list">
                      <li className="dd-item" data-id="6">
                        <div className="dd-handle">Item 6</div>
                      </li>
                      <li className="dd-item" data-id="7">
                        <div className="dd-handle">Item 7</div>
                      </li>
                      <li className="dd-item" data-id="8">
                        <div className="dd-handle">Item 8</div>
                      </li>
                    </ol>
                  </li>
                  <li className="dd-item" data-id="9">
                    <div className="dd-handle">Item 9</div>
                  </li>
                  <li className="dd-item" data-id="10">
                    <div className="dd-handle">Item 10</div>
                  </li>
                </ol>
              </li>
              <li className="dd-item" data-id="11">
                <div className="dd-handle">Item 11</div>
              </li>
              <li className="dd-item" data-id="12">
                <div className="dd-handle">Item 12</div>
              </li>
            </ol>
          </div>
        </div>
      </nav>
    );
  }
}

class ToggleCollapse extends SidebarPanelRequirements{
  render(){
    var isCollapsed = this.state.isCollapsed;
    var toggleCollapse = this.props.toggleCollapse;
    isCollapsed ? console.log("child: yes") : console.log("child: no");

    return(
      <button data-action={isCollapsed ? "expand" : "collapse"} type="button" onClick={toggleCollapse} className="">Toggle</button>
    );
  }
}
