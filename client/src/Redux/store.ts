import { createStore, createTypedHooks } from "easy-peasy";
import model, { StoreModel } from "./Models";

const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreDispatch, useStoreState };

const store = createStore(model);

export default store;