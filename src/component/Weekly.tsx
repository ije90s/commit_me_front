import React, { Children, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
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
  const now = new Date();
  const [year, setYear] = React.useState(now.getFullYear().toString()); //년
  const [month, setMonth] = React.useState((now.getMonth() + 1).toString()); //월
  const [week, setWeek] = React.useState('1'); //주차
  const [calendarList, setCalendar] = React.useState([]); //선택된 월 리스트
  const [weekList, setWeeks] = React.useState([]); //선택된 주 리스트

  //날짜 일만 출력
  function getDay(date: string) {
    return new Date(date).getDate();
  }

  //날짜 포맷 출력
  function getDateForm(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  //월 조회
  async function handleCalendar(selectedMonth = month, selectedWeek = 1) {
    let nextMonth = Number(selectedMonth);
    //월 계산
    if (selectedWeek < 1) {
      //선택된 주가 1보다 작은 경우, 이전달
      nextMonth -= 1;
    } else if (selectedWeek > calendarList.length && calendarList.length > 0) {
      //선택된 주가 막 주보다 큰 경우, 다음달
      nextMonth += 1;
      selectedWeek = 1;
    }

    //월 리스트 데이터 가공
    const res = await weekApi.monthRead(year, String(nextMonth));
    let weekDateArr = [];
    if (selectedWeek < 1) selectedWeek = res.length; //이전달은 막주로 변경
    for (const item of res) {
      const { weekNum, weekDate } = item;
      let selected = false;

      if (String(weekDate).includes(getDateForm(now)) && calendarList.length === 0)
        selectedWeek = weekNum;

      //주 선택(true | false)
      if (weekNum === selectedWeek) selected = true;
      item.selected = selected;
      item.weekDate = String(weekDate).split(',');
      if (selected) weekDateArr = item.weekDate;
    }

    //출석체크
    updateAttendance(weekDateArr);

    //셋팅
    setMonth(() => {
      return String(nextMonth);
    });

    setWeek(() => {
      return String(selectedWeek);
    });

    setCalendar(() => {
      return res;
    });
  }

  //출석체크 조회
  async function updateAttendance(weekDate: any) {
    const res = await attendanceApi.read({ startDate: weekDate[0], endDate: weekDate[6] });
    setWeeks(prev => {
      prev = weekDate;
      return prev;
    });
    setAttendanceData((prev: any) => {
      return res;
    });
  }

  //이전 주
  const handlePrev = () => {
    handleCalendar(month, Number(week) - 1);
  };

  //다음 주
  const handleNext = () => {
    handleCalendar(month, Number(week) + 1);
  };

  const handleMonth = (selectedMonth: any) => {
    handleCalendar(selectedMonth, 1);
  };

  React.useEffect(() => {
    handleCalendar(month, Number(week));
  }, []);

  return (
    <Container>
      <div className='top_section'>
        <Title style={{ marginTop: '0', marginLeft: '0' }}>출석 체크</Title>
      </div>
      <div className='calendar_title'>
        <select
          name='year'
          value={year}
          onChange={e => {
            setYear(e.currentTarget.value);
          }}
          style={{ fontSize: '2rem', lineHeight: '2rem' }}
        >
          <option key='2022' value='2022'>
            2022
          </option>
          <option key='2023' value='2022'>
            2023
          </option>
          <option key='2024' value='2022'>
            2024
          </option>
          <option key='2025' value='2022'>
            2025
          </option>
          <option key='2026' value='2022'>
            2026
          </option>
        </select>{' '}
        년{' '}
        <select
          name='month'
          value={month}
          onChange={e => {
            handleMonth(e.currentTarget.value);
          }}
          style={{ fontSize: '2rem', lineHeight: '2rem' }}
        >
          <option key='1' value='1'>
            1
          </option>
          <option key='2' value='2'>
            2
          </option>
          <option key='3' value='3'>
            3
          </option>
          <option key='4' value='4'>
            4
          </option>
          <option key='5' value='5'>
            5
          </option>
          <option key='6' value='6'>
            6
          </option>
          <option key='7' value='7'>
            7
          </option>
          <option key='8' value='8'>
            8
          </option>
          <option key='9' value='9'>
            9
          </option>
          <option key='10' value='10'>
            10
          </option>
          <option key='11' value='11'>
            11
          </option>
          <option key='12' value='12'>
            12
          </option>
        </select>{' '}
        월{' '}
        <select
          name='weeks'
          value={week}
          onChange={e => {
            const { value } = e.currentTarget;
            setWeek(value);
            handleCalendar(month, Number(value));
          }}
          style={{ fontSize: '2rem', lineHeight: '2rem' }}
        >
          {calendarList?.map((v, i) => (
            <option key={v['weekNum']} value={v['weekNum']}>
              {v['weekNum']}
            </option>
          ))}
        </select>{' '}
        주차
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
          <div className='week_section'>
            {weekList?.map((v, i) => (
              <>
                <div
                  className={cn(
                    'week_box',
                    i === now.getDay() && now.getDate() === getDay(v) ? 'now' : '',
                  )}
                >
                  <h3 className='week_title'>{weekDays[i]}</h3>
                  <p className={cn(`week_${getDay(v)}`, i === 0 ? 'sun' : i === 6 ? 'sat' : '')}>
                    {getDay(v)}
                  </p>
                </div>
              </>
            ))}
          </div>
          <div
            className={cn(
              'attendance_section',
              attendanceData?.length === 0 ? '' : 'attendance_bg',
            )}
          >
            {attendanceData?.map(v => (
              <div
                className='attendance_box'
                onMouseOver={() => {
                  v.attendance_date?.split(',').map(v => {
                    const day = getDay(v);
                    const dayId = document.querySelector(`.week_${day}`);
                    dayId?.classList.add(`week_circle${day < 10 ? '2' : ''}`);
                  });
                }}
                onMouseLeave={() => {
                  v.attendance_date?.split(',').map(v => {
                    const day = getDay(v);
                    const dayId = document.querySelector(`.week_${day}`);
                    dayId?.classList.remove(`week_circle${day < 10 ? '2' : ''}`);
                  });
                }}
              >
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
                <p className='text_right'>({v.count})</p>
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
    .calendar_section {
      border: ${props => `1px solid ${props.theme.colors.blue_1}`};
      border-radius: 0.6rem;
      width: 100%;
      .week_section {
        display: flex;
        justify-content: space-between;
        padding: 3rem 7.2rem 2rem 7.2rem;
        .week_box {
          width: 5.7rem;
          text-align: center;
          border-radius: 0.8rem;
          padding: 1.6rem 0;
        }
        .week_title {
          margin-bottom: 3rem;
          color: ${props => props.theme.colors.gray_2};
        }
        .week_circle,
        .week_circle2 {
          background-color: ${props => props.theme.colors.green};
          display: inline;
        }
        .week_circle {
          border-radius: 50%;
          padding: 0.5rem 1rem;
        }
        .week_circle2 {
          border-radius: 50%;
          padding: 0.5rem 1.6rem;
        }
        .now {
          background-color: ${props => props.theme.colors.yellow};
        }
        .sun {
          color: ${props => props.theme.colors.red};
        }
        .sat {
          color: ${props => props.theme.colors.blue_1};
        }
      }
    }
  }
  .attendance_bg {
    background-color: ${props => props.theme.colors.gray_1};
  }
  .attendance_section {
    padding: 1rem;
    border-radius: 0 0 0.6rem 0.6rem;
    .attendance_box {
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 2rem;
      border-radius: 0.8rem;
      padding: 1rem 2rem;
      margin: 1rem 0;
      &:hover {
        color: ${props => props.theme.colors.blue_1};
        .text_right {
          color: ${props => props.theme.colors.blue_1};
        }
      }
      .text_left {
        display: flex;
        align-items: center;
      }
      .text_right {
        align: right;
        color: ${props => props.theme.colors.gray_1};
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
