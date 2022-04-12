import classes from '../backdrop/backdrop.module.css';

const Backdrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

export default Backdrop;
