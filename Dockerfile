# FROM node:16-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# ENV NODE_ENV=production
# RUN npm ci
# COPY . .
# RUN mkdir -p logs
# RUN chmod +x /usr/src/app/YtBinary/yt-dlp_linux

# EXPOSE 8080
# CMD [ "npm", "start" ]


FROM node:16-alpine

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci

# Copy the application code
COPY . .

# Create necessary directories and download the yt-dlp binary
RUN mkdir -p YtBinary && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/src/app/YtBinary/yt-dlp_linux && \
    chmod +x /usr/src/app/YtBinary/yt-dlp_linux

# Create a logs directory
RUN mkdir -p logs

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
