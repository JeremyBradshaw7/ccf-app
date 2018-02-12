import React from 'react';
import Login from './screens/Login';

export interface Props { }
export interface State { }

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <Login />
    );
  }
}
