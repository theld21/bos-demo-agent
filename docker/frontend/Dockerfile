FROM node:22-alpine3.23

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json* ./

RUN npm install --maxsockets 1

EXPOSE 3000

CMD ["npm", "run", "dev"]
