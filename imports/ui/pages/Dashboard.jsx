import React from 'react';

// Import React components
import ModalContainer from '../components/common/ModalContainer.jsx';
import Sidebar from '../components/sidebar_menu/Sidebar';
import StudyPlan from '../components/study_plan/StudyPlan';
import ChangePassword from '../components/account/manage-account/ChangePassword.jsx';
import LoadingScreen from './../components/account/login/LoadingScreen.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelectedIndex: 0,
      isLoggingOut: false,
      isChangingPassword: false,
      isLoading: false
    }
  }

  //======================================================
  // EVENT HANDLERS
  //======================================================
  handleSelectTab(index) {
    this.setState({tabSelectedIndex: index});
  }

  handleLogout() {
    this.setState({ isLoggingOut: true });
  }

  handleHideLogout() {
    this.setState({ isLoggingOut: false });
  }

  handleLoading() {
    this.setState({ isLoading: true });
  }

  handleHideLoading() {
    this.setState({ isLoading: false });
  }

  handleChangePassword() {
    this.setState({ isChangingPassword: true });
  }

  handleHideChangePassword() {
    this.setState({ isChangingPassword: false });
  }

  handleCloseAllWindows() {
    this.setState({
      isLoggingOut: false,
      isChangingPassword: false,
      isLoading: false
    });
  }

  //===================================================================
  // RENDER FUNCTIONS FOR DISTINCT UI PARTS WITHIN THE DASHBOARD
  //===================================================================
  /**
   * Renders a Modal window that displays the change password form
   *
   * @return {Node} React component Modal Pop up with Change Password form
   */
  renderChangePasswordModal() {
    return (
      <ModalContainer
        disableHide={false}
        onHidden={this.handleHideChangePassword.bind(this)}
        content={
          <ChangePassword
            onSuccess={this.handleCloseAllWindows.bind(this)}
            onLoadComplete={this.handleHideLoading.bind(this)}
            onSubmit={this.handleLoading.bind(this)} />}
      />
    );
  }

  /**
   * Renders a Modal window that displays the loading spinner
   *
   * @return {Node} React component Modal Pop up with the loading spinner
   */
  renderLoadingScreenModal() {
    return (
      <ModalContainer
        disableHide={true}
        onHidden={this.handleHideLoading.bind(this)}
        content={
          <LoadingScreen
            onSuccess={this.handleCloseAllWindows.bind(this)} />}
      />
    );
  }

  render() {
    return (
      <div className="with-side-menu">
        {/* Left hand Sidebar */}
        <Sidebar
          onChangePassword={this.handleChangePassword.bind(this)}
          onLogout={this.handleLoading.bind(this)}
          activePlannerId={this.props.plannerIDs[this.state.tabSelectedIndex]} />

        {/* Right hand Study plan dashboard */}
        <div className="page-content" style={{padding: '0 0 0 350px'}}>
          <div className="container-fluid" style={{padding: '0px'}}>
            {/* Study Plan Dashboard containing all the user's study plans */}
            <StudyPlan
              plannerIDs={this.props.plannerIDs}
              handleSelectTab={this.handleSelectTab.bind(this)} />
          </div>
        </div>

        {/* Modal window when user clicks to change password */}
        {this.state.isChangingPassword ? this.renderChangePasswordModal() : null}

        {/* Loading Modal window only opened when some process is working
            in the background and a loading screen needs to be shown */}
        {this.state.isLoading ? this.renderLoadingScreenModal() : null}
      </div>
    );
  }
}

Dashboard.propTypes = {
  plannerIDs: React.PropTypes.array
}
