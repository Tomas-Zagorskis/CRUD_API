import { IncomingMessage } from 'http';

export function getReqData(req: IncomingMessage) {
	return new Promise<string>((resolve, reject) => {
		try {
			let body = '';
			req.on('data', data => {
				body += data.toString();
			});

			req.on('end', () => resolve(body));
		} catch (error) {
			reject(error);
		}
	});
}

export function validateBody(body: string) {
	const { username, age, hobbies } = JSON.parse(body);
	if (
		typeof username !== 'string' ||
		typeof age !== 'number' ||
		!Array.isArray(hobbies)
	) {
		return false;
	}
	if (hobbies.length > 0) {
		if (!hobbies.every(elem => typeof elem === 'string')) {
			return false;
		}
	}
	return true;
}
