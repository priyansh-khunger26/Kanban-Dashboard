// src/components/KanbanColumn/KanbanColumn.js

import React, { useState, useRef, useEffect, useCallback } from 'react';
import './KanbanColumn.css';
import TicketCard from '../TicketCard/TicketCard.js';
import { transitions } from '../../utils/transitions.js';

const KanbanColumn = ({ status, tickets, onStatusChange, onTicketClick, onSave, onDelete }) => {
    const [visibleTickets, setVisibleTickets] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(10);
    const [filter, setFilter] = useState('All');
    const [sortCriteria, setSortCriteria] = useState('Title');
    const loadMoreRef = useRef(null);

    const loadMoreItems = useCallback(() => {
        setItemsToShow((prev) => prev + 10);
    }, []);

    // Apply filter and sort logic to tickets
    useEffect(() => {
        let filteredTickets = tickets.map(ticket => ({
            ...ticket,
            priority: ticket.priority || 'Low', // Set default priority if missing
            dueDate: ticket.dueDate || '9999-12-31' // Set a distant future date if missing
        }));

        // Filter tickets based on the selected filter option
        if (filter !== 'All') {
            filteredTickets = filteredTickets.filter((ticket) => ticket.priority === filter);
        }

        // Sort tickets based on the selected sort criteria
        filteredTickets = [...filteredTickets].sort((a, b) => {
            if (sortCriteria === 'Title') {
                return a.title.localeCompare(b.title);
            } else if (sortCriteria === 'Due Date') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else if (sortCriteria === 'Priority') {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return 0;
        });

        setVisibleTickets(filteredTickets.slice(0, itemsToShow));
    }, [tickets, itemsToShow, filter, sortCriteria]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreItems();
            }
        });
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [loadMoreItems]);

    return (
        <div className="kanban-column">
            <div className="kanban-column-header">
                <h2>{status} ({tickets.length})</h2>

                {/* Filter and Sort Controls */}
                <div className="filter-sort-controls">
                    <label>Filter by Priority:</label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <label>Sort by:</label>
                    <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
                        <option value="Title">Title</option>
                        <option value="Due Date">Due Date</option>
                        <option value="Priority">Priority</option>
                    </select>
                </div>
            </div>
            <div className="kanban-tickets">
                {visibleTickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-container">
                        <TicketCard
                            ticket={ticket}
                            onClick={() => onTicketClick(ticket)}
                            onSave={onSave}
                        />
                        <div className="ticket-actions">
                            {transitions[status]?.map((nextStatus) => (
                                <button
                                    key={nextStatus}
                                    onClick={() => onStatusChange(ticket.id, nextStatus)}
                                >
                                    Move to {nextStatus}
                                </button>
                            ))}
                            {status === 'Done' && (
                                <button
                                    className="delete-button"
                                    onClick={() => onDelete(ticket.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={loadMoreRef} className="load-more-trigger" />
            </div>
        </div>
    );
};

export default KanbanColumn;
