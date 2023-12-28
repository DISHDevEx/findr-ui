# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to current
WORKDIR .

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy package.json and yarn.lock to the container
#COPY package.json yarn.lock ./

# Install dependencies
RUN npm install
#RUN npm install -g yarn

# Set yarn configuration
RUN yarn config set "strict-ssl" false -g

# Install dependencies
RUN yarn install
RUN yarn cache clean

# Remove existing node_modules and package-lock.json
RUN rm -rf node_modules package-lock.json

# Set NODE_OPTIONS
RUN export NODE_OPTIONS="--openssl-legacy-provider"

# Copy the content of the local src directory to the working directory
COPY . .


#Build the React app
RUN yarn run

# Use a smaller base image for the production build
#FROM nginx:alpine

# Set the working directory to /usr/share/nginx/html
#WORKDIR /usr/share/nginx/html

# Copy the built app from the builder stage
#COPY --from=builder /app/build .

# Expose port 7000
EXPOSE 7000

# Start Nginx to serve the application
CMD ["yarn", "start"]
