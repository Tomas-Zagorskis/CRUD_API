import { users } from './data';

export default class Controller {
	async getUsers() {
		return new Promise((resolve, _) => resolve(users));
	}
}
