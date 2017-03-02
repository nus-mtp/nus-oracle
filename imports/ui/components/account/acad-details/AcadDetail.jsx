import { Meteor } from 'meteor/meteor';
import React from 'react';
import SetUpAcadDetail from './SetUpAcadDetail';

export class AcadDetailComponent extends React.Component {
  render() {
    return(
      <div>
        <h2>Academic Details</h2>
        <SetUpAcadDetail />
      </div>
    );
  }
}
