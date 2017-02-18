//temp code
import React from 'react';


export default class SignIn extends React.Component {
  function
  render() {
    return (

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <h4 className="page-header">Sign Up</h4>
          <form id="signup" className="signup">
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success" defaultValue="Sign Up" onClick = this.handle />
            </div>
          </form>
        </div>
      </div>
    );
  };
}
