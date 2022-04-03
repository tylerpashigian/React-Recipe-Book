import { Fragment, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import AddIngredient from './add-ingredient';
import classes from '../add-item/add-item.module.css';
import useInput from '../../../../hooks/useInput';
import { Ingredient } from '../../../../models/Ingredient';
import { Recipe } from '../../../../models/Recipe';
import { ActionType } from '../../../../store/app-store';

const AddItem = (props: any) => {
  const dispatch = useDispatch();

  const recipes = useSelector((state: RootStateOrAny) => state.recipes);
  const [ingredients, setIngredients] = useState([] as Ingredient[]);

  const {
    inputValue: recipeName,
    isValueValid: recipeIsValid,
    isInputInvalid: recipeFormIsValid,
    valueHandler: recipeNameHandler,
    blurHandler: recipeNameBlurHandler,
    reset: resetRecipeInput,
  } = useInput((value: string) => value.trim() !== '');

  const {
    inputValue: recipeInstrcutions,
    valueHandler: recipeInstructionsHandler,
    reset: resetRecipeInstructionsInput,
  } = useInput();

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
      description: recipeInstrcutions,
      id: recipes.length + 1,
      ingredients: ingredients,
    } as Recipe;
    dispatch({ type: ActionType.AddRecipe, payload: recipe });

    clearForm();
    props.onClose();
  };

  const clearForm = () => {
    setIngredients([]);
    resetRecipeInput();
    resetRecipeInstructionsInput();
  };

  return (
    <Fragment>
      <h3>Add Recipe</h3>
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
        <AddIngredient addIngredient={addIngredient} />
        <button
          disabled={recipeFormIsValid}
          className="btn btn-primary"
          type="submit"
        >
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default AddItem;
