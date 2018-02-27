import React from 'react';
import SideNav from 'react-simple-sidenav';
import Items from './items';

const Nav = (props) => {
      return (
        <SideNav
          showNav={props.showNav}
          onHideNav={props.onHideNav}
          navStyle={{ background: '#242424', minWidth: '100px', maxWidth: '220px' }}
        >
        Items
        <Items/>
        </SideNav>
      );
    };

export default Nav;
