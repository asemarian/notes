import React from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.css';

const Modal = ({ toggle, title, icon, children }) => {
    const handleClick = (e) => {
        if (e.target.className.includes("overlay")) {
            toggle();
        }
    }
    return createPortal(
        <div className={styles.overlay} onClick={handleClick} >
            <div className={styles.modal}>
                <div className={styles.header}>
                    <i className={`fas fa-${icon ? icon : "sticky-note"} ${styles.icon}`}></i>
                    <div className={styles.title}>{title}</div>
                    <button className={styles.button} title="Close" onClick={toggle}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
        , document.body);

}

export default Modal;