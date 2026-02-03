# Getting Started

## 🚀 Quick Start for Contributors

### Prerequisites

- Node.js 18+ installed

1. **Clone the repository:**

```bash
   git clone https://github.com/MasterIfeanyi/THOR.git
   cd THOR
```

2. **Install dependencies: everything at once (frontend + backend + database)**

```bash
   npm install
```

3. **Set up your environment variables:**

```bash
   cp .env.example .env
```

Then edit `.env` and add your GitHub OAuth secrets and Next_auth secrets.

4. **Start frontend**

```bash
   npm run dev
```

5. **Open your browser:**
   `http://localhost:3000`

## ⚠️ Important: Always Install from Root

```bash
# ✅ Correct - from monorepo root
npm install

# ❌ Wrong - don't install in individual apps
cd apps/web
npm install  # Don't do this!
```

Installing from the root ensures all packages share dependencies correctly.
