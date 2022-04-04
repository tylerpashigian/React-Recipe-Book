import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { faClose } from '@fortawesome/free-solid-svg-icons';

import Backdrop from '../backdrop/backdrop';
import classes from '../modal/modal.module.css';

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <ModalHeader modalHeader={props.modalHeader} onClick={props.onClick} />
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const ModalHeader = (props: any) => {
  return (
    <div className={classes.modalHeader}>
      <h3>{props.modalHeader}</h3>
      <div className={classes.closeIcon} onClick={props.onClick}>
        <FontAwesomeIcon icon={faClose} />
      </div>
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
      {createPortal(
        <ModalOverlay modalHeader={props.modalHeader} onClick={props.onClick}>
          {props.children}
        </ModalOverlay>,
        portalRef
      )}
    </Fragment>
  );
};

export default Modal;
