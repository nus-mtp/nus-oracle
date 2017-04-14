import React from 'react'
import IconButton from './IconButton.jsx'

export default class PanelListItem extends React.Component{
  /**
   * returns the component to be rendered depending on whether the object is being edited
   */
  renderTitle() {
    var isEditing = this.props.isEditing;
    var isEditable = this.props.isEditable;

    if(isEditable)
      return (isEditing) ? this.props.editable : this.props.text;
    else
      return this.props.text;
  }

  render(){
    var isEditing = this.props.isEditing;
    var isEditable = this.props.isEditable;
    var displayColor = "#A0A0A0";
    var onMouseOverColor="#ff9100";

    let icon = <IconButton
                  style={{float: "right"}}
                  icon={this.props.icon}
                  displayColor= {displayColor}
                  onMouseOverColor= {onMouseOverColor}
                  onButtonClick={this.props.iconClick}/>;

    return(
        <li className={this.props.displayType}>
          <a href="#" className={isEditable? "" : "disabled"}
             style={ isEditable ? {cursor: 'pointer',
             marginBottom: '1em'} : {cursor: 'default'}}
             onClick={isEditable ? this.props.handleEditClick : this.props.onClick}>
            <span className="tbl-row">
              <span className="tbl-cell tbl-cell-caption">
                { this.renderTitle() }
                { (isEditable && !isEditing) ? icon : null }
              </span>
            </span>
          </a>
        </li>
    );
  }
}

PanelListItem.propTypes ={
  displayType: React.PropTypes.string,
  isEditable: React.PropTypes.bool,
  isEditing: React.PropTypes.bool,
  icon: React.PropTypes.string,
  iconClick: React.PropTypes.func,
  text: React.PropTypes.string
}
