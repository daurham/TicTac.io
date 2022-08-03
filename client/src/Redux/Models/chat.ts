import { Action, action, actionOn, ActionOn } from "easy-peasy";
import { ChatMsg } from "../../Types";

export interface ChatModel {
  feed: ChatMsg[];
  chatIsHidden: Boolean;
  addToFeed: Action<ChatModel, ChatMsg>;
  onAddToFeed?: ActionOn<ChatModel, ChatMsg>;
  afterAddToFeed: Action<ChatModel>;
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
    if (state.chatIsHidden === true) {
      state.chatMessagesUnseen = 0;
      state.chatMessagesSeen = state.feed.length;
    }
    state.chatIsHidden = !state.chatIsHidden;
  }),
  addToFeed: action((state, payload: ChatMsg) => {
    console.log(payload);
    state.feed.push(payload);
  }),
  afterAddToFeed: action((state, payload) => {
      state.chatMessagesTotal += 1;
      if (state.chatIsHidden === true) {
        state.chatMessagesUnseen += 1;
      } else {
        state.chatMessagesSeen += 1;
      }
    }),
};

export default chat;