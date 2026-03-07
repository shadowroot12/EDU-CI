# Script pour créer un utilisateur de test
$headers = @{"Content-Type"="application/json"}
$body = '{"username":"admin","password":"password123","nom":"Admin","prenom":"Test"}'

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/auth/register" -Method POST -Headers $headers -Body $body -UseBasicParsing
    Write-Host "✅ Utilisateur créé avec succès"
    Write-Host "Response:"
    $response.Content
} catch {
    if ($_.Exception.Response) {
        Write-Host "❌ Erreur response:"
        Write-Host $_.Exception.Response
        $_.Exception.Response.Content | Read-Host
    } else {
        Write-Host "❌ Erreur: $_"
    }
}

# Essayer de se connecter
Write-Host "`n--- Test de connexion ---"
$loginBody = '{"username":"admin","password":"password123"}'
try {
    $loginResponse = Invoke-WebRequest -Uri "http://localhost:3000/auth/login" -Method POST -Headers $headers -Body $loginBody -UseBasicParsing
    Write-Host "✅ Connexion réalisée"
    Write-Host "Response:"
    $loginResponse.Content
} catch {
    Write-Host "❌ Erreur login: $_"
}
