export class InvalidIdError extends Error {
	constructor() {
		super("User's ID is invalid");
	}
}

export const throwInvalidIdError = () => {
	throw new InvalidIdError();
};

export class UserNotFoundError extends Error {
	constructor() {
		super('User not found');
	}
}

export const throwUserNotFoundError = () => {
	throw new UserNotFoundError();
};
