# 🚀 Quick Start - Démarrage Rapid

**Pour relancer le projet après l'avoir arrêté**

---

## Terminal 1: PostgreSQL

```bash
cd c:\Users\byteg\Desktop\edu-ci
docker-compose up -d postgres

# Vérifier que c'est prêt:
docker-compose ps
docker-compose logs postgres | Select-Object -Last 20
```

**Attendez 5-10 secondes que PostgreSQL soit prêt**

---

## Terminal 2: Backend

```bash
Set-Location "c:\Users\byteg\Desktop\edu-ci\backend"
npm run start:dev
```

Attendez:
```
✅ Backend running on http://localhost:3000
```

---

## Terminal 3: Frontend

```bash
Set-Location "c:\Users\byteg\Desktop\edu-ci\frontend"
npm run dev
```

Attendez:
```
▲ Next.js 16.1.6
- Local:    http://localhost:3001
- Ready in XXms
```

---

## ✅ Application est Prête!

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Database**: PostgreSQL sur 5432

---

## 🧪 Test Rapide

### Créer un utilisateur:
```bash
$headers = @{"Content-Type"="application/json"}
$body = '{"username":"user1","password":"pass123","nom":"User","prenom":"Test"}'
Invoke-WebRequest -Uri "http://localhost:3000/auth/register" -Method POST -Headers $headers -Body $body
```

### Se connecter:
```bash
$headers = @{"Content-Type"="application/json"}
$body = '{"username":"user1","password":"pass123"}'
$r = Invoke-WebRequest -Uri "http://localhost:3000/auth/login" -Method POST -Headers $headers -Body $body
$r.Content | ConvertFrom-Json
```

---

## 🛑 Arrêter les Services

```bash
# Terminal 1: Ctrl+C
# Terminal 2: Ctrl+C  
# Terminal 3: Ctrl+C

# Fermer PostgreSQL:
docker-compose down
```

---

## 📝 Lors d'erreurs

### "Connection refused 5432"
```bash
docker-compose up -d postgres
```

### "Port 3000 already in use"
```bash
# Chercher quel processus utilise le port:
Get-NetTCPConnection -LocalPort 3000

# Kil :
Stop-Process -Id <PID> -Force
```

### "Unexpected token '<'"
Backend pas en cours d'exécution. Vérifiez Terminal 2.

---

**Édit rapide du guide complet**: Voir [SETUP_GUIDE.md](SETUP_GUIDE.md)
