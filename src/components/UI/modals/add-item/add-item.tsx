import { Fragment, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Ingredient } from '../../../../models/Ingredient';
import { Recipe } from '../../../../models/Recipe';
import { ActionType } from '../../../../store/app-store';

const AddItem = (props: any) => {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState('');
  const [recipeInstrcutions, setRecipeInstructions] = useState('');

  const recipes = useSelector((state: RootStateOrAny) => state.recipes);

  const recipeNameHandler = (event: any) => {
    setRecipeName(event.target.value);
  };

  const recipeInstructionsHandler = (event: any) => {
    setRecipeInstructions(event.target.value);
  };

  const [ingredients, setIngredients] = useState([] as Ingredient[]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

  const ingredientNameHandler = (event: any) => {
    setIngredientName(event.target.value);
  };

  const ingredientQuantityHandler = (event: any) => {
    setIngredientQuantity(event.target.value);
  };

  const addIngredient = (event: any) => {
    event.preventDefault();
    const tempIngredient = {
      name: ingredientName,
      quantity: +ingredientQuantity,
      unit: 'todo',
    } as Ingredient;
    setIngredients([...ingredients, tempIngredient]);

    setIngredientName('');
    setIngredientQuantity('');
  };

  const addItem = (event: any) => {
    event.preventDefault();
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
    setRecipeName('');
    setRecipeInstructions('');
  }

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
            className="form-control"
            value={recipeName}
            onChange={recipeNameHandler}
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
        {ingredients.map((ingredient: any) => {
          return <p key={ingredient.name}>{ingredient.name} {ingredient.quantity}</p>;
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
              type="text"
              className="form-control"
              value={ingredientQuantity}
              onChange={ingredientQuantityHandler}
              placeholder="Ingredient quantity"
              aria-label="Ingredient quantity"
            />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={addIngredient}>
              +
            </button>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default AddItem;
