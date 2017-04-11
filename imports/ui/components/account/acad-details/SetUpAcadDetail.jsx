import React from 'react';
import Select from 'react-select';

// Import React Components
import Button from '../../common/Button.jsx';

// Import success and error notifications
import {  successMsgs,
          warningMsgs,
          errorMsgs} from '../AccountAlerts.js';

// Student-database methods
import { createNewStudent } from '../../../../api/database-controller/student/methods';

// Import file paths
import { pathToLogin } from '../../../../startup/client/Router.jsx';
import { pathToUserDashboard } from '../../../../startup/client/Router.jsx';

const ACAD_COHORT = [
  { label: 'AY 2013/2014', value:'AY 2013/2014' },
  { label: 'AY 2014/2015', value:'AY 2014/2015' },
  { label: 'AY 2015/2016', value:'AY 2015/2016' },
  { label: 'AY 2016/2017', value:'AY 2016/2017' }
]

const PREV_EDUCATION =[
  { label: 'Junior College', value:'jc' },
  { label: 'Polytechnic', value: 'poly' },
  { label: 'Others', value: 'others'}
]

export default class SetUpAcadDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohort: '',
      course:'',
      prevEdu: '',
      doubleCancel: true
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //Meteor.logout();
  }
  //Handle the input of Matriculation year
  handleAcadValueChange(obj) {
    this.setState({ cohort: obj.value });
    this.state.doubleCancel = true;
  }

  //Handle the input of Education background
  handleEduValueChange(obj) {
    this.setState({ prevEdu: obj.value });
    this.state.doubleCancel = true;
  }

  //Handle event when cancel is selected
  handleCancel(event) {
    if (this.state.doubleCancel) {
      Bert.alert(warningMsgs.WARNING_CANCEL_SETUP , 'warning');
      this.state.doubleCancel = false;
    } else {
      Meteor.logout();
      FlowRouter.go(pathToLogin);
    }
  }

  //Handle the input of User have clicked to finish set up, checks if all the input have been added
  handleSubmit(event) {
    if (!this.state.cohort || !this.state.prevEdu) {
      Bert.alert(errorMsgs.ERR_SETUP_INCOMPLETE, 'danger');
    } else {
      const userId = Meteor.user()._id;
      if (userId) {
        // create Students document
        const studentID = createNewStudent(userId, this.state.cohort, this.state.prevEdu);
        // set hasSetup to true
        Meteor.users.update(userId, { $set: { 'profile.hasSetup': true} } );
      }
      Bert.alert(successMsgs.SUCCESS_SETUP, 'success');
      FlowRouter.go(pathToUserDashboard);
    }
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1 className="section-heading" style={{color:'#fd6800', margin: '1.5em'}}>
          <strong>Account Setup</strong>
        </h1>

        <div className="col-md-6 blockui-element-container-default"
             style={{float: 'none', margin: '3.5em auto'}}>

           <div className="form-group"
                style={{color: '#ffffff', marginBottom: '2.5em'}}>
             <h4 style={{marginBottom: '0.3em'}}>
               <strong>Course Major: </strong>Computer Science
             </h4>
   				</div>

          <div className="form-group"
               style={{color: '#ffffff', marginBottom: '2.5em'}}>
            <h5 style={{marginBottom: '0.3em'}}>
              <strong>Academic Cohort</strong>
            </h5>
            <Select placeholder="Select"
                    multi={false} clearable={false} searchable={false}
                    options={ACAD_COHORT} value={this.state.cohort}
                    onChange={this.handleAcadValueChange.bind(this)} />
  				</div>

  				<div className="form-group"
               style={{color: '#ffffff', marginBottom: '2.5em'}}>
            <h5 style={{marginBottom: '0.3em'}}>
              <strong>Previous Education</strong>
            </h5>
            <Select placeholder="Select"
                    multi={false} clearable={false} searchable={false}
                    options={PREV_EDUCATION} value={this.state.prevEdu}
                    onChange={this.handleEduValueChange.bind(this)} />
  			  </div>
          <div className="blockui-element-container-default">
            <Button buttonClass="btn btn-rounded btn-inline btn-secondary-outline"
              buttonText="Cancel Setup"
              onButtonClick={this.handleCancel.bind(this)} />

            <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
              buttonText="Get Started"
              onButtonClick={this.handleSubmit.bind(this)} />
          </div>

        </div>
      </div>
    );
  }
}
