// Request response parameters (excluding data)
export interface Result {
  code: string;
  msg: string;
}

// Request response parameters (including data)
export interface ResultData<T = any> extends Result {
  data: T;
}

// paging request parameters
export interface ReqPage {
  current?: number;
  pageSize?: number;
}

// paging response parameters
export interface ResPage<T> {
  list: T[];
  current: number;
  pageSize: number;
  total: number;
}

export interface ReqLogin {
  username: string;
  password: string;
}

export interface ResLogin {
  access_token: string;
}

export interface UserList {
  id: string;
  username: string;
  gender: 1 | 2;
  age: number;
  idCard: string;
  email: string;
  address: string;
  createTime: string;
  status: boolean;
  avatar: string;
}
