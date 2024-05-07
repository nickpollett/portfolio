FROM node:20-alpine

WORKDIR /usr/src/app

ENV PORT 5173
EXPOSE $PORT

ENV NODE_ENV=DEV

CMD [ "npm", "run", "dev", "--", "--host" ]
