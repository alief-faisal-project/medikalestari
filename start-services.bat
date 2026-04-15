@echo off
REM Start all microservices for Windows

echo Starting RS Medika Lestari Microservices...

REM Build shared types
echo Building shared types...
call pnpm -F shared-types build

REM Start API Gateway
echo Starting API Gateway on port 3001...
start cmd /k "pnpm -F api-gateway dev"

REM Start Doctors Service
echo Starting Doctors Service on port 3002...
start cmd /k "pnpm -F service-doctors dev"

REM Start Services Service
echo Starting Services Service on port 3003...
start cmd /k "pnpm -F service-services dev"

REM Start Auth Service
echo Starting Auth Service on port 3004...
start cmd /k "pnpm -F service-auth dev"

REM Start Next.js Frontend
echo Starting Next.js Frontend on port 3000...
start cmd /k "pnpm dev"

echo.
echo All services are starting...
echo Frontend: http://localhost:3000
echo API Gateway: http://localhost:3001
echo Doctors Service: http://localhost:3002
echo Services Service: http://localhost:3003
echo Auth Service: http://localhost:3004
