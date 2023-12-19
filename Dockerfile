# Use an official Node.js runtime as a parent image
FROM node:14-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Remove existing node_modules and package-lock.json
RUN rm -rf node_modules package-lock.json

# Set yarn configuration
RUN yarn config set "strict-ssl" false -g

# Install dependencies
RUN yarn install
RUN yarn cache clean


# Set NODE_OPTIONS
RUN export NODE_OPTIONS="--openssl-legacy-provider"

# Copy the content of the local src directory to the working directory
COPY . .

# Build the React app
#RUN yarn run build

# Use a smaller base image for the production build
FROM nginx:alpine

# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Copy the built app from the builder stage
COPY --from=builder /app/build .

# Expose port 80
EXPOSE 80

# Start Nginx to serve the application
CMD ["yarn", "start"]
