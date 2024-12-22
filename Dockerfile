FROM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]

