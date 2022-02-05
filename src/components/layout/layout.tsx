import RecipeDetails from '../recipe-details/recipe-details';
import Recipes from '../recipes/recipes';
import classes from './layout.module.css';

const Layout = () => {
  return (
    <div className={`container ${classes.layout}`}>
      <div className="row">
        <div className="col-md-6"><Recipes /></div>
        <div className="col-md-6"><RecipeDetails /></div>
      </div>
    </div>
  );
};

export default Layout;
