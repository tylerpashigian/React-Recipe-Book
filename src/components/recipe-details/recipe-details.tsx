import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import classes from './recipe-details.module.css';
import { Ingredient } from '../../models/Ingredient';
import { RootStateOrAny, useSelector } from 'react-redux';

const RecipeDetails = () => {
  const params = useParams();
  // TODO: Replace this with an API request/database call once I have actual data
  const recipes = useSelector((state: RootStateOrAny) => state.recipes);
  const recipe = recipes[+(params.recipeId || 0) - 1];
  return (
    <Fragment>
      {!recipe && (
        <div className={classes.noRecipe}>
          <p>Recipe Does Not Exist</p>
        </div>
      )}
      {recipe && (
        <Fragment>
          <h3>{recipe.name}</h3>
          <p className={classes.recipeInstructions}>{recipe.description}</p>
          {recipe.ingredients.map((ingredient: Ingredient, index: number) => {
            return (
              <li key={index}>
                {ingredient.name} ({ingredient.quantity} {ingredient.unit})
              </li>
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
};

export default RecipeDetails;
