import React from 'react';
import styled, { CSSProp } from 'styled-components';

type IProps = {
  children: string;
  style?: React.CSSProperties;
};
const Title: React.FC<IProps> = ({ children, style }) => {
  return <TitleStyled style={style}>{children}</TitleStyled>;
};

export default Title;

const TitleStyled = styled.h2`
  font-size: ${props => props.theme.fontSizes.medium};
  // font-family: 'Noto Sans KR';
  // font-style: normal;
  font-weight: 700;
  margin: 2rem 2rem 0;
  line-height: 36%;
  letter-spacing: -0.015em;
`;
