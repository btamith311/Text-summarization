import React from 'react';
import { StyledLink, LinkWrapper } from './navbar.styled';

const NavLink = ({ text, to }) => (
  <LinkWrapper column alignCenter justifyCenter>
    <StyledLink to={to}>{text}</StyledLink>
  </LinkWrapper>
);

export default NavLink;
