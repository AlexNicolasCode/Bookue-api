# Bookue API

A RESTful API for managing books, built with Node.js and Express.

## Features

* **CRUD Operations**: Create, Read, Update, and Delete books.
* **Database Integration**: Connects to a MongoDB database for persistent storage.
* **Authentication**: Secures endpoints with JWT-based authentication.
* **Validation**: Ensures data integrity with input validation.
* **Error Handling**: Provides consistent error responses.
* **Clean Architecture**: Implements separation of concerns for maintainable and scalable code.

## Technologies Used

* **Node.js**: JavaScript runtime for building the API.
* **Express**: Web framework for Node.js.
* **MongoDB**: NoSQL database for storing book data.
* **Mongoose**: ODM for MongoDB and Node.js.
* **JWT**: JSON Web Tokens for secure authentication.
* **Joi**: Data validation library.

## Clean Architecture in This Project

This project follows **Clean Architecture** principles, which helps in maintaining a clear separation of concerns and improving testability:

* **Entities**: Represent the core business objects (e.g., Book, User).
* **Use Cases / Services**: Contain business logic for operations like creating or updating books.
* **Controllers**: Handle HTTP requests and responses, calling the appropriate use cases.
* **Repositories**: Abstract database interactions, implemented via Mongoose.
* **Middleware**: Handles cross-cutting concerns like authentication, error handling, and validation.

By following this structure, the project ensures that business rules are independent of frameworks, databases, and external agents.

## Getting Started

### Prerequisites

* Node.js (>=14.0.0)
* npm or yarn
* MongoDB instance (local or cloud)

### Installation

Clone the repository:

```bash
git clone https://github.com/AlexNicolasCode/Bookue-api.git
cd Bookue-api
```

Install dependencies:

```bash
npm install
# or
yarn install
```

### Configuration

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookue
JWT_SECRET=your_jwt_secret
```

Replace `your_jwt_secret` with a secure secret key for JWT signing.

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The API will be available at [http://localhost:5000](http://localhost:5000).

### Running Tests

To run unit and integration tests:

```bash
npm test
# or
yarn test
```

## API Endpoints

### Books

* `GET /api/books`: Retrieve all books.
* `GET /api/books/:id`: Retrieve a single book by ID.
* `POST /api/books`: Create a new book.
* `PUT /api/books/:id`: Update an existing book by ID.
* `DELETE /api/books/:id`: Delete a book by ID.

### Authentication

* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: Login and receive a JWT.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature-branch`).

3. Make your changes.

4. Commit your changes using **Conventional Commits**:

   * **feat**: for new features
   * **fix**: for bug fixes
   * **docs**: for documentation changes
   * **style**: for code formatting or style changes
   * **refactor**: for code refactoring
   * **test**: for adding or updating tests
   * **chore**: for maintenance tasks

   Example: `git commit -m "feat: add book search functionality"`

5. Push to the branch (`git push origin feature-branch`).

6. Create a new Pull Request.
