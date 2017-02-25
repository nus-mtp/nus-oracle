import React from 'react';
import Select from 'react-select';

import CourseDropdown from './dropdown/CourseDropdown.jsx';
import AcadCohortDropdown from './dropdown/AcadCohortDropdown.jsx';
import PrevEduDropdown from './dropdown/PrevEduDropdown.jsx';

import { createNewStudent } from '../../../api/database-controller/student/methods';

export default class SetUpAcadDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cohort: '', course:'', prevEdu: '', doubleCancel: true};
    this.handleCourseValueChange = this.handleCourseValueChange.bind(this);
    this.handleAcadValueChange = this.handleAcadValueChange.bind(this);
    this.handleEduValueChange = this.handleEduValueChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAcadValueChange(obj) {
    console.log("Cohort " + obj.value);
    this.state.cohort = obj.value;
    this.state.doubleCancel = true;
  }

  handleCourseValueChange(obj) {
    console.log("Course " + obj.value);
    this.state.course = obj.value;
    this.state.doubleCancel = true;
  }

  handleEduValueChange(obj) {
    console.log("Previous Education " + obj.value);
    this.state.prevEdu = obj.value;
    this.state.doubleCancel = true;
  }

  handleCancel(event) {
    console.log("Cancel ");
    if (this.state.doubleCancel) {
      Bert.alert( 'Click again to leave page' , 'warning');
      this.state.doubleCancel = false;
    } else {
      Bert.alert( 'Returning to main page' , 'danger');
      FlowRouter.go('/');
    }
  }

  handleSubmit(event) {
    console.log("Submit");
    if (!this.state.course || !this.state.cohort || !this.state.prevEdu) {
      Bert.alert( 'Please enter all three fields before continuing' , 'danger');
    } else {
      const userId = Meteor.userId();
      if (userId) {
        // create Students document
        const studentID = createNewStudent(userId, this.state.cohort, this.state.prevEdu);
        // set hasSetup to true
        Meteor.users.update(userId, { $set: { 'profile.hasSetup': true} } );
      }

      Bert.alert( 'Setup completed!' , 'success' );
      FlowRouter.go('/userDashboard');
    }
  }

  render() {
    return (
      <div>
        <AcadCohortDropdown searchable onValueClick={this.handleAcadValueChange}/>
        <CourseDropdown searchable onValueClick={this.handleCourseValueChange}/>
        <PrevEduDropdown searchable onValueClick={this.handleEduValueChange}/>
        <button onClick={this.handleCancel}> Cancel Setup</button>
        <button onClick={this.handleSubmit}> Finish Setup</button>
      </div>
    );
  }
}
