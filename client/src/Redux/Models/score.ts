import axios from "axios";
import { action, Action, ActionOn, Actions, thunk, Thunk } from "easy-peasy";


interface ScoreBoard {
  player1Score: number;
  player2Score: number;
};

interface PlayerScoreData {
  name: string;
  wins: number;
};

type Winner = 'player1' | 'player2';

export interface ScoreModel {
  scoreBoard: ScoreBoard;
  leaderBoard: PlayerScoreData[];
  incrementScore: Action<ScoreModel, Winner>;
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
  incrementScore: action((state, payload: Winner) => {
    if (payload === 'player1') {
      state.scoreBoard.player1Score += 1;
    };
    if (payload === 'player2') {
      state.scoreBoard.player2Score += 1;
    }
  }),
};

export default score;