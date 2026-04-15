#!/bin/bash

# Start all microservices

echo "Starting RS Medika Lestari Microservices..."

# Build shared types
echo "Building shared types..."
pnpm -F shared-types build

# Start API Gateway
echo "Starting API Gateway on port 3001..."
pnpm -F api-gateway dev &

# Start Doctors Service
echo "Starting Doctors Service on port 3002..."
pnpm -F service-doctors dev &

# Start Services Service
echo "Starting Services Service on port 3003..."
pnpm -F service-services dev &

# Start Auth Service
echo "Starting Auth Service on port 3004..."
pnpm -F service-auth dev &

# Start Next.js Frontend
echo "Starting Next.js Frontend on port 3000..."
pnpm dev &

echo "All services are starting..."
echo "Frontend: http://localhost:3000"
echo "API Gateway: http://localhost:3001"
echo "Doctors Service: http://localhost:3002"
echo "Services Service: http://localhost:3003"
echo "Auth Service: http://localhost:3004"

wait
