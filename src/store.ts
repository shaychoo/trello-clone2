import { createStore, createTypedHooks } from "easy-peasy";
import model, { StoreModel } from "./model";

const { useStoreActions, useStore, useStoreDispatch ,useStoreState} = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreDispatch, useStore ,useStoreState};

const store = createStore<StoreModel>(model);

export default store;