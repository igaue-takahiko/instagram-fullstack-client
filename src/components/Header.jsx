import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { logout } from '../redux/auth/actions';
import { globalTypes } from '../redux/globalTypes';

import Avatar from './Avatar';

const Header = () => {
  const dispatch = useDispatch()
  const { auth, theme } = useSelector(state => state)
  const { pathname } = useLocation()

  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "favorite", path: "/notify" },
  ]

  const isActive = (pn) => {
    if (pn === pathname) {
      return 'active'
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light justify-content-lg-between align-middle"
      style={{ position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 4px 0 rgba(0, 0, 0, .3)" }}
    >
      <Link to="/">
        <h1 className="navbar-brand text-uppercase ml-3 p-0">Instagram</h1>
      </Link>
      <div className="menu" id="navbarSupportedContent">
        <ul className="navbar-nav flex-row mr-3">
          {navLinks.map((link, index) => (
            <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
              <Link className="nav-link" to={link.path}>
                <span className="material-icons">{link.icon}</span>
              </Link>
            </li>
          ))}
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            >
              <Avatar src={auth.user.avatar} />
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to={`/profile/${auth.user}`}>
                Profile
              </Link>
              <label
                htmlFor="theme" className="dropdown-item"
                onClick={() => dispatch({ type: globalTypes.THEME, payload: !theme })}
              >
                {theme ? 'Light mode' : 'Dark mode'}
              </label>
              <div className="dropdown-divider"></div>
              <Link
                className="dropdown-item" to="/"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
