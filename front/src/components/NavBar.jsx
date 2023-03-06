// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../utils/styles/NavBar.css';

function NavBar() {
  return (
    <header>
      <nav className="nav ml-navbar">
        <div className="nav-center">
          <a href="/" className="nav-logo">
            <img src="./src/assets/logo__large_plus.png" alt="MercadoLibre" style={{ height: '3rem', opacity: 0.5}}/>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
