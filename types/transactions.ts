export interface PaymentBreakdown {
  provider: string | number ;
  amount: string; 
  users: number;
}

export interface PaymentOverviewResponse {
  totalPayment: string; 
  paidUsers: number;
  breakdown: PaymentBreakdown[];
  totalCancelledRefunded: number;
  cancelledRefundedUsers: number;
}