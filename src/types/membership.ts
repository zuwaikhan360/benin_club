export interface Membership {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: "Active" | "Inactive";
  level: "Basic" | "Premium" | "VIP";
  joinDate: string; // ISO 8601 date string
  renewalDate: string; // ISO 8601 date string
  paymentInfo: string;
  wallet: {
    balance: number;
    transactions: {
      id: number;
      date: string; // ISO 8601 date string
      description: string;
      amount: number;
    }[];
  };
}
