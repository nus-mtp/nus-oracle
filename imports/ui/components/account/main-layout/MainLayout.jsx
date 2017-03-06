import { Meteor } from 'meteor/meteor';
import React from 'react';

<<<<<<< HEAD
export default class MainLayout extends React.Component {
  render() {
    return(
      <div>
        {this.props.content}
=======
export class MainLayout extends React.Component {
  render() {
    return(
      <div>
        <main>{this.props.content}</main>
>>>>>>> 31d321190195dd08a616ba662bfdd6537e7a71b5
      </div>
    );
  }
}
