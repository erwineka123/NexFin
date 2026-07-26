# Personal Finance Management System

Website financial pribadi berbasis Next.js 15, TypeScript, Tailwind CSS, shadcn/ui patterns, React Hook Form, Zod, TanStack Query, Recharts, dan Supabase.

## Menjalankan project

```bash
npm install
npm run dev
```

## Environment

Salin `.env.example` menjadi `.env.local`, lalu isi:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Fitur yang sudah disiapkan

- Dashboard modern dengan summary, chart, goals, budgets, dan reminder
- Modul wallets, transactions, budgets, goals, reports, settings
- Form dengan React Hook Form + Zod
- Server action dasar untuk auth, wallet, dan transaction
- Scaffold Supabase helper dan SQL migration awal

Saat environment Supabase belum diisi, aplikasi otomatis memakai demo data agar UI tetap bisa ditinjau.
