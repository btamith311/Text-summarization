import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Flex } from '../flex';

const StyledNavBar = styled(Flex)`
  background-color: #333;
  height: 4em;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  line-height: 0;
`;

const NavLinks = styled(Flex)`
  padding-right: 1em;

  &:hover {
    cursor: pointer
  }
`;

const LinkWrapper = styled(Flex)`
`;

export { StyledNavBar, StyledLink, NavLinks, LinkWrapper };
