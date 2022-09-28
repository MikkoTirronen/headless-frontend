This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
#Backend Requirements:
  -install MAMP
  -download a copy of wordpress from http://wordpress.org
#Local development Backend Setup:
  1. In MAMP configure your preferences to point the document root to your wordpress download
  2. In Port settings of your preferences I recommend using the MAMP defaults
     *Take note of the mysql address you will need this later in the wordpress install
  3. Click on the Open Webstart Page
  4. Under tools go to php admin
  5. Click on Database in the Navigation Menu and create Database
    *Take note of this name as you will need it in the wordpress install
    *Take note of User Page here if you are uncertain what user account will have access to connect to the database
  6. Go To [http://localhost:8888] if you clicked on use MAMP Defaults in the Port section of the install otherwise use what            localhost you decided on.
  
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
