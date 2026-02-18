export type Period = "week" | "month" | "year" | "all";

export type IDashboartOverviewPeriodParams = {
  period: Period;
};

export interface IDashboartOverviewPeriodResponse {
  totalUsers: TotalUsers;
  totalShouts: TotalShouts;
  totalReports: TotalReports;
  shoutCategories: ShoutCategory[];
  overview: Overview[];
}

export interface TotalUsers {
  total: number;
  active: number;
  inactive: number;
}

export interface TotalShouts {
  total: number;
  text: number;
  voice: number;
}

export interface TotalReports {
  total: number;
  pending: number;
  resolved: number;
}

export interface ShoutCategory {
  category: string;
  textPosts: number;
  voicePosts: number;
}

export interface Overview {
  label: string;
  active: number;
  anonymous: number;
}
