import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import classes from './recipes.module.css';
import { Recipe } from '../../models/Recipe';
import Card from '../../components/card/card';
import DynamicGrid from '../../components/dynamin-grid/dynamic-grid';
import { ActionType } from '../../store/app-store';
import { mockRecipes } from '../../mocks/mockRecipes';
import Modal from '../../components/UI/modals/modal/modal';
import AddItem from '../../components/UI/modals/add-item/add-item';
import Button from '../../components/UI/button/button';

const Recipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootStateOrAny) => state.recipes);
  const [isLoading, setIsLoading] = useState(false);
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    if (!recipes.length) {
      // Demo to represent loading functionality until I get a database set up
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        dispatch({ type: ActionType.SetRecipes, payload: [...mockRecipes] });
      }, 1000);
    }
  }, [dispatch, recipes]);

  const toggleModal = () => {
    setAddingItem(previousAddingItem => !previousAddingItem);
  };

  return (
    <div className={classes.recipes}>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && (
        <Fragment>
          <h2>Recipes</h2>
          <DynamicGrid cols={3}>
            {recipes.map((recipe: Recipe, index: number) => {
              return (
                <Link key={recipe.id} to={`${recipe.id}`}>
                  <Card name={recipe.name} />
                </Link>
              );
            })}
          </DynamicGrid>
          {addingItem && (
            <Modal onClick={toggleModal}>
              <AddItem onClose={toggleModal} />
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
