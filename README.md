# Fullstack App (TurboRepo Monorepo)

This is a fullstack monorepo app setup with:
- **Web**: React + Next.js
- **Mobile**: React Native + Expo
- **Backend**: Express + Prisma + Clerk Auth
- **DB**: PostgreSQL via Docker

---

## 🚀 Project Structure
```
fullstack-app/
├── apps/
│   ├── web/         # React + Next.js
│   └── mobile/      # React Native + Expo
├── backend/         # Express + Prisma + Clerk Auth
│   ├── routes/, middleware/, utils/, swagger.js
├── prisma/          # Prisma schema & migrations
├── shared/          # Shared utilities & types
├── docker-compose.yml
├── .env, .env.example
├── package.json     # Workspaces config
└── turbo.json       # Turborepo config
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org)
- [Docker](https://www.docker.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/):
  ```bash
  npm install -g expo-cli
  ```
- Clerk account for auth ([clerk.dev](https://clerk.dev))

### Initial Setup

#### Web (Next.js)
To scaffold the web app, in app directory:
```bash
npx create-next-app
cd apps/web
npm install
npm run dev
```
(Call it 'web')

#### Mobile (Expo)
To scaffold the mobile app, in app directory:
```bash
npx create-expo-app
cd apps/mobile
npm install
npx expo start
```
(Call it 'mobile')

---

## 🔧 Backend Setup
```bash
# 1. Ensure Docker is running
# 2. Start PostgreSQL
docker compose up -d

# 3. Apply Prisma schema
npx prisma migrate dev --schema=prisma/schema.prisma

# 4. (Optional) Generate Prisma client
npx prisma generate --schema=prisma/schema.prisma

# 5. Start backend API
cd backend
npm install
npm run dev
```

or

```bash
node index.js
```

---

## 🔐 Authentication with Clerk

Clerk handles authentication via their frontend SDKs:
- **Frontend (web/mobile)**: Users log in using Clerk UI (email/password, magic link, social logins, etc.)
- **Backend (Express)**: Authenticated requests include a JWT in headers:
  ```http
  Authorization: Bearer <JWT>
  ```
- The backend validates this token with Clerk’s SDK and makes the `userId` available via `req.userId`.

> Login/logout is handled 100% on the frontend. Backend routes are secured using Clerk's token verification only.

### Environment
Your `.env` must include:
```env
CLERK_SECRET_KEY=sk_test_...your_key_here
```

---

## 📄 API Documentation
Once the backend is running, visit Swagger UI:
```
http://localhost:4000/api-docs
```

---

## 🚢 Deployment
- **Web**: [Vercel](https://vercel.com/)
- **Backend**: [Railway](https://railway.app/), [Fly.io](https://fly.io/), Supabase Edge Functions
- **Mobile**: Expo EAS Build → Play Store & App Store

---

## 🤝 Contributing
- PRs welcome
- Follow Prettier/ESLint (to be added)
- Use descriptive commit messages

## 📬 Contact
For issues, contact the repo maintainer.

---

> Want to contribute a module or improve the docs? Go for it 🚀
