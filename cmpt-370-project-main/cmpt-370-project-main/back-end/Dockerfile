FROM node:20-alpine as base

WORKDIR /usr/src/app

# copy aws rds cert to container
COPY ./prisma/us-west-2.pem /usr/local/share/ca-certificates/us-west-2.crt
RUN cat /usr/local/share/ca-certificates/us-west-2.crt >> /etc/ssl/certs/ca-certificates.crt

ENV PORT 80
EXPOSE $PORT
ENV NODE_ENV DEV

# set default user email
ENV DEFAULT_ADMIN_EMAIL "" 

ENV DATABASE_URL "postgresql://postgres:postgres@db/app"

# oauth env vars
ENV GOOGLE_CLIENT_ID "357321546720-hi5vtvaibc3f9pu55ke29f7s8qdlfu6i.apps.googleusercontent.com"
ENV GOOGLE_CLIENT_SECRET "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"
ENV REDIRECT_URL "https://localhost:3030/auth/callback"
ENV CLIENT_URL "https://localhost:3030"
ENV TOKEN_SECRET "jhgjjfkytfdytfjtyfjyfyt56776576tyfgut"

RUN npx prisma generate

# second stage of build to create production image
FROM base as prod

COPY package*.json /usr/src/app/
COPY . /usr/src/app

# oauth env vars
ENV GOOGLE_CLIENT_ID "357321546720-hi5vtvaibc3f9pu55ke29f7s8qdlfu6i.apps.googleusercontent.com"
ENV GOOGLE_CLIENT_SECRET "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"
ENV REDIRECT_URL "https://370-crm.s3-website-us-west-2.amazonaws.com/auth/callback"
ENV CLIENT_URL "https://370-crm.s3-website-us-west-2.amazonaws.com"
ENV TOKEN_SECRET "jhgjjfkytfdytfjtyfjyfyt56776576tyfgut"

RUN npm install

ENV DATABASE_URL "postgresql://postgres:postgres@database-1.cccxoewq4med.us-west-2.rds.amazonaws.com/postgres?sslmode=require&sslcert=./us-west-2.pem" 

ENV NODE_ENV PROD
RUN npx prisma generate

CMD [ "npm", "start" ]
