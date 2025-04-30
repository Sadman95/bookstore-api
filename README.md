
# 📚 Bookstore API

A modular, scalable RESTful API for managing books and authors, built using:

- 🧰 **Node.js**, **Express.js**
- 🗃️ **PostgreSQL** (with **Knex** + **Objection.js** ORM)
- 📖 Search, Filtering, and Pagination support
- 🧪 Integrated testing-ready structure

---

## 🚀 Features

- 🔁 Full CRUD operations for **Books** and **Authors**
- 🔍 **Search** by title or author name
- 🎛️ **Pagination**, **Sorting**, and **Filtering**
- 🏗️ Modular, scalable structure with clean code architecture
- 🧱 Knex migration & seed scripts
- 🔐 Environment-based configuration

---

## 📦 Tech Stack

| Layer       | Tool/Library      |
|-------------|-------------------|
| Server      | Node.js, Express  |
| ORM         | Knex + Objection.js |
| DB          | PostgreSQL        |
| Validation  | Yup / Middleware  |
| Querying    | Knex QueryBuilder |
| Environment | dotenv            |
| Testing     | Jest / Supertest (optional setup) |

---

## 📁 Project Structure

```bash
├── src/
│   ├── config/           # Knex config and DB setup
│   ├── controllers/      # Route handlers
│   ├── models/           # Objection.js models
│   ├── routes/           # API endpoints
│   ├── utils/            # Query builders, helpers
│   ├── middlewares/      # Error handlers, validators
│   └── app.ts            # Express app setup
├── knexfile.ts           # Knex migration config
├── .env                  # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bookstore-api.git
cd bookstore-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a \`.env\` file in the root directory:

```bash
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/bookstore
NODE_ENV=development
```

---

### 4. Setup the Database

Make sure PostgreSQL is running locally.

#### Run Migrations

```bash
npx knex migrate:latest
```

#### (Optional) Run Seed Data

```bash
npx knex seed:run
```

---

### 5. Start the Server

```bash
npm run dev
```

Server will run at: 
```bash
http://localhost:5000/api/v1
```

---

## 📚 API Endpoints

### Books

| Method | Endpoint          | Description             |
|--------|-------------------|-------------------------|
| GET    | \`/api/v1/books\`      | Get all books (paginated, searchable) |
| GET    | \`/api/v1/books/:id\`  | Get a specific book     |
| POST   | \`/api/v1/books\`      | Create a new book       |
| PATCH  | \`/api/v1/books/:id\`  | Update a book           |
| DELETE | \`/api/v1/books/:id\`  | Delete a book           |

#### Query Parameters (for \`/api/v1/books\`)

| Param       | Type   | Description                         |
|-------------|--------|-------------------------------------|
| \`page\`      | number | Page number                         |
| \`limit\`     | number | Number of records per page          |
| \`sortBy\`    | string | Field to sort by (e.g., \`title\`)    |
| \`sortOrder\` | string | asc / desc                          |
| \`searchTerm\`| string | Search string for title filtering   |
| \`authorId\`  | string | Filter books by a specific author   |

---

### Authors

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | \`/api/v1/authors\`      | Get all authors (searchable) |
| GET    | \`/api/v1/authors/:id\`  | Get a specific author     |
| POST   | \`/api/v1/authors\`      | Create a new author       |
| PATCH  | \`/api/v1/authors/:id\`  | Update an author          |
| DELETE | \`/api/v1/authors/:id\`  | Delete an author          |

---

## 🔍 Search & Filtering Logic

- Uses \`ILIKE\` with wildcards for case-insensitive partial matches
- Search applies across multiple fields (\`title\`, \`name\`, etc.)
- Custom query builder supports \`searchTerm\`, \`filters\`, \`pagination\`, and \`sorting\`

---



## 📤 Deployment Notes

- Update \`DATABASE_URL\` in \`.env.production\`
- Run Knex migrations in production:
  ```bash
  NODE_ENV=production npx knex migrate:latest
  ```

---


