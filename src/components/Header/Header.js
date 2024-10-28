// src/components/Header/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ tickets, onToggleLiveMode, toggleTheme, isDarkMode }) => {
    const [ticketCounts, setTicketCounts] = useState({
        todo: 0,
        inProgress: 0,
        blocked: 0,
        done: 0,
    });

    const [isLiveMode, setIsLiveMode] = useState(false);

    // Function to update ticket counts by status
    useEffect(() => {
        const counts = {
            todo: tickets.filter(ticket => ticket.status === 'To Do').length,
            inProgress: tickets.filter(ticket => ticket.status === 'In Progress').length,
            blocked: tickets.filter(ticket => ticket.status === 'Blocked').length,
            done: tickets.filter(ticket => ticket.status === 'Done').length,
        };
        setTicketCounts(counts);
    }, [tickets]); // Recalculate when tickets data changes

    // Handle live mode toggle
    const handleLiveModeToggle = () => {
        setIsLiveMode(!isLiveMode);
        onToggleLiveMode(!isLiveMode); // Notify parent about the toggle state
    };

    return (
        <header className="kanban-header">
            <div className="header-title">
                <h1>Kanban Dashboard</h1>
            </div>
            <div className="header-actions">
                {/* Light/Dark Mode Toggle Button */}
                <button onClick={toggleTheme} className="toggle-theme-button">
                    {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
                </button>

                {/* Live Mode Toggle */}
                <div className="live-mode-toggle">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isLiveMode}
                            onChange={handleLiveModeToggle}
                        />
                        <span className="slider"></span>
                    </label>
                    <span className="live-mode-label">Live Mode</span>
                </div>

                {/* Ticket Counts */}
                <div className="ticket-counts">
                    <span className="count todo">📝 To Do: {ticketCounts.todo}</span>
                    <span className="count in-progress">🚀 In Progress: {ticketCounts.inProgress}</span>
                    <span className="count blocked">⛔ Blocked: {ticketCounts.blocked}</span>
                    <span className="count done">✅ Done: {ticketCounts.done}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;