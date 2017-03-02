import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class MainLayout extends React.Component {
  render() {
    return(
      <div>
        <main>{this.props.content}</main>
      </div>
    );
  }
}
