# Serverless Notes App

A production-ready, fully serverless web application built using **Next.js** and **AWS services**.  
The project demonstrates clean architecture, real-world deployment, and performance-focused design without using EC2.

---

## 🔗 Live Demo
https://main.d33i5omyabzogj.amplifyapp.com

## 💻 Source Code
https://github.com/iamgautam5061/serverless-notes

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- Static site export for fast loading
- Hosted on AWS Amplify (CDN-backed)

### Backend
- AWS Lambda (Node.js 18)
- Amazon API Gateway (REST API)
- DynamoDB (NoSQL database)

---

## 🏗 Architecture
Next.js Frontend
↓
API Gateway (REST)
↓
AWS Lambda
↓
DynamoDB


---

## ✨ Features

- Create, read, update, and delete notes
- Optimistic UI updates for fast user experience
- Pagination using DynamoDB `LastEvaluatedKey`
- Timestamps (`createdAt`, `updatedAt`) for auditing
- Fully serverless architecture (no EC2)

---

## ⚡ Performance Optimization

- Static frontend build served via CDN
- Serverless backend with automatic scaling
- Low-latency DynamoDB access
- Lightweight REST APIs
- No server maintenance overhead

---

## 🤖 AI-Assisted Development

AI-enabled IDE tools (such as Cursor / Windsurf) were used to assist with debugging, refactoring, and improving development efficiency during implementation.

---

## ▶ Run Locally

```bash
npm install
npm run dev
