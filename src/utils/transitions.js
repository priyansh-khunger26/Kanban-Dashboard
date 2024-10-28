// src/utils/transitions.js
export const STATUS = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    BLOCKED: 'Blocked',
    DONE: 'Done',
};

export const transitions = {
    [STATUS.TODO]: [STATUS.IN_PROGRESS],           // To Do can move to In Progress
    [STATUS.IN_PROGRESS]: [STATUS.BLOCKED, STATUS.DONE], // In Progress can move to Blocked or Done
    [STATUS.BLOCKED]: [STATUS.IN_PROGRESS],        // Blocked can move back to In Progress
    [STATUS.DONE]: []                              // Done is a terminal state
};

export const isValidTransition = (currentStatus, newStatus) => {
    return transitions[currentStatus]?.includes(newStatus);
};