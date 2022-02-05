import { useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';

import classes from './recipes.module.css';
import { ActionType } from '../../store/app-store';
import { Recipe } from '../../models/Recipe';
import Card from '../card/card';
import DynamicGrid from '../dynamin-grid/dynamic-grid';

const Recipes = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Demo to represent loading functionality until I get a database set up
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const recipes: Recipe[] = [
    {
      id: 1,
      name: 'Pesto',
      ingredients: [
        { name: 'Rotini Pasta', quntity: 1, unit: 'box' },
        { name: 'Pesto mix', quntity: 1, unit: 'packet' },
        { name: 'Italian sausage', quntity: 8, unit: 'oz' },
      ],
      description: 'My go to pasta dish',
    },
    {
      id: 2,
      name: 'Orange Chicken',
      ingredients: [
        { name: 'Ground chicken', quntity: 2, unit: 'lb' },
        { name: 'Orange', quntity: 1, unit: 'item' },
        { name: 'Brown rice', quntity: 0.5, unit: 'cup' },
      ],
      description: 'Single pan, healthier version of Panda Express',
    },
    {
      id: 3,
      name: 'Carne Asada',
      ingredients: [
        { name: 'Flank steak', quntity: 1, unit: 'lb' },
        { name: 'Corn', quntity: 3, unit: 'items' },
        { name: 'Jalapeño', quntity: 2, unit: 'items' },
      ],
    },
  ];

  const clickHandler = (recipe: Recipe) => {
    dispatch({ type: ActionType.SelectRecipe, payload: recipe });
  };

  return (
    <div className={classes.recipes}>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && (
        <Fragment>
          <h2>Recipes</h2>
          <DynamicGrid cols={3}>
            {recipes.map((recipe: Recipe, index: number) => {
              return (
                <Card
                  key={recipe.id}
                  recipe={recipe}
                  clickHander={clickHandler}
                />
              );
            })}
          </DynamicGrid>
        </Fragment>
      )}
    </div>
  );
};

export default Recipes;
