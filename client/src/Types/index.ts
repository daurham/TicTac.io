export type Props = {};

export type SymbolType = string | null | undefined;

export type NinthProps = {
  ninthNum: string;
  value: string;
  symbol: any;
};

export interface NinthUpdateData {
  [key: string]: '' | 'X' | 'O';
};

export type NinthTypes = any; //'ninth1' | 'ninth2' | 'ninth3' | 'ninth4' | 'ninth5' | 'ninth6' | 'ninth7' | 'ninth8' | 'ninth9';

export type BoardArrElem = {
  ninth: NinthTypes;
  value: any; //'' | 'X' | 'O';
  symbol: SymbolType;
};

export type BoardArray = BoardArrElem[];

export interface SessionObj {
  id: string | null;
  user: string | 'Audience' | null;
  player: 'player1' | 'player2' | false | null;
  playerValue: 'X' | 'O' | null;
  symbol: SymbolType;
  room: string | null;
}
export type Player = {
  id: string;
  name: string;
  player: 'player1' | 'player2';
  playerValue:  'X' | 'O' ;
  symbol: SymbolType;
}

// Statusus:
export type BoardStatusType = 'preGame' | 'inGame' | 'draw' | 'hasWinner' | null;
export type TurnStatusType = 'It\'s your turn' | 'Waiting on your opponent...' | 'Waiting for Players to join...';
export type HeaderStatusType = '' | '' | '' | null;
export type GameStatusType = 'preGame' | 'inGame' | 'draw' | 'hasWinner' | null;
export type PlayerStatusType = 'Player1 ... Player2...' | string;

export type PlayerStatObj = {
  action: 'remove' | 'add';
  player: 'player1' | 'player2';
  name: string;
}

// Score:
export interface ScoreBoard {
  player1Score: number;
  player2Score: number;
};

export interface PlayerScoreData {
  name: string;
  wins: number;
};

export type WinnerType = 'player1' | 'player2';

// Players:

export interface PlayersObj {
  player1: Player | null;
  player2: Player | null;
}

// Chat:

export interface ChatMsg {
  name: string;
  message: string;
}

export type ChatProps = {
  hidden: Boolean;
};

// Board: 

export interface Board {
  ninth1?: string;
  ninth2?: string;
  ninth3?: string;
  ninth4?: string;
  ninth5?: string;
  ninth6?: string;
  ninth7?: string;
  ninth8?: string;
  ninth9?: string;
}

export interface BoardUpdate {
  [key: string]: string
}

export type BoardKeys = 'ninth1' | 'ninth2' | 'ninth3' | 'ninth4' | 'ninth5' | 'ninth6' | 'ninth7' | 'ninth8' | 'ninth9';
