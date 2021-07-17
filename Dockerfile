FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=production

RUN npm ci --ignore-scripts

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]