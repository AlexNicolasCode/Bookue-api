FROM node:16-alpine
COPY package.json .
RUN npm install
RUN npm install typescript -g
COPY . .
RUN tsc
EXPOSE 8000
CMD ["node", "./dist/server.js"]