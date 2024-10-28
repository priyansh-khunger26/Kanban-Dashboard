// src/hooks/useFakeTicketTransition.js
import { useEffect, useRef } from 'react';
import { STATUS, transitions, isValidTransition } from '../utils/transitions.js';

const useFakeTicketTransition = (tickets, setTickets, isLiveMode) => {
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isLiveMode) {
            // Start moving tickets at random intervals
            intervalRef.current = setInterval(() => {
                moveTopTicket();
            }, getRandomInterval());
        } else {
            // Clear the interval when live mode is off
            clearInterval(intervalRef.current);
        }

        // Clean up on unmount or when live mode changes
        return () => clearInterval(intervalRef.current);
    }, [isLiveMode, tickets]);

    // Function to get a random interval between 1 and 3 seconds
    const getRandomInterval = () => Math.floor(Math.random() * 2000) + 1000;

    // Function to move the top ticket of a column that has valid transitions
    const moveTopTicket = () => {
        // Find the first ticket in each status that can be moved
        const movableTicket = tickets.find(ticket => transitions[ticket.status].length > 0);
        if (!movableTicket) return; // No movable tickets

        // Get the possible next statuses for the selected ticket
        const nextStatuses = transitions[movableTicket.status];
        if (nextStatuses.length === 0) return; // No valid transitions

        // Pick a random next status from the allowed transitions
        const nextStatus = nextStatuses[Math.floor(Math.random() * nextStatuses.length)];

        // Move the ticket to the top of the target status list
        setTickets((prevTickets) => {
            // Remove the ticket from its current position
            const updatedTickets = prevTickets.filter(ticket => ticket.id !== movableTicket.id);

            // Insert the ticket with the new status at the top of the target column
            return [{ ...movableTicket, status: nextStatus }, ...updatedTickets];
        });
    };
};

export default useFakeTicketTransition;
