export interface DashBoardStatistics {
    userData: Array<DashboardUserData>;
    reportData: Array<DashboardReportData>;
    reports: Array<DashboardReports>;
    meetings: Array<DashboardMeetings>;
}

export interface DashboardUserData {
    _id: string;
    count: number;
}

export interface DashboardReportData {
    _id: string;
    count: number;
}

export interface DashboardReports {
    _id: string;
    Title: string;
    CreatedByUserName: string;
}

export interface DashboardMeetings {
    _id: string;
    Title: string;
    CreatedByUserName: string;
}