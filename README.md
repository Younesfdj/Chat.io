# Chat.io - Real-Time Chat App

This repository contains the source code for chat.io, a real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. The app allows users to engage in live chat conversations, displays online users, and features a modern and simple design that is responsive across all devices.

## Features

- Real-time messaging: Engage in live chat conversations with other users.
- Online users display: See a list of users who are currently online.
- Responsivity: The app is designed to work seamlessly on all devices, including desktops, tablets, and mobile devices.
- Modern and simple design: The user interface is clean and intuitive, providing a smooth and enjoyable chat experience.

## Tech Stack

- Frontend: React
- Backend: Node.js and Express
- Database: MongoDB
- Real-time communication: Socket.IO

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB database connection

## Installation

1. Clone the repository:

   ````bash
   git clone https://github.com/Younesfdj/Chat.io.git

2. Install the dependencies:

   ````bash
   cd Chat.io/client && npm install
   cd Chat.io/server && npm install
   cd Chat.io/socket && npm install

3. Create a `.env` file in the server directory and provide the following environment variables:

   ````plaintext
   MONGODB_URI=<your-mongodb-connection-uri>
   PORT = 5000
   JWT_SECRET =<secret_code>
   JWT_EXP = 30d

4. Start the development server in socket/server/client:

   ````bash
   npm run dev

5. Open your browser and visit `http://localhost:5173` to access the chat.io application.

## Folder Structure

The project structure is organized as follows:

- `client`: Contains the React frontend code.
- `server`: Contains the Node.js and Express backend code.
- `socket`: Contains the Socket.io configuration.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Socket.IO](https://socket.io/)
- [Create vite@latest](https://vitejs.dev/guide/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

Enjoy using Chat.io!
