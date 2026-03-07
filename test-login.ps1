#!/usr/bin/env pwsh
$headers = @{"Content-Type"="application/json"}
$body = '{"username":"testuser","password":"password123"}'

Write-Host "🔄 Tentative de connexion..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/auth/login" -Method POST -Headers $headers -Body $body -UseBasicParsing
    $json = $response.Content | ConvertFrom-Json
    Write-Host "✅ Connexion réussie!"
    $token = $json.access_token.Substring(0, [System.Math]::Min(50, $json.access_token.Length))
    Write-Host "Token reçu: $token..."
    Write-Host "Utilisateur testé: testuser"
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)"
}
