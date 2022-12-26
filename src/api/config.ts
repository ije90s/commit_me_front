import axios from 'axios';

//** 로컬 */
export const commitLocal = axios.create({
  baseURL: 'http://localhost:8000/',
});

//** 서버 */
export const commitReal = axios.create({
  baseURL: 'https://commitme-server.herokuapp.com/',
});

export const Account = 'account';
export const Attendance = 'attendance';
export const History = 'history';

interface IUserInfo {
  user_id: string;
  attendance_date: string;
}
interface IAttendanceDate {
  startDate: string;
  endDate: string;
}
interface IProps {
  page?: number;
  name?: string;
  userInfo?: IUserInfo;
  attendanceDate?: IAttendanceDate;
}

export const accountApi = {
  rankingRead: (name: string) =>
    commitLocal
      .get(`${Account}/ranking?kind=${name}`)
      .then(res => {
        return res.data.map((v: any, i: number) => ({ ...v, key: i + 1 }));
      })
      .catch(err => console.log(err)),
  rankingUpdate: () =>
    commitLocal
      .put(`${Account}/ranking-update`)
      .then(res => res.data)
      .catch(err => console.log(err)),
};
export const attendanceApi = {
  register: (userInfo: IUserInfo) =>
    commitLocal
      .post(`${Attendance}/register`, {
        user_id: userInfo.user_id,
        attendance_date: userInfo.attendance_date,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  read: (attendanceDate: IAttendanceDate) =>
    commitLocal
      .get(
        `${Attendance}/search?startDate=${attendanceDate.startDate}&endDate=${attendanceDate.endDate}`,
      )
      .then(res => res.data)
      .catch(err => console.log(err)),
};

export const historyApi = {
  read: () =>
    commitLocal
      .get(`${History}?kind=commits`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  detail: () =>
    commitLocal
      .get(`${History}/detail?kind=pulls`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  accure: (page: IProps) =>
    commitLocal
      .post(`${History}/register?kind=pull_comments&page=${page}`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  delete: () =>
    commitLocal
      .delete(`${History}/remove?kind=comments`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
};

export const weekApi = {
  weekRead: (startDate: string, kind: string) =>
    commitLocal
      .get(`week-search?startDate=${startDate}&kind=${kind}`)
      .then(res => res.data)
      .catch(err => console.log(err)),
  monthRead: (year: string, month: string) =>
    commitLocal
      .get(`month-week-search?year=${year}&month=${month}`)
      .then(res => res.data)
      .catch(err => console.log(err)),
};
