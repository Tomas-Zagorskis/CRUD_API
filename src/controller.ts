import { IncomingMessage, ServerResponse } from 'http';

import User from './model';
import { getReqData, validateBody } from './utils';
import {
	getIdOrInvalidIdResponse,
	getUserResponse,
	invalidInputResponse,
	serverErrorResponse,
	userNotFoundResponse,
} from './responses';

const userModel = new User();

// GET api/users
export async function getUsers(res: ServerResponse) {
	try {
		const users = await userModel.getUsers();
		getUserResponse(users, res);
	} catch (error) {
		serverErrorResponse(error as Error, res);
	}
}

// GET api/users/:id
export async function getUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const id = getIdOrInvalidIdResponse(req, res);

		const user = await userModel.getUser(id);

		if (!user) {
			userNotFoundResponse(res);
		} else {
			getUserResponse(user, res);
		}
	} catch (error) {
		serverErrorResponse(error as Error, res);
	}
}

// POST api/users
export async function createUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const userData = await getReqData(req);

		if (!validateBody(userData)) {
			invalidInputResponse(res);
		} else {
			const newUser = await userModel.createUser(JSON.parse(userData));
			res.writeHead(201, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(newUser));
		}
	} catch (error) {
		serverErrorResponse(error as Error, res);
	}
}

// PUT api/users/:id
export async function updateUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const id = getIdOrInvalidIdResponse(req, res);

		const user = await userModel.getUser(id);

		if (!user) {
			userNotFoundResponse(res);
		} else {
			const userData = await getReqData(req);
			if (!validateBody(userData, true)) {
				invalidInputResponse(res);
			} else {
				const updatedUser = await userModel.updateUser(user, userData);

				getUserResponse(updatedUser, res);
			}
		}
	} catch (error) {
		serverErrorResponse(error as Error, res);
	}
}

// DELETE api/users/:id
export async function deleteUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const id = getIdOrInvalidIdResponse(req, res);

		const user = await userModel.getUser(id);

		if (!user) {
			userNotFoundResponse(res);
		} else {
			await userModel.deleteUser(id);

			res.writeHead(204, { 'Content-Type': 'application/json' });
			res.end();
		}
	} catch (error) {
		serverErrorResponse(error as Error, res);
	}
}
