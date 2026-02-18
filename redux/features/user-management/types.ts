export interface IUser {
  id: string;
  name: string;
  avatar: string | null;
  username: string;
  email: string;
  phone_number: string | null;
  address: string | null;
  type: "USER" | "ADMIN" | string;
  status: "ACTIVE" | "INACTIVE" | "BANNED" | string;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  subscription_status: "free" | "PREMIUM" | "TRIAL" | string;
  avatar_url: string | null;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export type TUserStatus = string;

export interface IGetAllUsersParams {
  status?: TUserStatus;
  page?: number;
  limit?: number;
  q?: string;
}

export interface IGetAllUsersResponse {
  success: boolean;
  data: IUser[];
  meta: IPaginationMeta;
  statusCode: number;
}

// ------------------ Single User --------------

export type TShoutStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";
export type TMediaType = "IMAGE" | "VIDEO" | "AUDIO";

export interface IShoutUser {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
}

export interface IShoutMedia {
  id: string;
  created_at: string;
  type: TMediaType;
  url: string;
  duration: number | null;
  shout_id: string;
}

export interface IShoutCount {
  likes: number;
  comments: number;
  shares: number;
}

export interface IShoutLike {
  id: string;
}

export interface IShout {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: TShoutStatus;
  content: string;
  category: string;
  location: string | null;
  latitude: string | null;
  longitude: string | null;
  is_anonymous: boolean;
  user_id: string;
  original_shout_id: string | null;
  user: IShoutUser;
  medias: IShoutMedia[];
  _count: IShoutCount;
  likes: IShoutLike[];
}

export interface IGetSingleUserParams {
  id: string;
  shout_page?: number;
  shout_limit?: number;
}

export interface IGetSingleUserResponse extends IUser {
  shouts: IShout[];
  shouts_meta: IPaginationMeta;
}
