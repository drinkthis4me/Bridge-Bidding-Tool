export interface Bid {
  bidding: string;
  isAlert: boolean;
  id: number;
}

export interface History {
  handNo: number;
  dealer: string;
  vul: string;
  nIsVul: boolean;
  eIsVul: boolean;
  sequence: Bid[];
}
