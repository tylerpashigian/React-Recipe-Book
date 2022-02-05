import classes from './card.module.css';

const Card = (props: any) => {
  const clickHandler = () => {
    props.clickHander(props.recipe)
  };

  return (
    <div className={classes.card} onClick={clickHandler}>
      <p>{props.recipe.name}</p>
    </div>
  );
};

export default Card;
