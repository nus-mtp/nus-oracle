import React from 'react';

// Import React components
import RegisterAccount from './RegisterAccount'
import LoginAccount from './LoginAccount'
import LogoutAccount from './LogoutAccount'
import ForgetAccount from './ForgetAccount'

// const LoginButtons = BlazeToReact('loginButtons')

export default class MainLogin extends React.Component {
  render() {
    return (
      <div className="container-fluid" style={{width: "70%"}}>
        <LoginAccount />
      </div>
    );
  }
}

// App = React.createClass({
//   render() {
//     return (
//       <div>
//         <LoginButtons />
//       </div>
//     );
//   }
// })
