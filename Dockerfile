FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci --ignore-scripts

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]