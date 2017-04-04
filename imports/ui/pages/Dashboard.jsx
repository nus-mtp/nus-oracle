import React from 'react';
import Sidebar from '../components/sidebar_menu/Sidebar';
import StudyPlan from '../components/study_plan/StudyPlan';
import ModalContainer from '../components/common/ModalContainer.jsx';
import ChangePassword from '../components/account/manage-account/ChangePassword.jsx';
import * as constants from '../components/common/Constants.js';
import LoadingScreen from './../components/account/login/LoadingScreen.jsx';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelectedIndex: 0,
      isChangingPassword: false,
      isDashboard: true,
      isLoading: false
    }
  }

  handleLoading() {
    this.setState({
      isLoading: true
    });
  }


  handleHideLoading() {
    this.setState({
      isLoading: false
    });
  }
  handleSelectTab(index) {
    this.setState({tabSelectedIndex: index});
  }

  handleChangePassword() {
    this.setState({
      isChangingPassword: true
    });
  }

  handleHideChangePassword() {
    this.setState({
      isChangingPassword: false
    });
  }

  handleCloseAllWindows() {
    this.setState({
      isChangingPassword: false,
      isLoading: false
    });
  }
  render() {
    return (
      <div className="with-side-menu">
          <Sidebar
            onChangePassword = {this.handleChangePassword.bind(this)}
            onLogout = {this.handleLoading.bind(this)}
             activePlannerId={this.props.plannerIDs[this.state.tabSelectedIndex]}/>
        <div className="page-content" style={{padding: '0 0 0 350px'}}>
          <div className="container-fluid" style={{padding: '0px'}}>
            {this.state.isDashboard ?
              <StudyPlan
                plannerIDs={this.props.plannerIDs}
                         handleSelectTab={this.handleSelectTab.bind(this)}/> : null}
            {this.state.isChangingPassword ?
              <ModalContainer
                onHidden = {this.handleHideChangePassword.bind(this)}
                content ={ <ChangePassword
                onSuccess={this.handleCloseAllWindows.bind(this)}
                onLoadComplete = {this.handleHideLoading.bind(this)}
                onSubmit={this.handleLoading.bind(this)}/>}/> : null}
            {this.state.isLoading ?
              <ModalContainer onHidden={this.handleHideLoading.bind(this)}
                              content={<LoadingScreen
                              onSuccess={this.handleCloseAllWindows.bind(this)} />} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  plannerIDs: React.PropTypes.array
}
