# NodeJS REST API

> Full CRUD REST API using Node.js with no framework

```
# Routes
GET      /api/users
POST     /api/users
GET      /api/users/:id
PUT      /api/users/:id
DELETE   /api/users/:id

```

## Usage

```
# Install dependencies
npm install
yarn install

# Run in develpment
npm run start:dev
yarn run start:dev

# Run in production
npm run start:prod
yarn run start:prod

# Run test
npm run test
yarn run test
```

## Server API

Methods:

**GET** `api/users` is used to get all persons  
Server should answer with status code 200 and all users records

**GET** `api/users/${userId}`  
Server answers with status code **200** and record with `id === userId` if it exists  
Server answers with status code **400** and corresponding message if `userId` is invalid (not uuid)  
Server answers with status code **404** and corresponding message if record with `id === userId` doesn't exist

**POST** `api/users is used` to create record about new user and store it in database  
Server answers with status code **201** and newly created record  
Server answers with status code **400** and corresponding message if request body does not contain required fields

**PUT** `api/users/{userId}` is used to update existing user  
Server answers with status code **200** and updated record  
Server answers with status code **400** and corresponding message if `userId` is invalid (not uuid)  
Server answers with status code **404** and corresponding message if record with `id === userId` doesn't exist

**DELETE** `api/users/${userId}` is used to delete existing user from database  
Server answers with status code **204** if the record is found and deleted  
Server answers with status code **400** and corresponding message if `userId` is invalid (not uuid)  
Server answers with status code **404** and corresponding message if record with `id === userId` doesn't exist
