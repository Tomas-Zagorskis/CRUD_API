import supertest from 'supertest';
import server from './src/index';
import UserType from './src/type';

const endpoint = '/api/users';

describe('first scenario', () => {
	const user: UserType = {
		username: 'Tom',
		age: 35,
		hobbies: ['basketball', 'games', 'movies'],
	};

	it('should return empty array', async () => {
		const expected = [] satisfies UserType[];
		const response = await supertest(server).get(endpoint);

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(expected);
	});

	it('should create new user and return it', async () => {
		const response = await supertest(server).post(endpoint).send(user);

		expect(response.statusCode).toBe(201);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.id).not.toBe('');
		expect(response.body.username).toBe(user.username);
		expect(response.body.age).toBe(user.age);
		expect(response.body.hobbies.length).toBe(3);

		user.id = response.body.id;
	});

	it('should return by id', async () => {
		const response = await supertest(server).get(`${endpoint}/${user.id}`);

		expect(response.statusCode).toBe(200);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.username).toBe(user.username);
		expect(response.body.age).toBe(user.age);
		expect(response.body.id).toBe(user.id);
		expect(response.body.hobbies.length).toBe(3);
	});

	it('should update user', async () => {
		const updateUser = {
			username: 'Mark',
			age: 22,
			hobbies: [],
		} satisfies UserType;

		const response = await supertest(server)
			.put(`${endpoint}/${user.id}`)
			.send(updateUser);

		expect(response.statusCode).toBe(200);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.username).toBe(updateUser.username);
		expect(response.body.age).toBe(updateUser.age);
		expect(response.body.hobbies.length).toBe(0);
	});

	it('should delete user by id', async () => {
		const response = await supertest(server).delete(`${endpoint}/${user.id}`);

		expect(response.statusCode).toBe(204);
	});

	it("should return message that user isn't found", async () => {
		const response = await supertest(server).get(`${endpoint}/${user.id}`);

		expect(response.statusCode).toBe(404);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.message).toBe('User not found');
	});
});

describe('second scenario', () => {
	const user: UserType = {
		username: 'John',
		age: 20,
		hobbies: ['reading', 'jogging'],
	};

	it('should create new user and return it', async () => {
		const response = await supertest(server).post(endpoint).send(user);

		expect(response.statusCode).toBe(201);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.id).not.toBe('');
		expect(response.body.username).toBe(user.username);
		expect(response.body.age).toBe(user.age);

		user.id = response.body.id;
	});

	it('should delete user by id', async () => {
		const response = await supertest(server).delete(`${endpoint}/${user.id}`);

		expect(response.statusCode).toBe(204);
	});

	it('should return empty array', async () => {
		const expected = [] satisfies UserType[];
		const response = await supertest(server).get(endpoint);

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(expected);
	});

	it("should return message that user isn't found", async () => {
		const response = await supertest(server).get(`${endpoint}/${user.id}`);

		expect(response.statusCode).toBe(404);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.message).toBe('User not found');
	});

	it("should return message that user isn't found, when updating user", async () => {
		const updateUser: UserType = {
			username: 'Sam',
			age: 29,
			hobbies: ['running'],
		};

		const response = await supertest(server)
			.put(`${endpoint}/${user.id}`)
			.send(updateUser);

		expect(response.statusCode).toBe(404);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.message).toBe('User not found');
	});

	it('should return status code 404, when deleting', async () => {
		const response = await supertest(server).delete(`${endpoint}/${user.id}`);

		expect(response.statusCode).toBe(404);
	});
});

describe('third scenario', () => {
	const id = '0123456789';

	const user: UserType = {
		username: 'Adam',
		age: 40,
		hobbies: [],
	};

	it('should return empty array', async () => {
		const expected = [] satisfies UserType[];
		const response = await supertest(server).get(endpoint);

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(expected);
	});

	it("should return message that route isn't found", async () => {
		const response = await supertest(server).get(`${endpoint}/${id}/something`);

		expect(response.statusCode).toBe(404);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.message).toBe('Route not found');
	});

	it('should return message that id is invalid', async () => {
		const response = await supertest(server).get(`${endpoint}/${id}`);

		expect(response.statusCode).toBe(400);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.message).toBe('Invalid ID');
	});

	it('should return message that id is invalid, when updating user', async () => {
		const updateUser: UserType = {
			username: 'Leo',
			age: 36,
			hobbies: [],
		};

		const response = await supertest(server)
			.put(`${endpoint}/${user.id}`)
			.send(updateUser);

		expect(response.statusCode).toBe(400);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.message).toBe('Invalid ID');
	});

	it('should return message that id is invalid, when deleting user', async () => {
		const response = await supertest(server).delete(`${endpoint}/${user.id}`);

		expect(response.statusCode).toBe(400);
		expect(response.header['content-type']).toEqual('application/json');
		expect(response.body.message).toBe('Invalid ID');
	});
});
