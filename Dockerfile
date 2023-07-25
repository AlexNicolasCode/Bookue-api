FROM node:16-alpine
WORKDIR /usr/local/apps/bookue-api
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src ./src
RUN yarn
RUN yarn add global typescript
RUN yarn build
EXPOSE 8000
CMD yarn start