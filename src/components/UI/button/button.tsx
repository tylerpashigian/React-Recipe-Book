import { Fragment } from 'react';

const Button = (props: any) => {
  const buttonStyle = props.buttonStyle ?? 'btn btn-primary';
  const buttonType = props.type ?? 'button';

  return (
    <Fragment>
      <button
        onClick={props.onClick}
        type={buttonType}
        className={`${buttonStyle}`}
      >
        {/* TODO: convert this to props.children? */}
        {props.buttonText}
      </button>
    </Fragment>
  );
};

export default Button;
