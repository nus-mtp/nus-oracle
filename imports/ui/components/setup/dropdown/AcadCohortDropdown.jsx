import React from 'react';
import Select from 'react-select';

/*
Temporary course option.
@todo: Transfer Course array into another admin database
*/
const AcadCohort =[
  { label: 'AY 2012/2013', value:'12/13' },
  { label: 'AY 2013/2014', value:'13/14' },
  { label: 'AY 2014/2015', value:'14/15' },
  { label: 'AY 2015/2016', value:'15/16' },
  { label: 'AY 2016/2017', value:'16/17' }
]

var AcadCohortDropdown = React.createClass({
	displayName: 'AcadCohortDropdown',
	getInitialState () {
		return {
			options: AcadCohort,
			value: ''
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
    this.props.onValueClick(value);
	},


	render () {
		return (
			<div className="section">
				<h3 className="section-heading">Academic Cohort</h3>
				<Select multi={false} value={this.state.value} placeholder="Select Academic Cohort" options={this.state.options} onChange={this.handleSelectChange} />
			</div>
		);
	}
});
module.exports = AcadCohortDropdown;
