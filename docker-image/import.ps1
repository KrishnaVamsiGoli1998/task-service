# Import script for Task Service
Write-Host "Importing Task Service Docker image..."
docker load -i task-service.tar
Write-Host "Task Service image imported successfully!"