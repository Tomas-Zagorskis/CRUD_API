import http from 'http';
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from './controller';

const rgxIdRoute = /\/api\/users\/[^/]+$/;

const server = http.createServer(async (req, res) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		await getUsers(res);
	} else if (req.url?.match(rgxIdRoute) && req.method === 'GET') {
		await getUser(req, res);
	} else if (req.url === '/api/users' && req.method === 'POST') {
		await createUser(req, res);
	} else if (req.url?.match(rgxIdRoute) && req.method === 'PUT') {
		await updateUser(req, res);
	} else if (req.url?.match(rgxIdRoute) && req.method === 'DELETE') {
		await deleteUser(req, res);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
});

export default server;
