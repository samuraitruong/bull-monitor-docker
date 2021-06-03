FROM node:15-alpine3.10
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=10s --start-period=10s --retries=3 \
CMD curl --fail http://localhost:8080/ping || exit 1

ENTRYPOINT ["npm", "run", "start"]
