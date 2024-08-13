FROM node:16
WORKDIR /usr/src/app
COPY . .
RUN mkdir logs
RUN chmod +x /home/ec2-user/yt-downloader/YtBinary/yt-dlp_linux

RUN npm install --only=production 



CMD [ "npm", "start" ]
