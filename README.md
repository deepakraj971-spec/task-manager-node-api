Node.js Task Manager API

This project is a Node.js + TypeScript API built with Express and TypeORM, featuring secure authentication using JWT access/refresh tokens stored in HttpOnly cookies. It follows enterprise best practices with short-lived access tokens and long-lived refresh tokens.

Features:

⦁	User registration and login
⦁	
⦁	Task Creation , task update , task deletion , view task
⦁	
⦁	JWT authentication with access and refresh tokens
⦁	
⦁	HttpOnly, Secure cookies for token storage
⦁	
⦁	Session refresh endpoint (/api/auth/refresh)
⦁	
⦁	Logout endpoint to clear cookies
⦁	
⦁	TypeORM integration with MSSQL
⦁	
⦁	Validation using class-validator
⦁	
⦁	Security middleware (helmet, cors, morgan)
⦁	
⦁	Linting and formatting with ESLint and Prettier

Tech Stack:

⦁	Runtime: Node.js + TypeScript
⦁	
⦁	Framework: Express
⦁	
⦁	Database: MSSQL (via TypeORM)
⦁	
⦁	Auth: JWT (jsonwebtoken)
⦁	
⦁	Security: bcrypt, helmet, cors, cookie-parser
⦁	
⦁	Utilities: dotenv, morgan
⦁	
⦁	Dev Tools: ts-node, ESLint, Prettier


Project structure :

task-manager-node-api/
├─ src/
│  ├─ app.ts                # Express app setup
│  ├─ server.ts             # Server bootstrap
│  ├─ config/               # Configuration files
│  │  ├─ env.ts             # Environment variables loader
│  │  └─ data-source.ts     # TypeORM data source config
│  ├─ domain/               # Core domain entities
│  │  └─ entities/
│  │     ├─ TaskItem.ts     # Task entity
│  │     └─ User.ts         # User entity
│  ├─ application/          # Application layer
│  │  ├─ dto/               # Data Transfer Objects
│  │  │  ├─ CreateTaskDto.ts
│  │  │  └─ UpdateTaskDto.ts
│  │  ├─ services/          # Business logic services
│  │  │  ├─ AuthService.ts
│  │  │  └─ TaskService.ts
│  │  └
│  ├─ infrastructure/       # Persistence & auth utilities
│  │  ├─ repositories/
│  │  │  ├─ TaskRepository.ts
│  │  │  └─ UserRepository.ts
│  │  └─ auth/
│  │     ├─ jwt.ts          # JWT utilities
│  │     └─ password.ts     # Password hashing
│  ├─ api/                  # API layer
│  │  ├─ responses/ApiResponse.ts
│  │  ├─ controllers/
│  │  │  ├─ AuthController.ts
│  │  │  └─ TasksController.ts
│  │  └─ middleware/
│  │     ├─ authGuard.ts
│  │     ├─ validation.ts
│  │     └─ errorHandler.ts
│  ├─ shared/
│  │  └─ PagedResult.ts     # Pagination helper
│  └─ routes.ts             # Route definitions
├
├─ .env                     # Environment variables
├─ tsconfig.json            # TypeScript config
├─ package.json             # Dependencies & scripts
├─ README.md                # Documentation
└─ dist/                    # Compiled JS output


Installation: Clone the repo and install dependencies:

git clone <your-repo-url> cd <project-folder> npm install