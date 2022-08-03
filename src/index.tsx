import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ReactDOM.render(<App />, document.getElementById("root"));
const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);

// import axios, { AxiosResponse } from 'axios';
// import {
//   Accounts,
//   Attendances,
//   AttendancesResponse,
//   AccountResponse,
// } from './interface';

// //출석체크 조회
// function searchAttendance(): Promise<AxiosResponse<AttendancesResponse>> {
//   return axios.get(
//     'http://localhost:8000/attendance/search?startDate=2022-07-03&endDate=2022-07-09'
//   );
// }

// //랭킹 순위 조회
// function searchRanking(): Promise<AxiosResponse<AccountResponse>> {
//   return axios.get('http://localhost:8000/account/ranking?kind=attendances');
// }

// //startApp
// async function startApp() {
//   const attendances = await searchAttendance();
//   console.log('attendances', attendances.data);
//   const ranking = await searchRanking();
//   console.log('ranking', ranking.data);
// }

// startApp();
