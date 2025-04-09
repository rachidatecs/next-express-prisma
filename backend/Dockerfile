# Use Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy everything into the container
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Optional: deploy any pending migrations
# RUN npx prisma migrate deploy --schema=./prisma/schema.prisma

# Expose backend port
EXPOSE 4000

# Start the backend
CMD ["npm", "start"]
