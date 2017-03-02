import React from 'react';
import Select from 'react-select';

/*
Temporary course option.
@todo: Transfer Course array into another admin database
*/
const Courses =[
  { label: 'Business Analytics', value: 'business analytics' },
  { label: 'Computer Science', value: 'computer science' },
  { label: 'Information Security', value: 'information security' },
  { label: 'Information System', value: 'information system' },
  { label: 'Computer Engineering', value: 'computer engineer' }
]



var CourseDropdown = React.createClass({
	displayName: 'CourseDropdown',
	getInitialState () {
		return {
			options: Courses,
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
				<h3 className="section-heading">Course</h3>
				<Select multi={false} value={this.state.value} placeholder="Select NUS Course" options={this.state.options} onChange={this.handleSelectChange}/>
			</div>
		);
	}
});
module.exports = CourseDropdown;
