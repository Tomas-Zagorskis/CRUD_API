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

export function validateBody(body: string, toUpdate = false) {
	const { username, age, hobbies, ...rest } = JSON.parse(body);

	const numOfProps = [username, age, hobbies].filter(val => val).length;
	const isMoreProps = Object.entries(rest).length > 0;
	const isUsername = username && typeof username === 'string';
	const isAge = age && typeof age === 'number';
	const isHobbies =
		hobbies &&
		Array.isArray(hobbies) &&
		(hobbies.length === 0 || hobbies.every(elem => typeof elem === 'string'));

	const isThreeProps = isUsername && isAge && isHobbies;
	const isTwoProps =
		(isUsername && isAge) || (isUsername && isHobbies) || (isAge && isHobbies);
	const isOneProp = isUsername || isAge || isHobbies;

	// validate for creating new user
	if (!isMoreProps && !toUpdate && isThreeProps) return true;

	// validate for updating user
	if (!isMoreProps && toUpdate) {
		if (isThreeProps) {
			return true;
		} else if (isTwoProps && numOfProps === 2) {
			return true;
		} else if (isOneProp && numOfProps === 1) {
			return true;
		}
	}
	return false;
}
