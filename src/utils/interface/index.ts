export interface RankingData {
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

export interface AttendanceData {
  image_url: string;
  attendance_date: string;
  count: number;
}

export type RankingArray = RankingData[];

export type AttendanceArray = AttendanceData[];
