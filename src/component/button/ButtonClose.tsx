import React from 'react';
import styled from 'styled-components';
// import close from '@/utils/img/close.png';

type Props = {
  children: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const ButtonClose = () => {
  return <StyledButton>{/* <img src={close} alt='close button' /> */}</StyledButton>;
};

export default ButtonClose;
const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.blue_1};
  border-radius: 10rem;
  width: 4.5rem;
  height: 4.5rem;
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  display: inline-block;
`;
