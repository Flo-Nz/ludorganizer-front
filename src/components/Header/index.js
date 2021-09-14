// == Import
import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import './styles.scss';

// == Composant
const Header = () => {
  return (
    <header className="header">
      <Link to="/" >
        <h1 className="header-title">Ludorganizer</h1>
      </Link>
    <nav className="menu">
        <NavLink 
        to="/"
        className="menu-link" 
        activeClassName="menu-link--selected"
        exact
        >
          Accueil
        </NavLink>
        <NavLink 
        to="/boardgames"
        className="menu-link" 
        activeClassName="menu-link--selected"
        exact
        >
          Jeux
        </NavLink>
        <NavLink 
        to="/admin" 
        className="menu-link" 
        activeClassName="menu-link--selected"
        exact
        >
          Ludothèque
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;