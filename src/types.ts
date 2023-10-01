// 0: 'club'; 1: 'diamond'; 2: 'heart'; 3: 'spade'; 4: 'no-trump'
// export type Suit = 0 | 1 | 2 | 3 | 4
export enum Suit {
  c,
  d,
  h,
  s,
  nt
}

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7

export type Call = 'Bid' | 'P' | 'Dbl' | 'RDbl'

export interface BaseBid {
  id: number
  isAlert: boolean
}

export interface ProactiveBid extends BaseBid {
  call: 'Bid'
  suit: Suit
  level: Level
}

export interface PassBid extends BaseBid {
  call: 'P'
}

export interface PenaltyBid extends BaseBid {
  call: Exclude<Call, 'Bid' | 'P'>
}

export type Bid = ProactiveBid | PassBid | PenaltyBid

// 0: none; 1: N-S; 2: E-W; 3: both
export type Vulnerability = 0 | 1 | 2 | 3

export interface History {
  handNo: number
  dealer: string
  vulnerability: Vulnerability
  sequence: Bid[]
  result?: number
}
