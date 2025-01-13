export interface INotification {
    _id: string;
    EntityName: string;
    EntityId: string;
    UserId: string;
    UserName: string;
    Permission: Array<string>;
    NotificationText: string;
    Time: string;
}