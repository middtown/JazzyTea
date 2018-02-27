import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

// import Bootstrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from './nav/nav';

class Header extends Component {

  state = { showNav: false };

  onHideNav = () => {
    this.setState({ showNav: false });
  };

  render() {
    return (
      <header>
        <div className='open_nav'>
          <FontAwesome name='bars'
            onClick={() => this.setState({ showNav: true })}
            style={{
              color: '#ffffff',
              margin: '10px',
              cursor: 'pointer',
            }}
          />
      </div>

      <Nav showNav={this.state.showNav}
      onHideNav={() => this.onHideNav()}
      />
      <Link to='/' className='logo'>
        Jazzy Tea
      </Link>
      </header>
    );
  }
}

export default Header;
