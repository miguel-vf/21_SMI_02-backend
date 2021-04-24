FROM node:12

# Install packages
RUN apt-get update -q \ 
    && apt-get install -qy ffmpeg

# Create service directory
WORKDIR /usr/src/service

# Copy service code into service directory
COPY . .

# Install dependencies
RUN npm install

# Launch de service
CMD node index.js