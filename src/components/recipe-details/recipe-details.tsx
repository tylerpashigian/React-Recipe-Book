import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './recipe-details.module.css';
import { Ingredient } from '../../models/Ingredient';
import Button from '../UI/button/button';
import RecipeForm from '../UI/forms/recipe-form/recipe-form';
import { Recipe } from '../../models/Recipe';
import Constants from '../../utils/constants';
import Modal from '../UI/modals/modal/modal';
import DeleteForm from '../UI/forms/delete-form/delete-form';

export enum DetailsPageType {
  Details,
  Edit,
}

export enum IngredientType {
  Add,
  Edit,
}

const RecipeDetails = () => {
  const params = useParams();

  const [deletingRecipe, setDeletingRecipe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState(null as Recipe | null);
  const [viewState, setViewState] = useState(DetailsPageType.Details);

  const toggleViewState = () => {
    setViewState((previousViewState) =>
      previousViewState === DetailsPageType.Details
        ? DetailsPageType.Edit
        : DetailsPageType.Details
    );
  };

  const closeModal = (recipe: Recipe) => {
    setRecipe(recipe);
    toggleViewState();
  };

  const toggleDelete = () => {
    setDeletingRecipe((previousState) => !previousState);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${Constants.RECIPE_BOOK_HOST}/recipes/recipe/${params.recipeId}`)
      .then((res) => res.json())
      .then(
        (recipe: Recipe) => {
          setRecipe(recipe);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
          // setError(true);
        }
      )
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        // setError(true);
      });
  }, [params.recipeId]);

  return (
    <>
      {isLoading && <h3>Loading...</h3>}
      {recipe && !isLoading && (
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
              {recipe.ingredients.map((ingredient: Ingredient) => {
                return (
                  <li key={ingredient.id}>
                    {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                  </li>
                );
              })}
              {deletingRecipe && (
                <Modal onClick={toggleDelete} modalHeader="Delete Recipe">
                  <DeleteForm
                    cancel={toggleDelete}
                    recipeId={params.recipeId}
                  />
                </Modal>
              )}
            </>
          )}
          {viewState === DetailsPageType.Edit && (
            <RecipeForm
              recipe={recipe}
              viewState={viewState}
              onClose={closeModal}
            ></RecipeForm>
          )}
          <div className={classes['edit-save-button']}>
            {viewState === DetailsPageType.Details && (
              <Button
                onClick={toggleDelete}
                buttonText="Delete"
                buttonStyle="btn btn-danger"
              ></Button>
            )}
            <Button
              onClick={toggleViewState}
              buttonText={
                viewState === DetailsPageType.Details ? 'Edit' : 'Cancel'
              }
            ></Button>
          </div>
        </>
      )}
      {!recipe && !isLoading && (
        <div className={classes.noRecipe}>
          <p>Recipe Does Not Exist</p>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
