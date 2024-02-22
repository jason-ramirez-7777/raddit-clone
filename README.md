# CS Engineer Assessment

> <div style = "font-size : 18px; padding : 10px; text-shadow : 0px 0px 10px dodgerblue;">Reddit clone application of a Next.js.</div>

## Technical Implementation

- Use [create t3 app](https://create.t3.gg/) to start your project
- Use [shadcn/ui](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/) to implement the frontend
- Use the [Next.js App Router](https://nextjs.org/docs/app)
- Use [tRPC](https://trpc.io/) for the backend architecture
- Use [Prisma](https://www.prisma.io/) to query the sql database
- Use [PlanetScale](https://planetscale.com/) for your database
- Use [Clerk](https://clerk.com/) for user management and authentication

## Getting started

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

## Technologies
=======
# ES Engineering Assignment
This is an reddit cloned example of a Next.js app that uses [Clerk](https://clerk.com) for authentication and user management. 
>>>>>>> fddaf180fafba0e952ea0b0e2c09edb47ffeafcb

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

## Pages & Functionalities

<p style = "font-size:17px; font-weight : bold; padding-left : 13px;">Signin</p>
<p align="center">
  <img src="tmp.png" alt="Docker Architecture" width="600px" />
</p>

- If user has an account, can signin with third-party email such as gamil.
- If not, go to signup page.

<p style = "font-size:17px; font-weight : bold; margin-top : 30px; padding-left : 13px;">Signup</p>
<p align="center">
  <img src="tmp.png" alt="Docker Architecture" width="600px" />
</p>

- If user has not an account, can signup with third-party email such as gamil.
- If not, go to signin.

<p style = "font-size:17px; font-weight : bold; margin-top : 30px; padding-left : 13px;">Home</p>
<p align="center">
  <img src="tmp.png" alt="Docker Architecture" width="600px" />
</p>

- Before signin, user only can read the post.
- After signin, user can do everything such posting, replying, vouting.

<p style = "font-size:17px; font-weight : bold; margin-top : 30px;">Posting, Replying and vouting</p>
<p align="center">
  <img src="tmp.png" alt="Docker Architecture" width="600px" />
</p>

- User can post his article.
- Posted article has a title, a content, a poster name and time stamp.
- User can bought to the posted article.
- User can reply for the comment.

<p style = "font-size:17px; font-weight : bold; margin-top : 30px;">Post</p>
<p align="center">
  <img src="tmp.png" alt="Docker Architecture" width="600px" />
</p>

- User can read his own articles.
- User can post his own article.
