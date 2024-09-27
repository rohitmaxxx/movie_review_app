# Use the official NestJS base image
FROM node:22.2.0 AS build

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage for running tests
FROM build AS test

# Set the working directory to the built application
WORKDIR /usr/src/app

# Copy only necessary files for testing
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist

# Install only production dependencies
RUN npm install --only=production

# Run tests
CMD ["npm", "run", "test"]

# Final stage for production
FROM build AS production

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
