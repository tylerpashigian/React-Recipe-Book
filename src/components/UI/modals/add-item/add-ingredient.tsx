import useInput from "../../../../hooks/useInput";
import { Ingredient } from "../../../../models/Ingredient";

const AddIngredient = (props: any) => {
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

    props.addIngredient(ingredient);

    resetIngredientNameInput();
    resetTngredientQuantityInput();
    resetIngredientUnitInput();
  };

  return (<div className="row mb-3">
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
</div>)
}

export default AddIngredient;