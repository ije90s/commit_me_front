import React from 'react';
import styled from 'styled-components';
import Writer from './Writer';
import Infomation from './Infomation';

/**
 *
 * @returns {footer}
 */
const Footer = () => {
  return (
    <StyledFooter>
      <Writer />
      <Infomation />
    </StyledFooter>
  );
};

export default Footer;
const StyledFooter = styled.footer`
  background-color: blue;
  display: flex;
`;
