  import { Fragment } from 'react';
import classes from './App.module.css';
import Header from './components/header/header';
import Layout from './components/layout/layout';

function App() {
  return (
    <Fragment>
      <Header />
      <main className={classes.main}>
        <Layout />
      </main>
    </Fragment>
  );
}

export default App;
