import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";
import { 
  ScoreBoard,
  PlayerScoreData,
  WinnerType,
 } from '../../Types';


export interface ScoreModel {
  scoreBoard: ScoreBoard;
  leaderBoard: PlayerScoreData[];
  incrementScore: Action<ScoreModel, WinnerType>;
  updateLeaderBoard: Action<ScoreModel, PlayerScoreData[]>;
  getLeaderBoardData: Thunk<ScoreModel>;
};

const score: ScoreModel = {
  scoreBoard: {
    player1Score: 0,
    player2Score: 0,
  },
  leaderBoard: [],
  updateLeaderBoard: action((state, payload: PlayerScoreData[]) => {
    state.leaderBoard.push(...payload);
  }),
  getLeaderBoardData: thunk(async (actions, payload) => {
    try {
      const { data } = await axios.get('/leaderboard');
      console.log('LEADERBOARD DATA: ', data);
      actions.updateLeaderBoard(data);
    } catch (err) {
      console.error(err);
    };
  }),
  incrementScore: action((state, payload: WinnerType) => {
    if (payload === 'player1') {
      state.scoreBoard.player1Score += 1;
    };
    if (payload === 'player2') {
      state.scoreBoard.player2Score += 1;
    }
  }),
};

export default score;