import React from 'react';
import styled from 'styled-components';
import Writer from './Writer';
import Information from './Information';

/**
 *
 * @returns {footer}
 */
const Footer = () => {
  return (
    <StyledFooter>
      <Writer />
      <Information />
    </StyledFooter>
  );
};

export default Footer;
const StyledFooter = styled.footer`
  background-color: blue;
  display: flex;
`;
