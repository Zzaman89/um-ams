export interface IReport {
    _id: string;
    Title: string;
    CreatedByUserId: string;
    CreatedByUserName: string;
    Description: string;
    CreatedDate: Date;
    ApprovedDate: Date;
    RequestedAssessor: Array<{
        UserId: string;
        UserName: string;
    }>
    FileLink: string;
    Status: string;
}