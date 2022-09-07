import React from 'react';
import styled from 'styled-components';
import IconGit from '@/utils/img/Icon_git.png';
import IconArrow from '@/utils/img/Icon_arrow.png';

const Information = () => {
  const handleTopClick = (e: any) => {
    window.scrollTo(0, 0);
  };
  return (
    <StyledInformation>
      <div className='text_wrap'>
        <p>본인이 얼만큼 공부했는지 확인하는 사이트로,</p>
        <p>자정마다 깃허브 데이터를 업데이트 합니다.</p>
      </div>
      <div className='button_wrap'>
        <a href='https://github.com/ije90s/commit_me_front' target='_blank' rel='noreferrer'>
          <img src={`${IconGit}`} alt='github' />
        </a>
        <button onClick={handleTopClick}>
          <img src={`${IconArrow}`} alt='github' />
        </button>
      </div>
    </StyledInformation>
  );
};

export default Information;
const StyledInformation = styled.div`
  background-color: ${props => props.theme.colors.gray_1};
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  .text_wrap {
    font-size: ${props => props.theme.fontSizes.base};
    p:nth-child(1) {
      margin-bottom: 0.8rem;
    }
  }
  .button_wrap {
    display: flex;
    button,
    a {
      /* background-color: ${props => props.theme.colors.white}; */
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    button {
      margin-left: 1rem;
    }
  }
`;
