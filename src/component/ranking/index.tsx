import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonRectang from '../button/ButtonRectang';
import RankingBox from './RankingBox';
import { accountApi, attendanceApi } from '@/api/config';
import Title from '@/component/Title';
import ProfileModal from '../modal/ProfileModal';

interface IRankingData {
  key: number;
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
  count: number;
}
interface IProps {
  rankingData?: Array<IRankingData>;
  setRankingData?: any;
  // setRankingData?: (ranking: string[] | undefined) => void;
}

const RankingView: React.FC<IProps> = ({ rankingData, setRankingData }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectData, setSelectData] = useState();
  const [tab, setTab] = useState([1, 0, 0, 0]); //탭 리스트

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    const res = await accountApi.rankingRead(name);
    for (let i = 0; i < res.length; i++) {
      res[i] = {
        ...res[i],
        count: res[i][`${name}s`],
      };
    }
    setRankingData(res);
    setTab(prev => {
      if (name === 'attendance') prev = [1, 0, 0, 0];
      else if (name === 'commit') prev = [0, 1, 0, 0];
      else if (name === 'pull') prev = [0, 0, 1, 0];
      else prev = [0, 0, 0, 1];
      return prev;
    });
  };
  const handleProfileClick = (value: any) => async (e: any) => {
    setSelectData(value);
    setProfileOpen(true);
  };
  return (
    <Container>
      <div className='top_section'>
        <Title style={{ marginTop: '0', marginLeft: '0' }}>랭킹</Title>
        <div className='button_wrap'>
          <ButtonRectang
            color={tab[0] ? '#fff' : '#18A0FB'}
            name='attendance'
            onClick={handleClick}
          >
            출석
          </ButtonRectang>
          <ButtonRectang color={tab[1] ? '#fff' : '#18A0FB'} name='commit' onClick={handleClick}>
            커밋
          </ButtonRectang>
          <ButtonRectang color={tab[2] ? '#fff' : '#18A0FB'} name='pull' onClick={handleClick}>
            풀퀘
          </ButtonRectang>
          <ButtonRectang color={tab[3] ? '#fff' : '#18A0FB'} name='comment' onClick={handleClick}>
            댓글
          </ButtonRectang>
        </div>
      </div>
      <div>
        {rankingData?.map(v => (
          <RankingBox choiceData={v} onClick={handleProfileClick(v)} />
        ))}
      </div>
      {profileOpen && <ProfileModal setVisible={setProfileOpen} detailData={selectData} />}
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
