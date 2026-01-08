# Getting Started

## 🚀 Quick Start for Contributors

### Prerequisites

- Node.js 18+ installed
- A free MongoDB Atlas account ([Sign up here](https://www.mongodb.com/cloud/atlas))


1. **Clone the repository:**

```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
```

2. **Install dependencies: everything at once (frontend + backend + database)**

```bash
   npm install
```

3. **Set up your environment variables:**

```bash
   cp .env.example .env
```
   Then edit `.env` and add your MongoDB connection string.

4. **Set up your database:**

```bash
    npm run db:setup
```

5. **Seed the database with example data (optional):**

```bash
   npm run db:seed
```

6. **Start frontend**

```bash
    npm run dev
```

7. **Or start backend**

```bash
    npm run dev:api
```

8. **Open your browser:**

  ```http://localhost:3000```


## ⚠️ Important: Always Install from Root

```bash
# ✅ Correct - from monorepo root
npm install

# ❌ Wrong - don't install in individual apps
cd apps/web
npm install  # Don't do this!
```

Installing from the root ensures all packages share dependencies correctly.