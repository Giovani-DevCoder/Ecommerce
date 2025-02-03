import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';  // Asegúrate de que la ruta sea correcta

const LogoComponent = ({ w = 370, h = 155 }) => {
  return (
    <Logo width={w} height={h} /> 
  );
};

export default LogoComponent;


