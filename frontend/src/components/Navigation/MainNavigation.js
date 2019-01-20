import React from "react";
import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

const MainNavigation = props => {
  return (
    <header className="main-navigation">
      <div className="main-navigation_logo">
        <h1>The Navbar</h1>
      </div>
      <nav className="main-navigation_items">
        <ul>
          <li>
            <NavLink to="/login">Authenticate</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
