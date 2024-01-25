export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  email: string;
  client: "host" | "guest";
}

export interface RegisterFin {
  key: string;
  password: string;
  passwordAgain: string;
  fullName: string;
  type: "member" | "host";
}
