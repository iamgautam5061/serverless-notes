# Serverless Notes App

## Live Demo
https://ap-south-1.console.aws.amazon.com/amplify/apps/d17t1j5uglbq7z/overview

## Source Code
https://github.com/<your-username>/serverless-notes

## Tech Stack
- Frontend: Next.js
- Backend: AWS Lambda (Node.js 18)
- API: Amazon API Gateway (REST API)
- Database: DynamoDB
- Hosting: AWS Amplify

## Architecture
Frontend → API Gateway → Lambda → DynamoDB

## Features
- Add notes
- Delete notes
- Serverless backend
- No EC2 usage

## Performance Optimization
- Serverless architecture ensures automatic scaling and low latency
- DynamoDB provides fast NoSQL storage
- Lightweight REST API
- Optimized Next.js frontend build

## AI-Assisted Development
AI-enabled IDE tools (such as Cursor / Windsurf) were used to assist with debugging, refactoring, and improving development efficiency.

## Run Locally
```bash
npm install
npm run dev
