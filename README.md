# Mini Event Tracker

This is the backend for the **Mini Event Tracker** app.  
It provides RESTful APIs for managing **users** and **events**, with authentication and authorization.

## 🚀 Tech Stack
- **Node.js** with **Express.js** – REST API framework  
- **MongoDB** with **Mongoose ODM** – Database  
- **JWT** – Authentication & authorization  
- **bcrypt** – Secure password hashing  
- **dotenv** – Environment variable management  

## Test User Credentials
- Email: `test@gmail.com`
- Password: `test`

## Deployed URLs
- [Backend](https://backend-dpc.vercel.app/)
- [Frontend](https://frontend-dpc.vercel.app/)

## 📂 Project Structure

````
.
├── db/
│   └── db.connect.js          # Database connection logic
├── models/
│   ├── user.models.js         # User schema
│   └── event.models.js        # Event schema
├── routes/
│   ├── auth.routes.js         # Authentication routes
│   └── event.routes.js        # Event routes
├── controllers/
│   └── event.controllers.js   # Event business logic
├── index.js                   # Main entry point
├── .env
├── vercel.json
├── README.md
├── package.json
└── package-lock.json

````

## ⚙️ Setup & Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/ravipatelctf/mini-event-tracker.git
    cd mini-event-tracker
    ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**
   Create a `.env` file in the root with:

   ```env
   PORT=5000
   MONGODB=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret_key>
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

   Server will run at:

   ```bash
   http://localhost:5000
   ```

## 📌 API References

> **local baseURL:** `http://localhost:5000`

### 🔐 Authentication

#### **`POST /auth/signup`** → Create a new user

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response Body:**

```json
{
  "message": "User created successfully."
}
```

#### **`POST /auth/login`** → Login and receive a JWT token

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response Body:**

```json
{
  "token": "jwt-token-here"
}
```

---

### 📅 Events (Protected Routes)

> ⚠️ Pass JWT in headers:
> `Authorization: Bearer <token>`

#### **`POST /events/:userEmail`** → Create a new event

**Request Body:**

```json
{
  "name": "Meeting",
  "dateTime": "2025-10-02T10:00:00Z",
  "location": "Office",
  "description": "Project discussion"
}
```

**Response Body:**

```json
{
  "_id": "66c999734974b8ae82dd80aa",
  "email": "john@example.com",
  "events": [
    {
      "name": "Meeting",
      "dateTime": "2025-10-02T10:00:00.000Z",
      "location": "Office",
      "description": "Project discussion",
      "createdAt": "2025-09-30T07:20:50.235Z"
    }
  ],
  "createdAt": "2025-09-30T07:20:50.235Z",
  "updatedAt": "2025-09-30T07:20:50.235Z"
}
```

#### **`GET /events/:userEmail`** → Get all events for a user

**Response Body:**

```json
{
  "_id": "66c999734974b8ae82dd80aa",
  "email": "john@example.com",
  "events": [
    {
      "name": "Meeting",
      "dateTime": "2025-10-02T10:00:00.000Z",
      "location": "Office",
      "description": "Project discussion",
      "createdAt": "2025-09-30T07:20:50.235Z"
    },
    {
      "name": "Conference",
      "dateTime": "2025-10-10T09:00:00.000Z",
      "location": "Auditorium",
      "createdAt": "2025-09-30T07:21:50.235Z"
    }
  ]
}
```

## 🗄 Database Choice & Justification

* **MongoDB (NoSQL)** chosen for flexibility:

  * Allows storing nested events inside a user’s document.
  * Easy to extend and scale.
  * JSON-like schema works well with event-based data.

## 🧠 Assumptions & Trade-offs

* Each user has a single document containing all their events (simplifies retrieval).
* JWT tokens expire in **24h** .
* No role-based access control, only user-specific event ownership.

## Contact
View developer portfolio at [ravipatelctf](https://ravipatelctf.vercel.app/)
