FROM node:latest
RUN mkdir -p /sr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install

COPY . /usr/src/bot

CMD ["node", "core.js"]