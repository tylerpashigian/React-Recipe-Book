import Recipes from '../recipes/recipes';
import classes from './layout.module.css';

const Layout = () => {
  return (
    <div className={`container ${classes.layout}`}>
      <Recipes />
    </div>
  );
};

export default Layout;
