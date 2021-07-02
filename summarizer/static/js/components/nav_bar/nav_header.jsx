import React from 'react';
import NavLink from './nav_link';
import { Flex } from '../flex';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  padding-left: 1em;
`;

const NavHeader = ({ text, to }) => (
  <Wrapper justifyStart>
    <NavLink to={to} text={text} />
  </Wrapper>
);

export default NavHeader;
