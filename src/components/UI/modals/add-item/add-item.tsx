import { Fragment, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import classes from '../add-item/add-item.module.css';
import { Ingredient } from '../../../../models/Ingredient';
import { Recipe } from '../../../../models/Recipe';
import { ActionType } from '../../../../store/app-store';
import useInput from '../../../../hooks/useInput';

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

  const {
    inputValue: ingredientName,
    valueHandler: ingredientNameHandler,
    reset: resetIngredientNameInput,
  } = useInput();

  const {
    inputValue: ingredientQuantity,
    valueHandler: ingredientQuantityHandler,
    reset: resetTngredientQuantityInput,
  } = useInput();

  const {
    inputValue: ingredientUnit,
    valueHandler: ingredientUnitHandler,
    reset: resetIngredientUnitInput,
  } = useInput();

  const addIngredient = (event: any) => {
    event.preventDefault();
    const ingredient = {
      name: ingredientName,
      quantity: +ingredientQuantity,
      unit: ingredientUnit,
    } as Ingredient;
    setIngredients([...ingredients, ingredient]);

    resetIngredientNameInput();
    resetTngredientQuantityInput();
    resetIngredientUnitInput();
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
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={ingredientName}
              onChange={ingredientNameHandler}
              placeholder="Ingredient name"
              aria-label="Ingredient name"
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              value={ingredientQuantity}
              onChange={ingredientQuantityHandler}
              onKeyPress={(e) =>
                !/^\d*\.?\d*$/.test(e.key) && e.preventDefault()
              }
              placeholder="Ingredient quantity"
              aria-label="Ingredient quantity"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={ingredientUnit}
              onChange={ingredientUnitHandler}
              placeholder="Ingredient unit"
              aria-label="Ingredient unit"
            />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={addIngredient}>
              +
            </button>
          </div>
        </div>
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
