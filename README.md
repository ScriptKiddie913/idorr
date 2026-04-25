# ChannelNeg CTF Challenge

A deliberately vulnerable web challenge built with Next.js.

## Tech stack

- Next.js 14 (App Router)
- React 18

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repository in Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output: default (`.next`).

Optional environment variable:

- `JWT_SECRET` for token signing key.

## Challenge Notes

This app is intentionally insecure for CTF usage.
