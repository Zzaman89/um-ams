export interface IMeeting {
    _id: string;
    Title: string;
    CreatedByUserId: string;
    CreatedByUserName: string;
    Description: string;
    StartingDate: Date;
    EndingDate: Date;
    InvitedUsers: Array<{
        UserId: string;
        UserName: string;
    }>
    MeetingLink: string;
}