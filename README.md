# Anonymis-BE

Anonymis-BE is a real-time messaging backend that supports temporary group chats. Groups are designed to be ephemeral, automatically deleting themselves and their message history after a specified expiration time.

## 🚀 Features

- **User Authentication**: Secure signup, login, and email OTP-based verification using Nodemailer, JWT, and bcrypt.
- **Temporary Group Chats**: Users can create and join chat groups using unique group codes.
- **Real-time Communication**: Instant messaging and group status updates powered by Socket.io.
- **Starred Messages (Memories)**: Save important messages from temporary groups as "Memories" that persist even after the group is deleted.
- **Automated Cleanup**: Background cron jobs automatically:
  - Delete expired groups and their message history (every minute).
  - Remove unverified user accounts (every 10 minutes).
- **User Management**: Search for users by tag or alias and update profile information.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.io
- **Mailing**: Nodemailer
- **Scheduling**: node-cron
- **Security**: JWT (JSON Web Tokens), bcrypt

## 📁 Project Structure

```text
├── configs/            # Database, Socket.io, and Cron job configurations
├── controllers/        # Business logic for auth, groups, and services
├── middlewares/        # Authentication middleware
├── models/             # Mongoose schemas (User, Group, Message, OTP, Memory)
├── routes/             # Express API routes
└── index.js            # Entry point of the application
```

## 🚥 API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/verify-otp` - Verify user OTP.
- `POST /api/auth/login` - User login.

### Groups
- `POST /api/group/create-group` - Create a new chat group (Auth required).
- `POST /api/group/join-group` - Join a group via code (Auth required).
- `GET /api/group/get-user-groups` - List groups the user belongs to (Auth required).
- `GET /api/group/group-messages/:groupId` - Retrieve message history for a group (Auth required).

### Services & Memories
- `POST /api/service/get-users` - Search for users (Auth required).
- `PATCH /api/service/update-userInfo` - Update user profile (Auth required).
- `GET /api/service/user-info/:email` - Fetch specific user details (Auth required).
- `POST /api/service/star-message` - Save a message as a "Memory" (Auth required).
- `GET /api/service/memory` - Retrieve all saved memories for the user (Auth required).

## ⚡ Socket.io Events

- **Connection**: Requires a valid JWT in `handshake.auth.token`.
- **Join**: `socket.emit("join", { groupId })` - Join a specific group room.
- **Send Message**: `socket.emit("send-message", { groupId, text, senderTag })` - Send a message to a group.
- **Receive Message**: `socket.on("receive-message", msg)` - Receive messages in real-time.
- **Group Deleted**: `socket.on("group-deleted")` - Notified when the current group expires.

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/pandey-kun7/anonymis-BE.git
    cd anonymis-BE
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=your_port
    MONGO_URI=your_mongodb_connection_string
    SECRET=your_jwt_secret
    SMTP_USER=your_gmail_address
    SMTP_PASSWORD=your_gmail_app_password
    ```

4.  **Run the application**:
    ```bash
    # For development (with nodemon)
    npm start
    ```

## 📜 License

This project is licensed under the [ISC License](LICENSE).
