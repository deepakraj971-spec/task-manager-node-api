# Node.js Task Manager API

This project is a Node.js + TypeScript API built with Express and TypeORM,
featuring secure authentication using JWT access tokens stored in HttpOnly cookies.
It follows enterprise best practices with access tokens

Features

- User registration and login,Logout
- Task View,Creation,Update,Delete, Server side pagination,Validations
- JWT authentication with access tokens
- HttpOnly, Secure cookies for token storage
- Logout endpoint to clear cookies
- TypeORM integration with MSSQL
- Validation using class-validator
- Security middleware (helmet, cors, morgan)
- Linting and formatting with ESLint and Prettier

Tech Stack

- Runtime: Node.js + TypeScript
- Framework: Express
- Database: MSSQL (via TypeORM)
- Auth: JWT (jsonwebtoken)
- Security: bcrypt, helmet, cors, cookie-parser
- Utilities: dotenv, morgan
- Dev Tools: ts-node, ESLint, Prettier

Installation

Clone the repo and install dependencies:

git clone <your-repo-url>
cd <project-folder>
npm install
