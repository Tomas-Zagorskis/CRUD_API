import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import User from './model';
import { getReqData, validateBody } from './utils';

export async function getUsers(res: ServerResponse) {
	try {
		const users = await new User().getUsers();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(users));
	} catch (error) {
		console.log(error);
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Oops, something went wrong!' }));
	}
}

export async function getUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const id = req.url.split('/')[3];

		if (!validate(id)) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Invalid ID' }));
		}

		const user = await new User().getUser(id);

		if (!user) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User not found' }));
		}

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(user));
	} catch (error) {
		console.log(error);
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Oops, something went wrong!' }));
	}
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const userData = await getReqData(req);

		if (!validateBody(userData)) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(
				JSON.stringify({
					message: "Required fields are missing or don't match the type",
				}),
			);
		} else {
			const newUser = await new User().createUser(JSON.parse(userData));
			res.writeHead(201, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(newUser));
		}
	} catch (error) {
		console.log(error);
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Oops, something went wrong!' }));
	}
}
