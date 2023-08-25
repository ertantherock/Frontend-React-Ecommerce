import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IUser } from '../models/IUser';


function Navbar({ user }: { user: IUser }) {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand">Ertan Kaya</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to={'/'}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/basket'} className="nav-link">
                Basket
              </NavLink>
            </li>
          </ul>
          {user ? (
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              <button className="btn btn-outline-danger" onClick={logout}>
                Log Out
              </button>
            </div>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={'/login'} className="dropdown-item">
                      Log In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/register'} className="dropdown-item">
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/admin'} className="dropdown-item">
                      Admin
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;