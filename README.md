## About this Project
This Project is an attempt at creating a headlessly managed content system. It uses the backend of Wordpress to manage a seperate frontend hosted on Vercel. The frontend is a Responsive website that uses Bootstrap 5 instead of wordpress styles. All api requests are handled with GraphQL through the GraphQL plugin in Wordpress. The endpoint for all requests is thus ["/graphql"]. There are three main integrations at this point:

    1. Github --> Vercel
       Every push to the main branch will trigger a new deployment on vercel.

    2. Wordpress --> Zapier --> Discord
       Every new post will create a new message in the general chat of my Discord server with links to the new post. This is acheived through the wordpress Plugin Zapier. 

    3. Wordpress --> Zapier --> vercel
       Every new post and updated post will trigger a new build on vercel through a post request sent by Zapier Webhooks. 

    4. Discord --> Zapier--> Wordpress (not active at the moment)
        I did also manage to create an integration from a discord message to a draft in wordpress that could be then published however since the content on my frontend uses the dangerouslysetHTML attribute I wondered if this was actually a good idea. Dilemas aside, its possible.  

 *Side Note: Zapier is a Subscription based plugin with a 14 day trial that will expire around 10/10/22 at which point the last three integrations will not work. 


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

  6. Go To [http://localhost:8888] if you clicked on use MAMP Defaults in the Port section of the        install otherwise use what localhost you decided on.
   
  7. Proceed with the wordpress instalation. Use the database name, username, and password from step 5 as well as the mySQL address in step 2 for Database Host.
   
  8. Proceed with the wordpress installation and create an administrator account that you will use to login to your wordpress manager. 
   
  9.  Navigate to the Plug Ins section of the wordpress manager and click on Add New. Search for the Following addons:
           a. All-In-One WP Migration by ServMax
           b. Wp Maximum Upload File Size by CodePopular
  
This is the point of divergence if you are recreating your own project with your own Lightsail deployed backend from this point on we will be proceeding with steps specific to my project. Using the Migration to tool deployed on http://wordpress.mikkotirronen.com to migrate my deployment to the local environment for testing. 
   

  
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
