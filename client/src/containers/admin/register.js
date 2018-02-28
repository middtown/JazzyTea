import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { getUsers, userRegisterUser } from '../../actions';

class Register extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    error: '',
  };

  handleInputEmail = (event) => {

  };

  handleInputPassword = (event) => {

  };

  handleInputFirstName = (event) => {

  };

  handleInputLastName = (event) => {

  };

  submitForm = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        Register
      </div>
    );
  }
}

export default Register;
