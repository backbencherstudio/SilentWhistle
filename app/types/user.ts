export interface BaseUser {
  id: string;
  name: string;
  username: string;
  status: "Active" | "Inactive";
  avatar?: string;
  email?: string;
  joinedDate?: string;
  documentCount?: number;
}

export interface UserProfileData extends BaseUser {
  email: string;
  joinedDate: string;
  documentCount: number;

  location?: string;
  role?: string;
  totalPosts?: number;
  reportsAgainst?: number;
}

export interface UserFinance {
  transactionId: string;
  date: string;
  amount: number;
  paymentPlan: "Yearly" | "Monthly";
}

export interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfileData | null;
}
