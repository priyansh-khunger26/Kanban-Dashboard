// src/components/TicketCard/TicketCard.js

import React, { useState } from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, onClick, onSave }) => {
    const { id, title, description, tasksCompleted, totalTasks } = ticket;
    const [isEditing, setIsEditing] = useState(false); // Toggle between edit and view modes
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);

    // Toggle editing mode
    const handleEditToggle = (event) => {
        event.stopPropagation(); // Prevent triggering the modal on edit button click
        setIsEditing(!isEditing);
    };

    // Save the edited details and exit edit mode
    const handleSave = (event) => {
        event.stopPropagation(); // Prevent triggering the modal on save button click
        onSave(id, editTitle, editDescription); // Call onSave with updated details
        setIsEditing(false); // Exit editing mode
    };

    return (
        <div className="ticket-card" onClick={() => !isEditing && onClick(ticket)}>
            {isEditing ? (
                <div className="ticket-edit-form">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="ticket-edit-title"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="ticket-edit-description"
                    />
                    <button onClick={handleSave} className="ticket-save-button">Save</button>
                    <button onClick={handleEditToggle} className="ticket-cancel-button">Cancel</button>
                </div>
            ) : (
                <>
                    <div className="ticket-id">#{id}</div>
                    <h3 className="ticket-title">{title}</h3>
                    <p className="ticket-description">{description}</p>
                    <p className="ticket-tasks">{tasksCompleted} / {totalTasks} tasks completed</p>
                    <button onClick={handleEditToggle} className="ticket-edit-button">Edit</button>
                </>
            )}
        </div>
    );
};

export default TicketCard;
