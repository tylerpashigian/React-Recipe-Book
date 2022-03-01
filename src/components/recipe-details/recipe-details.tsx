import { Fragment } from 'react';
import { useParams } from "react-router-dom";

import classes from './recipe-details.module.css';
import { Ingredient } from '../../models/Ingredient';
import { mockRecipes } from '../../mocks/mockRecipes';

const RecipeDetails = () => {
  const params = useParams();
  // Replace this with an API request/database call once I have actual data
  const recipe = mockRecipes[+(params.recipeId || 0) - 1];
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
