import React from 'react';

const ConfirmationModal = ({ title, message, successAction, successButtonName, modalData, closeModal }) => {
    return (

        <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" onClick={() => successAction(modalData)} className="btn">{successButtonName}</label>
                        <button className='btn btn-warning ' onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ConfirmationModal;