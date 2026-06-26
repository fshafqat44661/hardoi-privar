# Hardoi Parivar NCR — Next.js App

Community + donation website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **MongoDB**, **JWT auth**, and **Redux Toolkit**.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js App Router, React 19, Tailwind CSS |
| Backend | Next.js Route Handlers (`/api/*`) |
| Database | MongoDB + Mongoose |
| Auth | JWT (httpOnly cookie) |
| State | Redux Toolkit (forms, auth, event filters) |

## Getting started

```bash
cd web
npm install
cp .env.example .env.local   # edit MONGODB_URI + JWT_SECRET
npm run seed                 # requires MongoDB running
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin:** `/admin/login` — credentials from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env.local` (default after seed: `admin@hardoiparivar.org` / `Admin@123456`)

## Project structure

```
src/
├── app/
│   ├── (site)/          # Public pages (shared Header/Footer)
│   ├── admin/           # JWT-protected dashboard
│   └── api/             # REST endpoints
├── components/          # UI by feature (layout, home, forms, gallery)
├── lib/                 # db, auth, services, validators
├── models/              # Mongoose schemas
├── store/               # Redux slices + thunks
└── types/               # Shared TypeScript types
```

## API routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Admin login → JWT cookie |
| GET | `/api/auth/me` | Current user |
| POST | `/api/auth/logout` | Clear session |
| GET | `/api/events` | List events |
| GET | `/api/gallery` | Gallery items |
| POST | `/api/donations` | Record donation pledge |
| GET | `/api/donations` | List donations (admin) |
| POST | `/api/membership` | Membership registration |
| POST | `/api/contact` | Contact form |
| GET | `/api/blogs` | Published blog posts (future) |

## Notes

- Copy community photos from the legacy Vite app into `public/assets/` (paths match original `db.json`).
- Payment gateway integration is stubbed on the donate form — pledges are stored in MongoDB.
- Blog page is scaffolded at `/blog` for future CMS work.
