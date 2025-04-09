# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy all backend files (including prisma) first
COPY . .

# Install dependencies
RUN npm install

# For debugging: Confirm schema.prisma exists in the container
RUN ls -la ./prisma

# Generate the Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Expose the port
EXPOSE 4000

# Start the backend
CMD ["node", "index.js"]
