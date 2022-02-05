import { createStore } from 'redux';

export enum ActionType {
  SelectRecipe,
}

const initalState = {
  selectedItem: null,
};

const reducer = (state: any = initalState, action: any) => {
  switch (action.type) {
    case ActionType.SelectRecipe:
      return {
        selectedItem: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
