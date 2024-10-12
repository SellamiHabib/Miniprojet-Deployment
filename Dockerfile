# Dockerfile

# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the TypeScript application
RUN yarn build

# Expose the port the app will run on
EXPOSE 8080

# Set the command to start the app
CMD ["yarn", "start"]
