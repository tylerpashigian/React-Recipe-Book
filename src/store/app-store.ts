import { createStore } from 'redux';

export enum ActionType {
  AddRecipe,
  SetRecipes,
  UpdateRecipe,
}

const initalState = {
  recipes: [],
};

const reducer = (state: any = initalState, action: any) => {
  switch (action.type) {
    case ActionType.AddRecipe:
      return {
        recipes: [...state.recipes, action.payload],
      };
    case ActionType.SetRecipes:
      return {
        recipes: action.payload,
      };
    case ActionType.UpdateRecipe:
      let updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.id - 1] = action.payload;
      return {
        recipes: updatedRecipes,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
