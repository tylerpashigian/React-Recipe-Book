import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './recipe-details.module.css';
import { Ingredient } from '../../models/Ingredient';
import { RootStateOrAny, useSelector } from 'react-redux';
import Button from '../UI/button/button';
import RecipeForm from '../UI/forms/recipe-form/recipe-form';

export enum DetailsPageType {
  Details,
  Edit,
}

const RecipeDetails = () => {
  const params = useParams();
  // TODO: Replace this with an API request/database call once I have actual data
  const recipes = useSelector((state: RootStateOrAny) => state.recipes);

  const [recipe, setRecipe] = useState(recipes[+(params.recipeId || 0) - 1]);
  const [viewState, setViewState] = useState(DetailsPageType.Details);

  const toggleViewState = () => {
    setViewState((previousViewState) =>
      previousViewState === DetailsPageType.Details
        ? DetailsPageType.Edit
        : DetailsPageType.Details
    );
  };

  useEffect(() => {
    setRecipe(recipes[+(params.recipeId || 0) - 1]);
  }, [recipes, params.recipeId]);

  return (
    <>
      {!recipe && (
        <div className={classes.noRecipe}>
          <p>Recipe Does Not Exist</p>
        </div>
      )}
      {recipe && (
        <>
          {viewState === DetailsPageType.Details && (
            <>
              <h3>{recipe.name}</h3>
              {recipe.description && (
                <p className={classes.recipeDescription}>
                  {recipe.description}
                </p>
              )}
              {recipe.instructions && (
                <p className={classes.recipeInstructions}>
                  {recipe.instructions}
                </p>
              )}
              {recipe.ingredients.map(
                (ingredient: Ingredient, index: number) => {
                  return (
                    <li key={index}>
                      {ingredient.name} ({ingredient.quantity} {ingredient.unit}
                      )
                    </li>
                  );
                }
              )}
            </>
          )}
          {viewState === DetailsPageType.Edit && (
            <RecipeForm
              recipe={recipe}
              viewState={viewState}
              onClose={toggleViewState}
            ></RecipeForm>
          )}
          <div className={classes['edit-save-button']}>
            <Button
              onClick={toggleViewState}
              buttonText={
                viewState === DetailsPageType.Details ? 'Edit' : 'Cancel'
              }
            ></Button>
          </div>
        </>
      )}
    </>
  );
};

export default RecipeDetails;
