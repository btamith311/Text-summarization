import React from 'react';
import { NavBar, NavLinks, NavLink, NavHeader } from '../components/nav_bar';
import { Flex } from '../components/flex';
import styled from 'styled-components/macro';

const Constrain = styled(Flex)`
  max-width: 1200px;
  width: 100%;
`;

const AppBar = () => {
  return (
    <NavBar justifyCenter>
      <Constrain justifyBetween>
        <NavHeader text="SMRZR.io: Online Summarization Tool" to="/" />
        <NavLinks justifyEnd>
            <NavLink text="API Docs" to="/api" />
        </NavLinks>
      </Constrain>
    </NavBar>
  )
}

export default AppBar;
