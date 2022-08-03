import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonRectang from '../button/ButtonRectang';
import RankingBox from './RankingBox';
import { accountApi, attendanceApi } from '@/api/config';

import Title from '@/component/Title';

interface IRankingData {
  attendances: number;
  comments: number;
  commits: number;
  pulls: number;
  createdAt: string;
  github_address: string;
  image_url: string;
  name: string;
  updatedAt: string;
  user_id: string;
}
interface IProps {
  rankingData?: Array<IRankingData>;
  setRankingData?: any;
  // setRankingData?: (ranking: string[] | undefined) => void;
}

const RankingView: React.FC<IProps> = ({ rankingData, setRankingData }) => {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    const res = await accountApi.rankingRead(name);
    console.log('ranking data >> ', res);
    setRankingData(res);
  };

  const handleProfileClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('profile click');
  };
  return (
    <Container>
      <div className='top_section'>
        <Title style={{ marginTop: '0', marginLeft: '0' }}>랭킹</Title>
        <div className='button_wrap'>
          <ButtonRectang color='#fff' name='attendances' onClick={handleClick}>
            출석
          </ButtonRectang>
          {/* 커밋되는거? */}
          <ButtonRectang name='commits' onClick={handleClick}>
            커밋
          </ButtonRectang>
          {/* 랭킹 조회 */}
          <ButtonRectang name='pulls' onClick={handleClick}>
            풀리퀘스트
          </ButtonRectang>
          {/*  */}
          <ButtonRectang name='comments' onClick={handleClick}>
            댓글
          </ButtonRectang>
        </div>
      </div>
      <div>
        <RankingBox rankingData={rankingData} onClick={handleProfileClick} />
      </div>
    </Container>
  );
};

export default RankingView;

const Container = styled.div`
  /* background-color: ${props => props.theme.colors.gray_1}; */
  padding: 2rem 2rem;

  .top_section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: red; */
  }
  .button_wrap {
    text-align: right;
  }
`;
