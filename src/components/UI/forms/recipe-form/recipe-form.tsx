import { Fragment, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import classes from '../recipe-form/recipe-form.module.css';
import useInput from '../../../../hooks/useInput';
import { Ingredient } from '../../../../models/Ingredient';
import { Recipe } from '../../../../models/Recipe';
import { ActionType } from '../../../../store/app-store';
import { DetailsPageType } from '../../../recipe-details/recipe-details';
import IngredientForm from './ingredient-form';

const RecipeForm = (props: any) => {
  const dispatch = useDispatch();

  const recipes = useSelector((state: RootStateOrAny) => state.recipes);
  const [ingredients, setIngredients] = useState(
    props.recipe?.ingredients || ([] as Ingredient[])
  );

  const {
    inputValue: recipeName,
    isValueValid: recipeIsValid,
    isInputInvalid: recipeFormIsValid,
    valueHandler: recipeNameHandler,
    blurHandler: recipeNameBlurHandler,
    reset: resetRecipeInput,
  } = useInput((value: string) => value.trim() !== '', props.recipe?.name);

  const {
    inputValue: recipeDescription,
    valueHandler: recipeDescriptionHandler,
    reset: resetRecipeDescriptionInput,
  } = useInput(() => {}, props.recipe?.description);

  const {
    inputValue: recipeInstrcutions,
    valueHandler: recipeInstructionsHandler,
    reset: resetRecipeInstructionsInput,
  } = useInput(() => {}, props.recipe?.instructions);

  const addIngredient = (ingredient: Ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const addItem = (event: any) => {
    event.preventDefault();

    if (!recipeIsValid) {
      return;
    }

    const recipe = {
      name: recipeName,
      description: recipeDescription,
      instructions: recipeInstrcutions,
      id:
        props.viewState === DetailsPageType.Edit
          ? props.recipe?.id || 0
          : recipes.length + 1,
      ingredients: ingredients,
    } as Recipe;

    dispatch({
      type:
        props.viewState === DetailsPageType.Edit
          ? ActionType.UpdateRecipe
          : ActionType.AddRecipe,
      payload: recipe,
    });

    clearForm();
    props.onClose();
  };

  const clearForm = () => {
    setIngredients([]);
    resetRecipeInput();
    resetRecipeDescriptionInput();
    resetRecipeInstructionsInput();
  };

  return (
    <Fragment>
      <form onSubmit={addItem}>
        <div className="mb-3">
          <label htmlFor="recipe-name" className="form-label">
            Recipe Name
          </label>
          <input
            type="text"
            id="recipe-name"
            className={`form-control ${recipeFormIsValid ? 'is-invalid' : ''}`}
            value={recipeName}
            onChange={recipeNameHandler}
            onBlur={recipeNameBlurHandler}
          />
          {recipeFormIsValid && (
            <p className={classes['error-text']}>Please enter a recipe name</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="recipe-description" className="form-label">
            Recipe Description
          </label>
          <input
            type="text"
            id="recipe-description"
            className="form-control"
            value={recipeDescription}
            onChange={recipeDescriptionHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recipe-instructions" className="form-label">
            Instructions
          </label>
          <textarea
            id="recipe-instructions"
            className="form-control"
            rows={3}
            value={recipeInstrcutions}
            onChange={recipeInstructionsHandler}
          />
        </div>
        {ingredients.map((ingredient: any, index: number) => {
          return (
            <p key={index}>
              {ingredient.name} ({ingredient.quantity} {ingredient.unit})
            </p>
          );
        })}
        <IngredientForm addIngredient={addIngredient} />
        <button
          disabled={recipeFormIsValid}
          className="btn btn-primary"
          type="submit"
        >
          {props.viewState === DetailsPageType.Edit ? 'Save' : 'Add'}
        </button>
      </form>
    </Fragment>
  );
};

export default RecipeForm;
