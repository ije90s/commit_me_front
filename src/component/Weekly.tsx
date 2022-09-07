import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ButtonCircle from './button/ButtonCircle';
import Title from '@/component/Title';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ko';
import { weekApi, attendanceApi } from '@/api/config';
dayjs.locale('ko');
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
/**
 *
 * @returns {한 주씩 보여주는 주간 달력}
 */
const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
const todayObj = dayjs();

const Weekly = () => {
  const [startDate, setStartDate] = React.useState(''); //시작일
  const [endDate, setEndDate] = React.useState(''); //끝일
  const [kind, setKind] = React.useState('now'); //구분
  const [dayList, setDayList] = useState([]); //주 리스트

  //1주 조회
  async function updateWeek() {
    //현재의 주 조회
    const res = await weekApi.read(startDate, kind);
    const weekDate = res.weekDate.split(',');

    //시작일/끝일/주 리스트 셋팅
    setStartDate(() => {
      return weekDate[0];
    });
    setEndDate(() => {
      return weekDate[6];
    });
    setDayList(prev => {
      for (let i = 0; i < weekDate.length; i++) {
        const date = new Date(weekDate[i]);
        weekDate[i] = date.getDate().toString();
      }
      prev = weekDate;
      return prev;
    });
  }

  //* 이전 주
  const handlePrev = () => {
    setKind(() => {
      return 'prev';
    });
    updateWeek();
  };

  //* 다음 주
  const handleNext = () => {
    setKind(() => {
      return 'next';
    });
    updateWeek();
  };

  React.useEffect(() => {
    updateWeek();
  }, [kind]);

  const thisDate = new Date(startDate);

  return (
    <Container>
      <div className='top_section'>
        <Title style={{ marginTop: '0', marginLeft: '0' }}>출석 체크</Title>
      </div>
      <div className='calendar_title'>
        {thisDate.getFullYear()}년 {thisDate.getMonth() + 1}월
      </div>
      <div className='calendar_wrap'>
        <ButtonCircle
          onClick={handlePrev}
          style={{
            zIndex: '1',
            marginRight: '-2rem',
            paddingRight: '0.30rem',
            paddingTop: '0.2rem',
          }}
        >
          〈
        </ButtonCircle>
        <div className='calendar_section'>
          <div className='day_of_the_week_box'>
            {weekDays?.map((v, i) => (
              <h3 key={i}>{v}</h3>
            ))}
          </div>
          <div className='date_box'>
            {dayList?.map((v, i) => (
              <p>{v}</p>
            ))}
          </div>
        </div>
        <ButtonCircle
          onClick={handleNext}
          style={{
            marginLeft: '-2rem',
            paddingLeft: '0.35rem',
            paddingTop: '0.2rem',
          }}
        >
          〉
        </ButtonCircle>
      </div>
    </Container>
  );
};

export default Weekly;

const Container = styled.div`
  padding: 2rem 2rem;
  .top_section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .calendar_title {
    text-align: center;
    font-size: 2rem;
    padding: 10px 0;
  }
  .calendar_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    width: 100%;
    /* background-color: aliceblue; */
    .calendar_section {
      border: ${props => `1px solid ${props.theme.colors.blue_1}`};
      border-radius: 0.6rem;
      padding: 4.5rem 15rem;
      width: 55rem;
      .day_of_the_week_box,
      .date_box {
        display: flex;
        justify-content: space-between;
      }
      .day_of_the_week_box {
        margin-bottom: 2rem;
        color: ${props => props.theme.colors.gray_2};
      }
      .date_box {
      }
    }
  }
`;
