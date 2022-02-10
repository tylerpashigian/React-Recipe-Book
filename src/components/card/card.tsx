import classes from './card.module.css';

const Card = (props: any) => {
  return (
    <div className={classes.card}>
      <p>{props.name}</p>
    </div>
  );
};

export default Card;
