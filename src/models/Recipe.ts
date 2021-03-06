import { Ingredient } from './Ingredient';

export interface Recipe {
  description?: string;
  name: string;
  id: number;
  ingredients: Ingredient[];
  instructions?: string;
}

export interface RecipePreview {
  name: string;
  id: number;
}
