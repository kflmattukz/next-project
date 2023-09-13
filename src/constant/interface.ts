export interface LoginProps {
  username?: string;
  email?: string;
  password: string;
}

export interface RegisterProps extends LoginProps {
  firstname: string;
  lastname: string;
}

export interface User {
  email: string;
  password: string;
  id: number | string;
  createdAt: Date | string;
}

export interface ListUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
