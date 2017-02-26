import React from 'react';
import Select from 'react-select';

/*
Temporary course option.
@todo: Transfer Course array into another admin database
*/
const Edu =[
  { label: 'Junior College', value:'jc' },
  { label: 'Polytechnic', value: 'poly' },
  { label: 'Others', value: 'others'}
]



var PrevEduDropdown = React.createClass({
	displayName: 'CourseDropdown',
	getInitialState () {
		return {
			options: Edu,
			value: ''
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
    this.props.onValueClick(value);
	},
  handleValueClick(value, event) {
    console.log(value);

  },

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">Previous Education</h3>
				<Select multi={false} value={this.state.value} placeholder="Select Previous Education" options={this.state.options} onChange={this.handleSelectChange}/>
			</div>
		);
	}
});
module.exports = PrevEduDropdown;
