import { Fragment } from 'react';

const Button = (props: any) => {
  return (
    <Fragment>
      {/* TODO: replace hard coded classes with custom themes */}
      <button onClick={props.onClick} type="button" className="btn btn-primary">
        {props.buttonText}
      </button>
    </Fragment>
  );
};

export default Button;
