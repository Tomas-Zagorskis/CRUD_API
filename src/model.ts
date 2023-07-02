import { users } from './data';
import { v4 } from 'uuid';
import UserType from './type';

export default class User {
	users: UserType[] = [];

	constructor() {
		this.users = users;
	}

	async getUsers() {
		return new Promise<UserType[]>(resolve => resolve(this.users));
	}

	async getUser(id: string) {
		return new Promise<UserType | undefined>(resolve => {
			const user = this.users.find(user => user.id === id);
			resolve(user);
		});
	}

	async createUser(user: UserType) {
		return new Promise<UserType>(resolve => {
			const newUser = {
				id: v4(),
				...user,
			};
			this.users.push(newUser);
			resolve(newUser);
		});
	}
}
