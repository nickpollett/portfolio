## 370 CRM

### Frontend
<ul>
    <li>React   https://react.dev/reference/react</li>
    <li>React Router  https://reactrouter.com/en/main</li>
    <li>React Query  https://www.npmjs.com/package/@tanstack/react-query</li>
    <li>Graphql Request   https://www.npmjs.com/package/graphql-request</li>
    <li>Tailwind css  https://tailwindcss.com/docs/installation</li>
    <li>Dasiy UI https://daisyui.com/components/</li>
</ul>

### Backend
<ul>
    <li>Nodejs  https://nodejs.org/docs/latest-v20.x/api/</li>
    <li>Express  https://expressjs.com/en/5x/api.html</li>
    <li>Graphql HTTP  https://www.npmjs.com/package/graphql-http</li>
    <li>Prisma https://www.prisma.io/docs</li>
</ul>
Postman is good option to test backend queries  https://www.postman.com/downloads/

### Run

docker-compose file to run frontend, backend, db and db adminer

#### Local Development

Should all be all automatic on fresh installs.
Enter the google account email to be used for the default admin account to the enviroment variables in the backend docker file. Then start the docker compose project.


~~Start containers with docker-compose up from the project root directory
on fresh install, need to push schema to database
Single command should work
docker exec -it project_cmpt370-backend-1 npx prisma db push
If that doesn't work, run the following commands
docker exec -it <backend conatinaer ID> /bin/sh
npx prisma db push~~
        

<ul>
    <li>frontend on port 3030 - https</li>
    <li>backend on port 5050</li>
    <li>db on port 5432</li>
    <li>db adminer on port 8080</li>
</ul>

### Deploy
<ul>
    <li>buddyCI - push to main branch will trigger deployment to AWS</li>
    <li>backend on aws app runner</li>
    <li>frontend on aws s3</li>
    <li>db on aws rds - postgresql</li>
</ul>


