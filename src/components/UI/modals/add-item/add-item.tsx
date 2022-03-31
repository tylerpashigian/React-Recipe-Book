import { Fragment, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import classes from '../add-item/add-item.module.css';
import { Ingredient } from '../../../../models/Ingredient';
import { Recipe } from '../../../../models/Recipe';
import { ActionType } from '../../../../store/app-store';

const AddItem = (props: any) => {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState('');
  const [recipeNameTouched, setRecipeNameTouched] = useState(false);
  const [recipeInstrcutions, setRecipeInstructions] = useState('');

  const recipes = useSelector((state: RootStateOrAny) => state.recipes);
  const recipeIsValid = recipeName.trim() !== '';
  const recipeFormIsInvalid = !recipeIsValid && recipeNameTouched;

  const recipeNameHandler = (event: any) => {
    setRecipeName(event.target.value);
  };

  const recipeNameBlurHandler = (event: any) => {
    setRecipeNameTouched(true);
  };

  const recipeInstructionsHandler = (event: any) => {
    setRecipeInstructions(event.target.value);
  };

  const [ingredients, setIngredients] = useState([] as Ingredient[]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('');

  const ingredientNameHandler = (event: any) => {
    setIngredientName(event.target.value);
  };

  const ingredientQuantityHandler = (event: any) => {
    setIngredientQuantity(event.target.value);
  };

  const ingredientUnitHandler = (event: any) => {
    setIngredientUnit(event.target.value);
  };

  const addIngredient = (event: any) => {
    event.preventDefault();
    const ingredient = {
      name: ingredientName,
      quantity: +ingredientQuantity,
      unit: ingredientUnit,
    } as Ingredient;
    setIngredients([...ingredients, ingredient]);

    setIngredientName('');
    setIngredientQuantity('');
    setIngredientUnit('');
  };

  const addItem = (event: any) => {
    event.preventDefault();

    setRecipeNameTouched(true);

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
    setRecipeNameTouched(false);
  };

  const clearForm = () => {
    setIngredients([]);
    setRecipeName('');
    setRecipeInstructions('');
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
            className={`form-control ${
              recipeFormIsInvalid ? 'is-invalid' : ''
            }`}
            value={recipeName}
            onChange={recipeNameHandler}
            onBlur={recipeNameBlurHandler}
          />
          {recipeFormIsInvalid && (
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
          disabled={recipeFormIsInvalid}
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
