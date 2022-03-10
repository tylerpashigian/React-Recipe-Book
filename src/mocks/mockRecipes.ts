import { Recipe } from "../models/Recipe";

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: 'Pesto',
    ingredients: [
      { name: 'Rotini Pasta', quantity: 1, unit: 'box' },
      { name: 'Pesto mix', quantity: 1, unit: 'packet' },
      { name: 'Italian sausage', quantity: 8, unit: 'oz' },
    ],
    description: 'My go to pasta dish',
  },
  {
    id: 2,
    name: 'Orange Chicken',
    ingredients: [
      { name: 'Ground chicken', quantity: 2, unit: 'lb' },
      { name: 'Orange', quantity: 1, unit: 'item' },
      { name: 'Brown rice', quantity: 0.5, unit: 'cup' },
    ],
    description: 'Single pan, healthier version of Panda Express',
  },
  {
    id: 3,
    name: 'Carne Asada',
    ingredients: [
      { name: 'Flank steak', quantity: 1, unit: 'lb' },
      { name: 'Corn', quantity: 3, unit: 'items' },
      { name: 'Jalapeño', quantity: 2, unit: 'items' },
    ],
  },
];