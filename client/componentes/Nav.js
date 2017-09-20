import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => (
  <div>
    <NavLink to="/">
      Home
    </NavLink>
    <NavLink to="/lists">
      Lists
    </NavLink>
    <NavLink to="/test">
      Test
    </NavLink>
  </div>
);

export default Nav;