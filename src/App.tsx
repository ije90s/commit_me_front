import React, { useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './utils/style/GlobalStyle';
import { theme } from './utils/style/theme';
import Weekly from './component/Weekly';
import Header from './component/Header';
import Footer from '@/component/footer';
import Comment from '@/component/Comment';
import RankingView from '@/component/ranking';
import ProfileModal from '@/component/modal/ProfileModal';
import Title from '@/component/Title';
import { RankingArray, AttendanceArray } from './utils/interface';
import { accountApi } from './api/config';

const App = () => {
  const [rankingData, setRankingData] = useState<RankingArray>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceArray>([]);

  const fetchData = async () => {
    let res = await accountApi.rankingRead('attendance');
    for (let i = 0; i < res.length; i++) {
      res[i] = {
        ...res[i],
        count: res[i]['attendances'],
      };
    }
    setRankingData(res);
  };
  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainContainer>
        <Header>commit, ME!</Header>
        <div>
          <article>
            <Weekly attendanceData={attendanceData} setAttendanceData={setAttendanceData} />
          </article>
        </div>
        <div className='gray_article'>
          <article className='gray_article'>
            <RankingView rankingData={rankingData} setRankingData={setRankingData} />
          </article>
        </div>
        <div>
          <article>
            <Title>댓글</Title>
            <Comment />
          </article>
        </div>

        <Footer />
      </MainContainer>
      {/* 모달 작업 중. 확인 용도 (삭제 예정) */}
      {/* <ProfileModal /> */}
    </ThemeProvider>
  );
};

export default App;

const MainContainer = styled.div`
  /* background-color: red; */

  article {
    margin: 0 auto;
    /* width: 120rem; */
    padding: 1rem 7rem;
  }
  .gray_article {
    background-color: ${props => props.theme.colors.gray_1};
  }
`;
