This is a [Next.js](https://nextjs.org/) and Apollo GraphQL example project based on the look and feel of the Reddit website.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Demo

You can find a demo of this project [here](https://reddit-clone-apollo.vercel.app/). Please note that some of the UI elements are there only for design purposes and do not have any functionality (Search and some of the icons across the top bar).

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [NextAuth.js](https://next-auth.js.org/providers/github)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Approach

- `getServerSideProps` was leveraged to populate the Apollo cache on the client with the initial data from the server, however, no data was returned from the server.
- Lazy loading was implemented for the posts and comments to improve performance.
- NextAuth.js was used to implement authentication with Reddit.
