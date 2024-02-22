# ES Engineering Assignment
This is an reddit cloned example of a Next.js app that uses [Clerk](https://clerk.com) for authentication and user management. 

## Tech Stack
- React.js
- Node.js
- T3
- Next.js 14
- Next.js App Router
- tRPC
- Prisma
- PlantedScale
- Clerk
- Tailwind CSS
- shadcn/ui
- Radix UI

## Usage

Go to your https://clerk.com dashboard and click on `Developer->API Keys` to copy your keys. Create a file named `.env.local` and add the following:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR KEY
CLERK_SECRET_KEY=YOUR KEY
```

Install the pnpm
```bash
npm i -g pnpm
```

Install the dependencies:

```bash
pnpm install
```

Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


