import React from 'react';
import axios from 'axios';

const LogOut = (props) => {

  let request = axios.get(`/api/logout`)
  .then(request => {
    setTimeout(() => {
      props.history.push('/');
    });
  });

  return (
    <div className='logout_container'>
      <h1>
        till next time !
      </h1>
    </div>
  );
};

export default LogOut;
