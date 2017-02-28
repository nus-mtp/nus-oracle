import React from 'react';

// Import React components
import Button from '../common/Button.jsx';

//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})

 */

export default class LoginAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordErr: 0
    };
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
      console.log("LOGGING IN WITH PASSWORD...")
      if (error) { //Log in error
        console.log("ERRROR " + error.reason);

        if (error.reason == 'Incorrect password') { //Incorrect password
          Bert.alert(error.reason, 'danger');
          this.state.passwordErr += 1;
          if (this.state.passwordErr >= 5) {
            this.handleReset();
          }
        } else { //Incorrect email, etc.
          Bert.alert(error.reason, 'danger');
        }
      } else {
        this.state.passwordErr = 0;

        console.log(Meteor.user());
        console.log(Meteor.user().emails[0]);

        if (Meteor.user().emails[0].verified) {
          if (!Meteor.user().profile.hasSetup) {
            FlowRouter.go('/setup');
          } else {
            FlowRouter.go('/userDashboard');
          }
          //FlowRouter.reload();
          Bert.alert('Welcome back, ' + Meteor.user().username + '!', 'success');
        } else {
          Bert.alert('Email is not verified, please check email, ' + Meteor.user().emails[0], 'danger');
          Meteor.logout();
        }
      }
    });
  }

  handleReset(event) {
    const options = {};
    options.email = this.state.email;
    Accounts.forgotPassword(options, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Exceeded log in attempt, password has been reset. Please che' +
            'ck email to set new password',
        'danger');
      }
    });
    const userId = Accounts.users.findOne({username: this.state.email})._id;
    Meteor.call('resetpassword', userId)
  }

  render() {
    return (
      <div className="container-fluid" style={{width: "70%"}}>
        <div className="page-center page-center-in">

          <div className="gallery-picture">
            <img style={{height: '100%', width: '100%', marginTop: '2em'}}
                 src="./logo/NUS_Oracle_logo.jpg" alt="NUS_Oracle_logo" />
          </div>

          <div className="col-md-6 blockui-element-container-default"
              style={{float: 'none', margin: '3.5em auto'}}>
            <form className="form-group" style={{textAlign: 'center'}}>

              <div className="form-group">
                <input className="form-control" type="text"
                  placeholder="NUS E-mail" value={this.state.value}
                  onChange={this.handleEmailChange.bind(this)} />
              </div>

              <div className="form-group">
                <input className="form-control" type="password"
                  placeholder="Password" value={this.state.value}
                  onChange={this.handlePasswordChange.bind(this)} />
              </div>

              <div className='form-group' style={{margin: '4em'}}>
                <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                        buttonText="LOGIN"
                        onButtonClick={this.handleSubmit.bind(this)} />
                <div className='row'>
                  <a className="dropdown-item">
                    CREATE ACCOUNT
                  </a>
                </div>
                <div className='row'>
                  <a className="dropdown-item">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }
}
