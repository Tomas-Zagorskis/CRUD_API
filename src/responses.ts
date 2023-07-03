import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import UserType from './type';

export const serverErrorResponse = (error: Error, res: ServerResponse) => {
	console.log(error);
	res.writeHead(500, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ message: 'Oops, something went wrong!' }));
};

export const userNotFoundResponse = (res: ServerResponse) => {
	res.writeHead(404, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ message: 'User not found' }));
};

export const getUserResponse = (
	user: UserType | UserType[],
	res: ServerResponse,
) => {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(user));
};

export const invalidInputResponse = (res: ServerResponse) => {
	res.writeHead(400, { 'Content-Type': 'application/json' });
	res.end(
		JSON.stringify({
			message: "Required fields are missing or don't match the type",
		}),
	);
};

export const getIdOrInvalidIdResponse = (
	req: IncomingMessage,
	res: ServerResponse,
) => {
	const id = req.url!.split('/')[3];

	if (!validate(id)) {
		res.writeHead(400, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Invalid ID' }));
	}

	return id;
};
