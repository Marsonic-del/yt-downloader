FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN mkdir -p logs
RUN chmod +x /usr/src/app/YtBinary/yt-dlp_linux

EXPOSE 8080
CMD [ "npm", "start" ]
