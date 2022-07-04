import { Recipe } from '../models/Recipe';

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: 'Pesto',
    ingredients: [
      { id: '1', name: 'Rotini Pasta', quantity: 1, unit: 'box' },
      { id: '2', name: 'Pesto mix', quantity: 1, unit: 'packet' },
      { id: '3', name: 'Italian sausage', quantity: 8, unit: 'oz' },
    ],
    description: 'My go to pasta dish',
  },
  {
    id: 2,
    name: 'Orange Chicken',
    ingredients: [
      { id: '1', name: 'Ground chicken', quantity: 2, unit: 'lb' },
      { id: '2', name: 'Orange', quantity: 1, unit: 'item' },
      { id: '3', name: 'Brown rice', quantity: 0.5, unit: 'cup' },
    ],
    description: 'Single pan, healthier version of Panda Express',
  },
  {
    id: 3,
    name: 'Carne Asada',
    ingredients: [
      { id: '1', name: 'Flank steak', quantity: 1, unit: 'lb' },
      { id: '2', name: 'Corn', quantity: 3, unit: 'items' },
      { id: '3', name: 'Jalapeño', quantity: 2, unit: 'items' },
    ],
  },
];
