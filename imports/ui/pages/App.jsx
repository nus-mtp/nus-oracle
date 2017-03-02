import React from 'react';
import DashboardContainer from '../pages/DashboardContainer';

export class App extends React.Component {
  render() {
    console.log("RENDERING APP!")

    return (
      <div>
        <DashboardContainer />
      </div>
    );
  }
}
