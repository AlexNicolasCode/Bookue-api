FROM node:16
RUN yarn global add pm2
RUN mkdir -p /api
WORKDIR /api
COPY . /api
RUN yarn install --frozen-lockfile
RUN yarn build
EXPOSE 8000
CMD ["pm2", "start", "./dist/main/server.js"]