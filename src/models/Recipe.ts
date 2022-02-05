import { Ingredient } from "./Ingredient";

export interface Recipe {
  name: string;
  id: number;
  ingredients: Ingredient[];
  description?: string;
}