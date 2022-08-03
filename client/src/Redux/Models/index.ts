import board, { BoardModel } from "./board";
import chat, { ChatModel } from "./chat";
import players, { PlayersModel } from "./players";
import statuses, { StatusesModel } from "./statuses";
import user, { UserModel } from "./user";
import score, { ScoreModel } from "./score";



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