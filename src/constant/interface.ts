export interface LoginProps {
  username?: string;
  email?: string;
  password: string;
}

export interface RegisterProps extends LoginProps {
  firstname: string;
  lastname: string;
}
