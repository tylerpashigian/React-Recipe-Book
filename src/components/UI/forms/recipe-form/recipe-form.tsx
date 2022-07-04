import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import classes from '../recipe-form/recipe-form.module.css';
import useInput from '../../../../hooks/useInput';
import { Ingredient } from '../../../../models/Ingredient';
import { Recipe } from '../../../../models/Recipe';
import { ActionType } from '../../../../store/app-store';
import {
  DetailsPageType,
  IngredientType,
} from '../../../recipe-details/recipe-details';
import IngredientForm from './ingredient-form';
import Constants from '../../../../utils/constants';

const RecipeForm = (props: any) => {
  const dispatch = useDispatch();

  const [ingredients, setIngredients] = useState(
    props.recipe?.ingredients || ([] as Ingredient[])
  );
  const [editableIngredient, setEditableIngredient] = useState(
    null as Ingredient | null
  );
  const [ingredientFormState, setIngredientFormState] = useState(
    IngredientType.Add
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

  const submitRecipe = (recipe: any, id?: number) => {
    const method = id ? 'PUT' : 'POST';
    const dataUri = id
      ? `${Constants.RECIPE_BOOK_HOST}/recipes/recipe/${id}`
      : `${Constants.RECIPE_BOOK_HOST}/recipes/recipe/add`;

    fetch(dataUri, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
      .then((response) => response.json())
      .then((data: Recipe) => {
        dispatch({
          type:
            props.viewState === DetailsPageType.Edit
              ? ActionType.UpdateRecipe
              : ActionType.AddRecipe,
          payload: data,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
      ingredients: ingredients,
    };

    submitRecipe(recipe, props.recipe?._id);

    clearForm();
    props.onClose({ id: props.recipe?._id, ...recipe });
  };

  const editIngredient = (ingredient: Ingredient) => {
    setIngredientFormState(IngredientType.Edit);
    setEditableIngredient(ingredient);
  };

  const updateIngredient = (updatedIngredient: Ingredient) => {
    const newIngredients = [...ingredients].map((ingredient: Ingredient) => {
      return editableIngredient?.id === ingredient.id
        ? updatedIngredient
        : ingredient;
    });

    setIngredients(newIngredients);

    // submitRecipe(
    //   { ...props.recipe, ingredients: newIngredients },
    //   props.recipe?._id
    // );

    setEditableIngredient(null);
    setIngredientFormState(IngredientType.Add);
  };

  const deleteIngredient = (id: string) => {
    const updatedIngredients = [...ingredients].filter(
      (ingredient: Ingredient) => ingredient.id !== id
    );
    setIngredients(updatedIngredients);
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
        {ingredients.map((ingredient: any) => {
          return (
            <div key={ingredient.id} className={classes.ingredient}>
              <p>
                {ingredient.name} ({ingredient.quantity} {ingredient.unit})
              </p>
              <div onClick={() => deleteIngredient(ingredient.id)}>
                <FontAwesomeIcon icon={faClose} />
              </div>
              <div onClick={() => editIngredient(ingredient)}>
                <FontAwesomeIcon icon={faEdit} />
              </div>
            </div>
          );
        })}
        <IngredientForm
          addIngredient={addIngredient}
          ingredient={editableIngredient}
          viewState={ingredientFormState}
          updateIngredient={updateIngredient}
        />
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
