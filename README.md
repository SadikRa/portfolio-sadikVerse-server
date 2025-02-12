# Portfolio-SadikVerse-Server

This is the backend repository for **SadikVerse**, a portfolio project that manages blogs, projects, authentication, and other essential features. Built with **Node.js, Express, and MongoDB**, the backend provides a secure and efficient API for the frontend.

## 🚀 Live Backend

- **Deployed API:** [SadikVerse Server](https://portfolio-server-kappa-ashen.vercel.app/)
- **Frontend Repository:** [GitHub Link](https://github.com/SadikRa/portfolio-sadikVerse)
- **Frontend Live Site:** [SadikVerse](https://sadikverse.vercel.app/)

## 📂 Project Setup

To set up the backend locally, follow these steps:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SadikRa/portfolio-sadikVerse-server.git
cd portfolio-sadikVerse-server
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
DATABASE_URL=
NODE_ENV=development
BCRYPT_SALT_ROUNDS=8
DEFAULT_PASS=SadikVerse!@#
JWT_SECRET=secret
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=2d
JWT_REFRESH_EXPIRES_IN=15d
```

### 4️⃣ Run the Server

For development mode:

```bash
npm run dev
```

For production mode:

```bash
npm start
```

### 5️⃣ API Documentation

Once the server is running, you can test the API using **Postman** or **Thunder Client**.

## 🔥 Features

- **Authentication:** Google & GitHub OAuth integration with NextAuth.
- **Blog Management:** Create, update, and delete blogs.
- **Project Showcase:** Manage project details dynamically.
- **User Role Management:** Secure dashboard access for admins.
- **JWT Authentication:** Secure API endpoints with JSON Web Tokens.
- **MongoDB Database:** Efficient data handling using Mongoose.

## 📌 Folder Structure

```
portfolio-sadikVerse-server/
├── controllers/       # API logic and business rules
├── models/            # MongoDB schemas
├── routes/            # Express routes
├── middleware/        # Authentication & error handling
├── config/            # Database and environment configurations
├── utils/             # Helper functions
├── server.js          # Entry point for the backend
├── package.json       # Project dependencies
└── .env               # Environment variables
```

##  Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth (Google, GitHub OAuth), JWT
- **Hosting:** Vercel (Frontend & Backend)

##  License

This project is open-source and available under the [MIT License](LICENSE).

---


