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

interface IAttendanceData {
  image_url?: string;
  attendance_date?: string;
  count?: number;
}
interface IProps {
  attendanceData?: Array<IAttendanceData>;
  setAttendanceData?: any;
}

const Weekly: React.FC<IProps> = ({ attendanceData, setAttendanceData }) => {
  const [startDate, setStartDate] = React.useState(''); //시작일
  const [endDate, setEndDate] = React.useState(''); //끝일
  const [kind, setKind] = React.useState('now'); //구분
  const [dayList, setDayList] = React.useState([]); //주 리스트
  const [visible, setVisible] = React.useState(false); //출석 보여주기 상태

  //날짜 일만 출력
  function getDay(date: string) {
    return new Date(date).getDate();
  }

  //1주 조회
  async function updateWeek() {
    //현재의 주 조회
    let res = await weekApi.read(startDate, kind);
    const weekDate = res.weekDate.split(',');

    //출석체크 조회
    res = await attendanceApi.read({ startDate: weekDate[0], endDate: weekDate[6] });

    //시작일/끝일/주 리스트/출석체크 셋팅
    setStartDate(prev => {
      prev = weekDate[0];
      return prev;
    });
    setEndDate(prev => {
      prev = weekDate[6];
      return prev;
    });
    setDayList(prev => {
      for (let i = 0; i < weekDate.length; i++) {
        weekDate[i] = getDay(weekDate[i]);
      }
      prev = weekDate;
      return prev;
    });
    setVisible(prev => {
      prev = res.length === 0 ? false : true;
      return prev;
    });
    setAttendanceData((prev: any) => {
      prev = res;
      return res;
    });
  }

  //이전 주
  const handlePrev = () => {
    setKind(prev => {
      prev = 'prev';
      return prev;
    });
    updateWeek();
  };

  //다음 주
  const handleNext = () => {
    setKind(prev => {
      prev = 'next';
      return prev;
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
          ＜
        </ButtonCircle>
        <div className='calendar_section'>
          <div style={{ padding: '0 72px 10px 72px' }}>
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
          <div className='attendance_all_box' style={{ backgroundColor: visible ? '#e5e5e5' : '' }}>
            {attendanceData?.map(v => (
              <div className='attendance_box'>
                <div className='text_left'>
                  <div className='circle'>
                    <img src={`${v.image_url}`} />
                  </div>
                  <p>
                    {v.attendance_date
                      ?.split(',')
                      .map(v => getDay(v) + '일')
                      ?.join(', ')}
                  </p>
                </div>
                <div className='text_right'>({v.count})</div>
              </div>
            ))}
          </div>
        </div>
        <ButtonCircle
          onClick={handleNext}
          style={{
            marginLeft: '-2rem',
            paddingLeft: '0.35rem',
            paddingTop: '0.1rem',
          }}
        >
          ＞
        </ButtonCircle>
      </div>
      {/* <div className='calendar_title'>
        <button onClick={handleAttendance()}>∨</button>
      </div> */}
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
      padding-top: 3rem;
      width: 997px;
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
  .attendance_all_box {
    padding: 1rem;
    border-radius: 0 0 0.8rem 0.8rem;
    .attendance_box {
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 2rem;
      border-radius: 0.8rem;
      padding: 1rem 2rem;
      margin: 1rem 0;
      .text_left {
        display: flex;
        align-items: center;
      }
      .text_right {
        text-align: right;
        color: ${props => props.theme.colors.gray_1};
      }
      .text_right:hover {
        color: ${props => props.theme.colors.blue_1};
      }
      .circle {
        background-color: ${props => props.theme.colors.gray_1};
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 50%;
        margin-right: 2rem;
        overflow: hidden;
        img {
          width: inherit;
          height: inherit;
        }
      }
    }
  }
`;
