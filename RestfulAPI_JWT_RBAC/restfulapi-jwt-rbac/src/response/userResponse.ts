export class UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this as UserResponse, partial);
  }
}
