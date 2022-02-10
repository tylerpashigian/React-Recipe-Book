import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import classes from './App.module.css';
import Header from './components/header/header';
import Layout from './components/layout/layout';
import RecipeDetails from './components/recipe-details/recipe-details';
import Recipes from './pages/recipes/recipes';

function App() {
  return (
    <Fragment>
      <Header />
      <main className={classes.main}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate replace to="/recipes" />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
            <Route
              path="*"
              element={<p style={{ padding: '1rem' }}>There's nothing here!</p>}
            />
          </Routes>
        </Layout>
      </main>
    </Fragment>
  );
}

export default App;
