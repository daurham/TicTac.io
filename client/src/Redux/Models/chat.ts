import { Action, action, actionOn, ActionOn } from "easy-peasy";

interface ChatMsg {
  name: string;
  message: string;
}


export interface ChatModel {
  feed: ChatMsg[];
  chatIsHidden: Boolean;
  addToFeed: Action<ChatModel, ChatMsg>;
  onAddToFeed: ActionOn<ChatModel, ChatMsg>;
  toggleChat: Action<ChatModel>;
  chatMessagesTotal: number;
  chatMessagesUnseen: number;
  chatMessagesSeen: number;
}

const chat: ChatModel = {
  feed: [],
  chatIsHidden: true,
  chatMessagesSeen: 0,
  chatMessagesUnseen: 0,
  chatMessagesTotal: 0,
  toggleChat: action((state, payload) => {
    state.chatIsHidden = !state.chatIsHidden;
  }),
  addToFeed: action((state, payload: ChatMsg) => {
    state.feed.push(payload);
  }),
  onAddToFeed: actionOn(actions => actions.addToFeed,
    (state, target) => {
      state.chatMessagesTotal += 1;
      if (state.chatIsHidden === true) {
        state.chatMessagesUnseen += 1;
      } else {
        state.chatMessagesSeen += 1;
      }
    }),
};

export default chat;