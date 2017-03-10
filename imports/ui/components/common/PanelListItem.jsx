import React from 'react'
import IconButton from './IconButton.jsx'

export default class PanelListItem extends React.Component{
  constructor(){
    super();
    this.state = {
      isEditing: false
    }

  }

  text() {
    var isEditing = this.state.isEditing;
    var isEditable = this.props.isEditable;

    if(isEditable)
      return (isEditing) ? this.props.editable : this.props.text;
    else
      return this.props.text;
  }
  render(){
    var isEditing = this.state.isEditing;
    var isEditable = this.props.isEditable;
    return(
        <li className={this.props.type}>
          <a href="#">
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">
                {this.text()}
                <i  className={"editIcon " + ((isEditable) ? (isEditing)? "fa fa-save" : "fa fa-pencil" : "")}
                    onClick={()=>{this.setState({ isEditing: !isEditing })}}
                    style={{float: 'right'}}
                >
                </i>
              </span>
            </span>
          </a>
        </li>
    );
  }
}

PanelListItem.propTypes ={
  isEditable: React.PropTypes.bool
}
