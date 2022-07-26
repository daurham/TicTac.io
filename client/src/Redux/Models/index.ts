import board, { BoardModel } from "./board";
import chat, { ChatModel } from "./chat";
import players, { PlayersModel } from "./players";
import statuses, { StatusesModel } from "./statuses";
import user, { UserModel } from "./user";
import score, { ScoreModel } from "./score";
/* 
TODO:

1. FINISH STATUSES
2. FINISH SCORE
3. FINISH ALL, SHIIT.. BUT INA GGOOD SPOT!

*/
export interface StoreModel {
  board: BoardModel;
  chat: ChatModel;
  players: PlayersModel;
  statuses: StatusesModel;
  user: UserModel;
  score: ScoreModel;
};

const model: StoreModel = {
  board,
  chat,
  players,
  statuses,
  user,
  score,
};

export default model;