import React from 'react';
import LoaderSpinner from './loader_spinner.styled';

const Loader = ({ color, size, sizeUnit }) => (
  <LoaderSpinner color={color} size={size} sizeUnit={sizeUnit}>
    <div />
    <div />
    <div />
    <div />
  </LoaderSpinner>
);

Loader.defaultProps = {
  size: 64,
  color: '#000000',
  sizeUnit: 'px'
};

export default Loader;
