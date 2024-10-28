// src/components/TicketDetailsModal/TicketDetailsModal.js

import React from 'react';
import './TicketDetailsModal.css';

const TicketDetailsModal = ({ ticket, isOpen, onClose }) => {
    if (!isOpen) return null; // Do not render if modal is closed

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h2>Ticket Details</h2>
                <p><strong>ID:</strong> #{ticket.id}</p>
                <p><strong>Title:</strong> {ticket.title}</p>
                <p><strong>Description:</strong> {ticket.description}</p>
                <p><strong>Tasks Completed:</strong> {ticket.tasksCompleted} / {ticket.totalTasks}</p>
                {/* Add more details here if needed */}
            </div>
        </div>
    );
};

export default TicketDetailsModal;
