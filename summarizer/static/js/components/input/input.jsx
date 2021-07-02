import React from 'react';
import { Flex } from '../flex';
import styled from 'styled-components/macro';

const Label = styled.label`
  margin-right: 1em;
`;

const StyledInput = styled.input`
  min-height: 25px;
  max-width: 50px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom-color: #e6e2df;
  font-family: 'Open Sans', sans-serif;
  background-color: #efefef;
  border-radius: 5px;
`;

const Input = ({
  type,
  min,
  max,
  label,
  labelLocation,
  onChange,
  value
}) => {

  return (
    <Flex direction={labelLocation === 'top' ? 'column' : 'row'}>
      {label && (<Label for="input">{label}</Label>)}
      <StyledInput
        type={type}
        id={label}
        name={label}
        min={min}
        max={max}
        onChange={onChange}
        value={value}
      />
    </Flex>
  );
};

export default Input;
