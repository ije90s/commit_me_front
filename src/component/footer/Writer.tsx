import React from 'react';
import styled from 'styled-components';

const Writer = () => {
  return (
    <StyledWriter>
      <p className='reserved_wrap'>
        <span>©</span>2022 All rights reserved.
      </p>
      <div className='text_wrap'>
        <p className='key_wrap'>provided by.</p>
        <p>SSJ</p>
      </div>
      <div className='text_wrap'>
        <p className='key_wrap'>created by.</p>
        <p>LJE SJY</p>
      </div>
    </StyledWriter>
  );
};

export default Writer;
const StyledWriter = styled.div`
  background-color: ${props => props.theme.colors.blue_1};
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.white};
  width: 20rem;
  padding: 2rem 2rem;
  .reserved_wrap {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  .text_wrap {
    display: flex;
    margin-top: 0.8rem;
    font-size: 1.5rem;
  }
  .key_wrap {
    font-weight: bold;
    margin-right: 1rem;
  }
`;
