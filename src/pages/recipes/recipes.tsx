import { Fragment, useEffect, useState } from 'react';

import classes from './recipes.module.css';
import { Recipe } from '../../models/Recipe';
import Card from '../../components/card/card';
import DynamicGrid from '../../components/dynamin-grid/dynamic-grid';
import { Link, Outlet } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../store/app-store';

const Recipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootStateOrAny) => state.recipes);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!recipes.length) {
      // Demo to represent loading functionality until I get a database set up
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        dispatch({ type: ActionType.SetRecipes, payload: [...mockRecipes] })
      }, 1000);
    }
  }, [dispatch, recipes]);

  return (
    <Fragment>
      <div className={classes.recipes}>
        {isLoading && <h3>Loading...</h3>}
        {!isLoading && (
          <Fragment>
            <h2>Recipes</h2>
            <DynamicGrid cols={3}>
              {recipes.map((recipe: Recipe, index: number) => {
                return (
                  <Link key={recipe.id} to={`${recipe.id}`}>
                    <Card name={recipe.name} />
                  </Link>
                );
              })}
            </DynamicGrid>
          </Fragment>
        )}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Recipes;

export const mockRecipes: Recipe[] = [
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
