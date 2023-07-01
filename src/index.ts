import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

import User from './controllers';

const PORT = process.env.PORT || 4000;
const users = [];

const server = http.createServer(async (req, res) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		const users = await new User().getUsers();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(users));
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
});

server.listen(PORT, () => console.log(`Server running at localhost:${PORT}`));
