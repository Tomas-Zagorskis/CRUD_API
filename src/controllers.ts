import { users } from './data';
import uuid from 'uuid';
import { throwInvalidIdError, throwUserNotFoundError } from './errors';

export default class Controller {
	async getUsers() {
		return new Promise((resolve, _) => resolve(users));
	}

	async getUser(id: string) {
		return new Promise((resolve, reject) => {
			if (!uuid.validate(id)) reject(throwInvalidIdError());
			let user = users.find(user => user.id === id);
			if (user) {
				resolve(user);
			} else {
				reject(throwUserNotFoundError());
			}
		});
	}
}
