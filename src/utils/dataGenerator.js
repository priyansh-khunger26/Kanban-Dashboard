// src/utils/dataGenerator.js
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

const STATUS_OPTIONS = ['To Do', 'In Progress', 'Blocked', 'Done'];

const generateTicket = (id) => ({
    id,
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    status: STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)],
});

const generateTickets = (count = 10000) => {
    const tickets = [];
    for (let i = 0; i < count; i++) {
        tickets.push(generateTicket(i + 1));
    }
    return tickets;
};

const tickets = generateTickets();

// Ensure the 'data' directory exists
const dataDir = path.join('./src/data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'tickets.json'), JSON.stringify(tickets, null, 2), 'utf-8');
console.log('Tickets data generated and saved to tickets.json');