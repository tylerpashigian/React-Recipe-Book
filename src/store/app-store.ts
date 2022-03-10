import { createStore } from 'redux';

export enum ActionType {
  AddRecipe,
  SetRecipes,
}

const initalState = {
  recipes: [],
};

const reducer = (state: any = initalState, action: any) => {
  switch (action.type) {
    case ActionType.AddRecipe:
      return {
        recipes: [...state.recipes, action.payload]
      }
    case ActionType.SetRecipes:
      return {
        recipes: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
