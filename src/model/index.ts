import user, { UserModel } from "./user";
import board, { BoardModel } from "./board";

export interface StoreModel {
  user: UserModel;
  board: BoardModel
};

const model: StoreModel = {
  user,
  board
};

export default model;