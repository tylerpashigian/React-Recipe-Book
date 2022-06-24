import { v4 as uuidv4 } from 'uuid';

import useInput from '../../../../hooks/useInput';
import { Ingredient } from '../../../../models/Ingredient';

const IngredientForm = (props: any) => {
  const {
    inputValue: ingredientName,
    valueHandler: ingredientNameHandler,
    reset: resetIngredientNameInput,
  } = useInput(() => {}, props.ingredient?.name);

  const {
    inputValue: ingredientQuantity,
    valueHandler: ingredientQuantityHandler,
    reset: resetTngredientQuantityInput,
  } = useInput(() => {}, props.ingredient?.quantity);

  const {
    inputValue: ingredientUnit,
    valueHandler: ingredientUnitHandler,
    reset: resetIngredientUnitInput,
  } = useInput(() => {}, props.ingredient?.unit);

  const addIngredient = (event: any) => {
    event.preventDefault();
    const ingredient = {
      id: uuidv4(),
      name: ingredientName,
      quantity: +ingredientQuantity,
      unit: ingredientUnit,
    } as Ingredient;

    props.addIngredient(ingredient);

    resetIngredientNameInput();
    resetTngredientQuantityInput();
    resetIngredientUnitInput();
  };

  return (
    <div className="row mb-0 mb-md-3">
      <div className="col-md-3 mb-3 mb-md-0">
        <input
          type="text"
          className="form-control"
          value={ingredientName}
          onChange={ingredientNameHandler}
          placeholder="Ingredient name"
          aria-label="Ingredient name"
        />
      </div>
      <div className="col-md-3 mb-3 mb-md-0">
        <input
          type="number"
          className="form-control"
          value={ingredientQuantity}
          onChange={ingredientQuantityHandler}
          onKeyPress={(e) => !/^\d*\.?\d*$/.test(e.key) && e.preventDefault()}
          placeholder="Ingredient quantity"
          aria-label="Ingredient quantity"
        />
      </div>
      <div className="col-md-3 mb-3 mb-md-0">
        <input
          type="text"
          className="form-control"
          value={ingredientUnit}
          onChange={ingredientUnitHandler}
          placeholder="Ingredient unit"
          aria-label="Ingredient unit"
        />
      </div>
      <div className="col mb-3 mb-md-0">
        <button className="btn btn-primary" onClick={addIngredient}>
          +
        </button>
      </div>
    </div>
  );
};

export default IngredientForm;
