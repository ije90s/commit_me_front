import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ButtonCircle from './button/ButtonCircle';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ko';
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
  const date = new Date();
  const todayWeek = date.getDay(); // 오늘의 요일, 0(일)부터 시작함
  const today = date.getDate(); // 오늘 날짜
  const lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // 이번달 마지막 날짜
  console.log(todayWeek);

  const [dayList, setDayList] = useState([]);

  //* 1주일 단위 날짜 배열 구하기
  const getAllDate = (today: number, lastday: number) => {
    let dates: number[] = [];
    // 날짜 배열의 0번째가 오늘 날짜
    dates[0] = today;
    // todo:
    // 0번째가 일요일 날짜여야 한다.
    if (todayWeek > 0) {
      dates[0] = today - todayWeek;
    } else {
      dates[0] = today;
    }

    for (let i = 1; i <= 6; i++) {
      today++;
      // 마지막 날보다 날짜가 클 경우 today를 1로 초기화
      if (today > lastday) {
        today = 1;
        dates[i] = today;
      } else {
        dates[i] = today;
      }
    }
    return dates;
  };

  //* 요일 계산
  const getAllWeek = (todayWeek: number) => {
    let weekList: string[] = [];

    // 첫번째 오늘 요일 적용
    weekList[0] = weekDays[todayWeek];

    for (let i = 1; i <= 6; i++) {
      todayWeek++;
      //토요일=6 6보다 커지면 다시 0=일요일
      if (todayWeek > 6) {
        todayWeek = 0;
        weekList[i] = weekDays[todayWeek];
      } else {
        weekList[i] = weekDays[todayWeek];
      }
    }
    return weekList;
  };
  //* 이전 주
  const handlePrev = () => {
    console.log(9222);
  };

  //* 다음 주
  const handleNext = () => {
    ('');
  };

  const CalendarDay = getAllDate(today, lastday);
  const CalendarWeek = getAllWeek(todayWeek);

  const CalendarObject = [
    { week: CalendarWeek[0], day: CalendarDay[0] },
    { week: CalendarWeek[1], day: CalendarDay[1] },
    { week: CalendarWeek[2], day: CalendarDay[2] },
    { week: CalendarWeek[3], day: CalendarDay[3] },
    { week: CalendarWeek[4], day: CalendarDay[4] },
    { week: CalendarWeek[5], day: CalendarDay[5] },
    { week: CalendarWeek[6], day: CalendarDay[6] },
  ];
  const week = useRef(null);

  useEffect(() => {
    return () => console.log('clean up');
  }, []);
  return (
    <CalendarWrap>
      <h2>{/* {thisYear}년 {thisMonth}월 */}</h2>
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
      <div>
        <StyledSection>
          <div className='day_of_the_week_box'>
            {weekDays?.map((v, i) => (
              <h3 key={i}>{v}</h3>
            ))}
          </div>
          <div className='date_box'>
            {CalendarObject?.map((v, i) => (
              <p>{v.day}</p>
            ))}
            {/* <p>11</p>
            <p>12</p>
            <p>13</p>
            <p>14</p>
            <p>15</p>
            <p>16</p>
            <p>17</p> */}
          </div>
        </StyledSection>
      </div>
      <ButtonCircle
        style={{
          marginLeft: '-2rem',
          paddingLeft: '0.35rem',
          paddingTop: '0.2rem',
        }}
      >
        〉
      </ButtonCircle>
    </CalendarWrap>
  );
};

export default Weekly;
const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  width: 100%;
  /* background-color: aliceblue; */
`;
const StyledSection = styled.section`
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
`;
