export interface IReportGetAnalyticsResponse {
    pendingReports: number,
	inReview: number,
	resolvedToday: number,
	highSeverity: number
}

export type ReportType = "USER" | "SHOUT";
export type ReportStatus = "PENDING" | "REVIEWED" | "RESOLVED" | "HIGH_SEVERITY";

export interface IReporter {
    id: string;
    name:string;
    username:string;
    avatar: string | null;
}

export interface IReportedEntity extends IReporter {
    content?:string;
    shoutId?:string;
}

export interface IReportItem {
    id:string;
    type:ReportType;
    date:string;
    reason:string;
    status: ReportStatus;
    reporter:IReporter;
    reportedEntity:IReportedEntity;
}

export interface IReportPaginationMeta {
    total:number;
    page:number;
    limit:number;
    totalPages: number;
}

export interface IGetAllReportResponse {
    data:IReportItem[];
    meta:IReportPaginationMeta;
}