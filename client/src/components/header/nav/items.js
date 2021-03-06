import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const NavItems = () => {

  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/',
      restricted: false,
    }, {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Profile',
      link: '/user',
      restricted: false,
    }, {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Admins',
      link: '/user/register',
      restricted: false,
    }, {
      type: 'navItem',
      icon: 'fa-sign-in',
      text: 'Login',
      link: '/login',
      restricted: false,
    }, {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'User Comments',
      link: '/user/user-comments',
      restricted: false,
    },  {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add A Tea',
      link: '/user/user-teas',
      restricted: false,
    }, {
      type: 'navItem',
      icon: 'fa-sign-out',
      text: 'Logout',
      link: '/user/logout',
      restricted: false,
    },
  ];

  const element = (item, i) => (
    <div key={i} className={item.type}>
      <Link to={item.link}>
        <FontAwesome name={item.icon}/>
        {item.text}
      </Link>
    </div>

  );

  const showItems = () => (
    items.map((item, i) => {
      return element(item, i);
    })
  );

  return (
    <div>
      {showItems()}
    </div>
  );
};

export default NavItems;
