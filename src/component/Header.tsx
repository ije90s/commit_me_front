import React from 'react';
import styled from 'styled-components';
import HeaderPic from '@/utils/img/Header_pic.png';

type Props = {
  children: string;
  //     color?: string;
};
const Header: React.FC<Props> = ({ children }) => {
  return (
    <StyledHeader>
      <h1>{children}</h1>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  height: 25rem;
  background-color: ${props => props.theme.colors.gray_1};
  background-image: url(${HeaderPic});
  background-repeat: no-repeat;
  background-position: top center;
  text-align: center;
  position: relative;
  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
    width: fit-content;
    color: ${props => props.theme.colors.blue_1};
    font-size: 3.5rem;
    font-weight: bold;
  }
  /* padding-top: 3rem; */

  @media ${props => props.theme.device.tabletL} {
    /* background-color: red; */
  }
  @media ${props => props.theme.device.mobileL} {
    /* background-color: red; */
  }
`;
