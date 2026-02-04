'use client'
import {useEffect} from 'react'
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({isShown, children, onClose}) => {

    useEffect(() => {
        if (!isShown) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);

        return () => document.removeEventListener('keydown', handleEscape);

    }, [isShown, onClose])

    const modal = (
        <div className="fixed w-full h-full inset-0 top-16 overflow-y-auto z-40 bg-black/70 backdrop-blur-sm animate-fadeIn" onClick={(e) => {
            if (e.target === e.currentTarget && onClose) {
                onClose();
            }
        }}>
            {children}
        </div>
    );

    return isShown ? createPortal(modal, document.getElementById("modal-root")) : null;
}

Modal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal