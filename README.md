# Anonymis Backend

Anonymis is a real-time, group chat application (backend). It features user authentication with OTP verification, group management, and real-time messaging using Socket.io.

## Features

- **Authentication**: User signup, login, and OTP-based email verification.
- **Group Management**: Create chat groups, join existing groups, and fetch user-joined groups.
- **Real-time Messaging**: Instant message delivery within groups using WebSockets (Socket.io).
- **Message Persistence**: Chat history is stored and retrievable via REST APIs.
- **Security**: JWT-based authentication for protected routes and socket connections.

## Tech Stack

- **Node.js** & **Express**: Web framework.
- **MongoDB** & **Mongoose**: Database and ODM.
- **Socket.io**: Real-time bidirectional event-based communication.
- **JSON Web Tokens (JWT)**: Secure authentication.
- **Bcrypt**: Password hashing.
- **Dotenv**: Environment variable management.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)
- NPM (comes with Node.js)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/pandey-kun7/anonymis-BE.git
cd anonymis-BE
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
# Add other necessary variables like SMTP details if OTP is sent via email
```

### 4. Run the Application
For development (using nodemon):
```bash
npm start
```
The server will start at `http://localhost:3000` (or your specified port).

## API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/verify-otp` | Verify user OTP |
| POST | `/login` | Login user and receive JWT |

### Group Routes (`/api/group`)
*All group routes require a valid JWT in the Authorization header.*
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create-group` | Create a new chat group |
| POST | `/join-group` | Join an existing group |
| GET | `/get-user-groups` | Get all groups the user is part of |
| GET | `/group-messages/:groupId` | Fetch message history for a group |

## WebSocket Events

The backend uses Socket.io for real-time communication. Authentication is required via the `auth` object in the handshake.

### Connection
```javascript
const socket = io("http://localhost:3000", {
  auth: {
    token: "YOUR_JWT_TOKEN"
  }
});
```

### Events
- **`join`**: Emitted by client to join a specific group room.
  - Payload: `{ groupId }`
- **`send-message`**: Emitted by client to send a message.
  - Payload: `{ groupId, text, senderTag }`
- **`receive-message`**: Broadcasted by server to all users in the group room.
  - Payload: `{ groupId, senderId, content, senderTag, createdAt }`

## License
This project is licensed under the ISC License.
