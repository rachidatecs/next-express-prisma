# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files (including prisma folder!)
COPY . .

# Generate the Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Expose the port
EXPOSE 4000

# Start the backend
CMD ["node", "index.js"]
