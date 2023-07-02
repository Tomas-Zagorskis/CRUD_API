import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

import User from './controllers';
import { InvalidIdError } from './errors';

const PORT = process.env.PORT || 4000;
const users = [];

const server = http.createServer(async (req, res) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		const users = await new User().getUsers();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(users));
	} else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
		try {
			const id = req.url.split('/')[3];
			const user = await new User().getUser(id);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(user));
		} catch (error) {
			if (error instanceof InvalidIdError) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: error.message }));
			} else {
				res.writeHead(404, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: error.message }));
			}
		}
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
});

server.listen(PORT, () => console.log(`Server running at localhost:${PORT}`));
