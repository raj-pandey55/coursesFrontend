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

# Expose the port your app runs on
EXPOSE 5173

# Start the application using Vite preview
CMD ["npm", "run", "dev"]
