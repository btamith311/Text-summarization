import styled from 'styled-components/macro';

const Button = styled.button`
  min-width: 8em;
  padding: 0.8em 1em;
  cursor: pointer;
  margin-bottom: 1em;
  border: none;
  border-bottom-style: solid;
  border-bottom-color: #e6e2df;
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;

  &:hover {
    background-color: #e6e2df;
    border-bottom-color: #efefef;
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
