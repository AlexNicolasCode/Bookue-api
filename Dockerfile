FROM node:16
RUN mkdir -p /api
WORKDIR /api
COPY . /api
RUN yarn install --frozen-lockfile
RUN yarn build
EXPOSE 8000
CMD ["node", "./dist/main/server.js"]