# Task Service Run Script

# Check if Docker is installed and running
$dockerRunning = Get-Process -Name "Docker Desktop" -ErrorAction SilentlyContinue
if (-not $dockerRunning) {
    Write-Host "Docker Desktop is not running. Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}

# Check if the Docker image exists
$imageExists = docker images -q task-service:latest
if (-not $imageExists) {
    # Try to load the image if it doesn't exist
    if (Test-Path "docker-image/task-service.tar") {
        Write-Host "Loading Task Service Docker image..." -ForegroundColor Yellow
        docker load -i docker-image/task-service.tar
    } else {
        # Build the image if the TAR file doesn't exist
        Write-Host "Building Task Service Docker image..." -ForegroundColor Yellow
        docker-compose build
    }
}

# Start the service
Write-Host "Starting Task Service..." -ForegroundColor Green
docker-compose up -d

Write-Host "Task Service is running on http://localhost:4001" -ForegroundColor Green