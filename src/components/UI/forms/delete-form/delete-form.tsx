import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ActionType } from '../../../../store/app-store';
import Button from '../../button/button';
import classes from './delete-form.module.css';
import Constants from '../../../../utils/constants';

const DeleteForm = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteForm = (event: any) => {
    event.preventDefault();
    deleteRecipe();
  };

  const deleteRecipe = () => {
    const dataUri = `${Constants.RECIPE_BOOK_HOST}/recipes/recipe/${props.recipeId}`;

    fetch(dataUri, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data: any) => {
        console.log(data);
        dispatch({
          type: ActionType.DeleteRecipe,
          payload: { id: props.recipeId },
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={deleteForm}>
      <div className={classes['delete-form']}>
        <Button
          buttonStyle="btn btn-secondary"
          onClick={props.cancel}
          buttonText="Cancel"
        />
        <Button
          buttonStyle="btn btn-danger"
          type="submit"
          buttonText="Delete"
        />
      </div>
    </form>
  );
};

export default DeleteForm;
