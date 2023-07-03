import { v4 } from 'uuid';
import UserType from './type';

export default class User {
	private _users: UserType[] = [];

	async getUsers() {
		return new Promise<UserType[]>(resolve => resolve(this._users));
	}

	async getUser(id: string) {
		return new Promise<UserType | undefined>(resolve => {
			const user = this._users.find(u => u.id === id);
			resolve(user);
		});
	}

	async createUser(user: UserType) {
		return new Promise<UserType>(resolve => {
			const newUser = {
				id: v4(),
				...user,
			};
			this._users.push(newUser);
			resolve(newUser);
		});
	}

	async updateUser(user: UserType, userData: string) {
		return new Promise<UserType>(resolve => {
			const { username, age, hobbies } = JSON.parse(userData);

			const updatedUser: UserType = {
				id: user.id,
				username: username || user.username,
				age: age || user.age,
				hobbies: hobbies || user.hobbies,
			};
			const index = this._users.findIndex(u => u.id === user.id);
			this._users[index] = { ...updatedUser };
			resolve(updatedUser);
		});
	}

	async deleteUser(id: string) {
		return new Promise<void>(resolve => {
			this._users = this._users.filter(u => u.id !== id);
			resolve();
		});
	}
}
