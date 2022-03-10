import { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';

import Backdrop from '../backdrop/backdrop';
import classes from '../modal/modal.module.css';

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props: any) => {
  const portalRef = document.getElementById('overlays') as Element;

  useEffect(() => {
    const close = (e: any) => {
      if (e.key === 'Escape') {
        props.onClick();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [props]);

  return (
    <Fragment>
      {createPortal(<Backdrop onClick={props.onClick} />, portalRef)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalRef)}
    </Fragment>
  );
};

export default Modal;
