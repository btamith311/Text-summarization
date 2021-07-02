import React from 'react';
import { StyledNavBar } from './navbar.styled';

const NavBar = ({ children }) => <StyledNavBar justifyCenter>{children}</StyledNavBar>;

export default NavBar;
