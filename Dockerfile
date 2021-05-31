FROM node:15-alpine3.10
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]
