// src/App.js

import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.js';
import KanbanColumn from './components/KanbanColumn/KanbanColumn.js';
import TicketDetailsModal from './components/TicketDetailsModal/TicketDetailsModal.js';
import ticketsData from './data/tickets.json';
import { STATUS, isValidTransition } from './utils/transitions.js';
import useFakeTicketTransition from './hooks/useFakeTicketTransition.js';
import './App.css';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [isLiveMode, setIsLiveMode] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setTickets(ticketsData); // Load tickets data from JSON
    }, []);

    // Toggle handler for live mode
    const handleToggleLiveMode = (liveModeStatus) => {
        setIsLiveMode(liveModeStatus);
    };

    // Toggle theme between light and dark mode
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    // Apply theme class to root element based on isDarkMode
    useEffect(() => {
        const rootElement = document.documentElement;
        if (isDarkMode) {
            rootElement.classList.add('dark-theme');
            rootElement.classList.remove('light-theme');
        } else {
            rootElement.classList.add('light-theme');
            rootElement.classList.remove('dark-theme');
        }
    }, [isDarkMode]);

    // Helper function to filter tickets by status
    const getTicketsByStatus = (status) => {
        return tickets.filter((ticket) => ticket.status === status);
    };

    // Function to handle status updates, enforcing FSA rules
    const updateTicketStatus = (ticketId, newStatus) => {
        setTickets((prevTickets) =>
            prevTickets.map((ticket) => {
                if (ticket.id === ticketId && isValidTransition(ticket.status, newStatus)) {
                    return { ...ticket, status: newStatus };
                }
                return ticket;
            })
        );
    };

    // Function to delete a ticket by ID
    const deleteTicket = (ticketId) => {
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
    };

    // Function to open the modal with the selected ticket details
    const openModal = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedTicket(null);
        setIsModalOpen(false);
    };

    // Function to update ticket details after inline editing
    const updateTicketDetails = (ticketId, newTitle, newDescription) => {
        setTickets((prevTickets) =>
            prevTickets.map((ticket) => {
                if (ticket.id === ticketId) {
                    return { ...ticket, title: newTitle, description: newDescription };
                }
                return ticket;
            })
        );
    };

    // Use the custom hook to automatically move tickets when live mode is on
    useFakeTicketTransition(tickets, setTickets, isLiveMode);

    return (
        <div className="kanban-board">
            <Header
                tickets={tickets}
                onToggleLiveMode={handleToggleLiveMode}
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
            />
            <div className="kanban-columns">
                {Object.values(STATUS).map((status) => (
                    <KanbanColumn
                        key={status}
                        status={status}
                        tickets={getTicketsByStatus(status)}
                        onStatusChange={updateTicketStatus}
                        onTicketClick={openModal} // Pass openModal to trigger modal on ticket click
                        onSave={updateTicketDetails} // Pass updateTicketDetails for inline editing
                        onDelete={deleteTicket} // Pass deleteTicket for Done column deletion
                    />
                ))}
            </div>
            {/* Render the TicketDetailsModal if a ticket is selected */}
            {isModalOpen && (
                <TicketDetailsModal
                    ticket={selectedTicket}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default App;
