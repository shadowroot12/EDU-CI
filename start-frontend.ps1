#!/usr/bin/env pwsh
# Demarrer le frontend Next.js sur le port 3001

Set-Location "c:\Users\byteg\Desktop\edu-ci\frontend"
$env:PORT = "3001"
$env:NEXT_PUBLIC_API_URL = "http://localhost:3000"

Write-Host "Demarrage du frontend Next.js sur le port 3001..."
Write-Host "API: http://localhost:3000"
Write-Host ""

npm run dev
