import { users } from './data';
import { validate, v4 } from 'uuid';
import { throwInvalidIdError, throwUserNotFoundError } from './errors';
import User from './type';

export default class Controller {
	users: User[] = [];

	constructor() {
		this.users = users;
	}

	async getUsers() {
		return new Promise<User[]>((resolve, _) => resolve(this.users));
	}

	async getUser(id: string) {
		return new Promise<User | undefined>((resolve, reject) => {
			if (!validate(id)) reject(throwInvalidIdError());
			let user = this.users.find(user => user.id === id);
			if (user) {
				resolve(user);
			} else {
				reject(throwUserNotFoundError());
			}
		});
	}

	async createUser(user: User) {
		return new Promise<User>((resolve, _) => {
			let newUser = {
				id: v4(),
				...user,
			};
			this.users.push(newUser);
			resolve(newUser);
		});
	}
}
