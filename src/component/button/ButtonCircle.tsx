import React from 'react';
import styled from 'styled-components';

type Props = {
  children: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};
const ButtonCircle: React.FC<Props> = ({ children, style, onClick }) => {
  return (
    <StyledButton style={style} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default ButtonCircle;

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
