export interface IUser {
  userName: string;
  email: string;
  emailConfirmed?: boolean;
  displayName: string;
  imgUrl?: string;
  password?: string;
  passwordHash?: string;
  accessToken?: string;

  update(user: IUser): IUser;
  otherUsersWithSameUserNameOrEmail(users: IUserArgs[]): boolean;
}

export interface IUserArgs {
  userName: string;
  email: string;
  emailConfirmed?: boolean;
  displayName: string;
  imgUrl?: string;
  password?: string;
  passwordHash?: string;
}

export interface IUserForLog {
  id: string;
  userName: string;
  email: string;
  displayName: string;
}


export class User implements IUserArgs {
  // tslint:disable-next-line:variable-name
  _id: string;
  userName: string;
  email: string;
  admin: boolean;
  displayName: string;
}
