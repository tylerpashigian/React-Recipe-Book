import { createStore } from 'redux';
import { RecipePreview } from '../models/Recipe';

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
      const index = updatedRecipes.findIndex(
        (recipe: RecipePreview) => recipe.id === action.payload.id
      );
      updatedRecipes[index] = action.payload;
      return {
        recipes: updatedRecipes,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
