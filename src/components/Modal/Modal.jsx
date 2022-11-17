import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    e.code === 'Escape' && closeModal();
  };

  const handleOverlay = e => {
    e.currentTarget === e.target && closeModal();
  };

  return createPortal(
    <div className="Overlay" onClick={handleOverlay}>
      <div className="Modal">
        <img src={largeImageURL} alt="img" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};
