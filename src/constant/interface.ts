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
  avatar: "https://reqres.in/img/faces/1-image.jpg";
  email: "george.bluth@reqres.in";
  first_name: "George";
  id: 1;
  last_name: "Bluth";
}
