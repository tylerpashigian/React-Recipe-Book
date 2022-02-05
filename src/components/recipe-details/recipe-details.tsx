import { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Ingredient } from '../../models/Ingredient';

import classes from './recipe-details.module.css';

const RecipeDetails = () => {
  const recipe = useSelector((state: RootStateOrAny) => {
    return state.selectedItem;
  });

  return (
    <Fragment>
      {!recipe && (
        <div className={classes.noRecipe}>
          <p>Please select a recipe</p>
        </div>
      )}
      {recipe && (
        <Fragment>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          {recipe.ingredients.map((ingredient: Ingredient) => {
            return <li key={ingredient.name}>{ingredient.name}</li>;
          })}
        </Fragment>
      )}
    </Fragment>
  );
};

export default RecipeDetails;
