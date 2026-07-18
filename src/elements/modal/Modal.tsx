import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { SVGIcon } from 'src/elements';
import { activationKeyHandler } from 'src/helpers';

import * as Style from './Modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

function Modal({ isOpen, onClose, title, className, children }: ModalProps): React.ReactNode {
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={Style.overlay} onClick={onClose}>
      <div
        className={clsx(Style.modal, className)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={Style.header}>
          {title && <div className={Style.title}>{title}</div>}
          <span
            className={Style.close}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={activationKeyHandler(onClose)}
          >
            <SVGIcon icon="close" />
          </span>
        </div>
        <div className={Style.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export { Modal };
