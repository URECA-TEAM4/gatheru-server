# Gather to U - Server

This is the server-side code for **Gather to U**, built with Node.js and MongoDB. It handles the backend logic, API routes, database interactions, and business logic. This project is part of the larger [URECA TEAM4 project](https://github.com/URECA-TEAM4). The client-side repository can be found [here](https://github.com/URECA-TEAM4/gatheru-client).

## 프로젝트 기획 배경과 기대 효과

기존 슬랙이나 카카오톡을 통해 인원을 모집할 때 여러 프로젝트에 대한 글이나 분산된 정보들을 한 눈에 파악하기 어렵다는 문제를 해결하기 위해 만들어진 유레카의 인원 모집 및 커뮤니티 문화 형성 플랫폼입니다. 정보 분산과 가독성의 문제를 해결하고 누구나 쉽고 빠르게 인원을 구할 수 있습니다. 다양한 활동을 더욱 쉽게 열거나 참여할 수 있을 뿐만 아니라 모든 유레카 캠퍼스가 이 서비스를 통해 더욱 활발한 개발 커뮤니티 문화에 기여할 수 있습니다.

## Tech Stack

- **Node.js** - JavaScript runtime for building scalable server-side applications.
- **Express.js** - Web framework for building APIs.
- **MongoDB** - NoSQL database for managing data.
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT** - JSON Web Tokens for authentication.
- **Dotenv** - To manage environment variables.
- **Nodemon** - Development tool to automatically restart the server.

## Installation

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/URECA-TEAM4/gatheru-server.git
   cd gatheru-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally or set up a cloud instance.

## Usage

To start the development server:

```bash
npm run dev
```
