export interface IAuthenticateRequest {
  email: string;
  password: string;
}

export interface IUserDelete {
  id: string;
}

export interface IUserRequest {
  id: string
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}