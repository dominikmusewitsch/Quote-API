export interface User {
  username: string;
  password: string;
}

export interface UserAuth {
  username: string;
  roles: string[];
  id: number;
}

export interface UserPayload {
  username: string;
  sub: number;
  roles: string[];
}
