# Bookue API

## Description
Bookue API is a project created with GraphQL and Apollo Server. Your main goal is manager book list from each user registed in database and allow this user acess your data.

## Env
Before start, select the env depedencies in a .env file.

```bash
URI="MONGODB_URL"
KEY="KEY_TO_ENCODE"
```

## Getting Started

Run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

## Features
- Login with JWT
- Sign up
- Get book list
- Get specific book data
- Add a new book in list
- Update a book
- Delete a book

## Used libraries and frameworks
- Apollo Server
- Crypto
- GraphQL
- Jsonwebtoken
- Mongoose
