FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p logs
RUN chmod +x /usr/src/app/YtBinary/yt-dlp_linux

EXPOSE 8080
CMD [ "npm", "start" ]
