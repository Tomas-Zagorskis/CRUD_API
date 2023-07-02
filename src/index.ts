import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

import { createUser, getUser, getUsers, updateUser } from './controller';

const PORT = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		getUsers(res);
	} else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
		getUser(req, res);
	} else if (req.url === '/api/users' && req.method === 'POST') {
		createUser(req, res);
	} else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
		updateUser(req, res);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
});

server.listen(PORT, () => console.log(`Server running at localhost:${PORT}`));
