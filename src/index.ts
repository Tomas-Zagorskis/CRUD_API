import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

import User from './controllers';
import { InvalidIdError } from './errors';
import { getReqData, validateBody } from './utils';

const PORT = process.env.PORT || 4000;

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
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: error.message }));
		}
	} else if (req.url === '/api/users' && req.method === 'POST') {
		try {
			let userData = await getReqData(req);
			if (validateBody(userData)) {
				const user = await new User().createUser(JSON.parse(userData));
				res.writeHead(201, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(user));
			}
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(
				JSON.stringify({
					message: "Required fields are missing or don't match the type",
				}),
			);
		} catch (error) {
			res.writeHead(500, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: error.message }));
		}
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
});

server.listen(PORT, () => console.log(`Server running at localhost:${PORT}`));
