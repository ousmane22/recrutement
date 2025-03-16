import { User } from "./user.model";

export interface LoginResponse {
  message: string;
  status: number;
  data: {
    token: string;
    user: User;
  };
}
