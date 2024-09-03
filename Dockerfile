# Use the latest Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the app for production
RUN npm run build

# Install a simple server to serve the static files
RUN npm install -g serve

# Expose the port for serving the static files
EXPOSE 5000

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "5000"]
