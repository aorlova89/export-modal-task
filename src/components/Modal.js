import React from "react";

import './Modal.css';

export const Modal = ({content, isModalVisible}) => {

    if (!isModalVisible) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <p className="modal-title">Export Report</p>
                </div>
                <div className="modal-body">
                    {content}
                </div>
            </div>
        </div>
    )
}
