export interface TransactionType {
  sender: {
    address: string;
    chain: string;
  };
  receiver: {
    address: string;
    chain: string;
  };

  sentToken: Array<{
    symbol: string;
    contractAddress?: string;
    amount: number;
    logo?: string;
  }>;

  receivedToken: Array<{
    symbol: string;
    contractAddress?: string;
    amount: number;
    logo?: string;
  }>;

  type:
    | "DEPOSIT"
    | "WITHDRAWAL"
    | "APPROVAL"
    | "LP-DEPOSIT"
    | "LP-WITHDRAWAL"
    | "STAKE"
    | "UNSTAKE"
    | "SWAP"
    | "FEE"
    | "TRANSFER"
    | "STAKE";

  timestamp: number; // milliseconds
}
