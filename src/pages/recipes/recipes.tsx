import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import classes from './recipes.module.css';
import { RecipePreview } from '../../models/Recipe';
import Card from '../../components/card/card';
import DynamicGrid from '../../components/dynamin-grid/dynamic-grid';
import { ActionType } from '../../store/app-store';
import Modal from '../../components/UI/modals/modal/modal';
import Button from '../../components/UI/button/button';
import RecipeForm from '../../components/UI/forms/recipe-form/recipe-form';
import Constants from '../../utils/constants';

const Recipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootStateOrAny) => state.recipes);
  const [isLoading, setIsLoading] = useState(false);
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    if (!recipes.length) {
      setIsLoading(true);
      // setError(false);
      fetch(`${Constants.RECIPE_BOOK_HOST}/recipes`)
        .then((res) => res.json())
        .then(
          (result: any) => {
            let recipes: RecipePreview[] = [];
            result.forEach((recipe: any) => {
              recipes.push({
                id: recipe._id,
                name: recipe.name,
              });
            });
            dispatch({ type: ActionType.SetRecipes, payload: [...recipes] });
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
    }
  }, [dispatch, recipes]);

  const toggleModal = () => {
    setAddingItem((previousAddingItem) => !previousAddingItem);
  };

  return (
    <div className={classes.recipes}>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && (
        <Fragment>
          <h2>Recipes</h2>
          <DynamicGrid cols={3}>
            {recipes.map((recipe: RecipePreview, index: number) => {
              return (
                <Link key={recipe.id} to={`${recipe.id}`}>
                  <Card name={recipe.name} />
                </Link>
              );
            })}
          </DynamicGrid>
          {addingItem && (
            <Modal onClick={toggleModal} modalHeader="Add Recipe">
              <RecipeForm onClose={toggleModal} />
            </Modal>
          )}
          <div className={classes['add-button']}>
            <Button onClick={toggleModal} buttonText="Add Recipe"></Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Recipes;
