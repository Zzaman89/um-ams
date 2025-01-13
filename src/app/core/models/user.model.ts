export interface IUser {
    _id: string;
    Name: string;
    Email: string;
    Role: string;
    IsSystemBlocked: boolean;
}

export interface IUserList {
    Data: Array<IUser>
    Total: number;
}