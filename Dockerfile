FROM node:18-alpine

WORKDIR /srv/app

COPY . .

WORKDIR /srv/app/backend

RUN npm i

EXPOSE 8000

CMD ["npm", "start"]