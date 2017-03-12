import React from 'react';
import InlineEdit from 'react-edit-inline';
import PanelListItem from '../common/PanelListItem.jsx';
import Select from 'react-select';


export default class ProfileDetails extends React.Component{
  constructor(){
    super();

    this.state = {isEditing: false};
  }

  handleEditClick(){
    this.setState({isEditing: true});
  }

  handleCancelEdit(){
    this.setState({isEditing: false});
  }

  handleOnChange(data){
    this.setState({isEditing: false});
    this.props.onChange(data);
  }


  render(){
        info = this.props.info;
        text = this.props.text;
        editable = <Select  placeholder={info}
                            multi={false} clearable={false} searchable={false}
                            options={this.props.options} value={info}
                            onChange={this.handleOnChange.bind(this)}
                            autofocus={true}
                            onBlur={this.handleCancelEdit.bind(this)}/>
       return(<PanelListItem  text={text}
                              isEditable={true}
                              isEditing={this.state.isEditing}
                              editable={editable}
                              displayType={this.props.displayType}
                              icon={"fa fa-pencil"}
                              iconClick={()=>{}}
                              handleEditClick={this.handleEditClick.bind(this)}/>
              );
  }
}

ProfileDetails.propTypes ={
  displayType: React.PropTypes.string,
  info: React.PropTypes.string,
  text: React.PropTypes.string,
  options: React.PropTypes.array,
  onChange: React.PropTypes.func
}
