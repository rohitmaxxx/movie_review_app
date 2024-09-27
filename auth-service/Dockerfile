# Dockerfile

# Use the official NestJS base image
FROM node:22.2.0

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt specifically for the Docker environment becasue bcrypt create issue with docker
RUN npm rebuild bcrypt --build-from-source


# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]