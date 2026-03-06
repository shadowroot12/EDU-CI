# Configuration de Déploiement - EDU-CI

## 1. Configuration sur Railway (Backend)

### Variables d'environnement à configurer sur Railway:

```
# Base de données (fournie automatiquement par Railway si PostgreSQL est créé)
DATABASE_URL=postgresql://user:password@host:port/database
# OU les paramètres individuels:
DB_HOST=your-railway-host
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-secure-password
DB_NAME=edu_ci

# Frontend URL (IMPORTANT pour CORS)
FRONTEND_URL=https://your-vercel-app.vercel.app
# Ou en développement: http://localhost:3000

# Node environment
NODE_ENV=production
PORT=3000

# JWT Secret (générer une clé secrète forte)
JWT_SECRET=your-super-secret-jwt-key-change-this
```

### Étapes de configuration sur Railway:

1. Allez dans votre projet Railway
2. Cliquez sur "Variables" dans votre service Backend
3. Ajoutez chaque variable ci-dessus
4. **Important**: Assurez-vous que `FRONTEND_URL` correspond exactement à votre URL Vercel
5. Redéployez le backend après les modifications

---

## 2. Configuration sur Vercel (Frontend)

### Variables d'environnement à configurer sur Vercel:

```
NEXT_PUBLIC_API_URL=https://your-railway-backend-url
```

### Étapes de configuration sur Vercel:

1. Allez dans les paramètres de votre projet Vercel
2. Cliquez sur "Environment Variables"
3. Ajoutez: `NEXT_PUBLIC_API_URL` = `https://your-railway-backend-url`
4. La valeur doit être l'URL de votre backend sur Railway (ex: `https://edu-ci-production.up.railway.app`)
5. Redéployez après les modifications

---

## 3. Problèmes courants et solutions

### ❌ Erreur: "Identifiants incorrects ou problème de connexion"

**Causes possibles:**
- ✋ La base de données PostgreSQL n'est pas connectée à Railway
- ✋ `DATABASE_URL` ou les variables `DB_*` ne sont pas configurées
- ✋ Les données de test ne sont pas dans la base de données
- ✋ CORS bloqué - `FRONTEND_URL` n'est pas configurée correctement

**Solutions:**
```bash
# 1. Vérifier la connexion PostgreSQL sur Railway
# 2. S'assurer que la variable DATABASE_URL est définie
# 3. Créer un utilisateur de test:
#    - Username: admin
#    - Mot de passe: admin123
```

### ❌ Erreur CORS lors de la connexion

**Cause:** `FRONTEND_URL` n'est pas configurée ou ne correspond pas à votre URL Vercel

**Solution:**
```
# Dans Railway → Variables du backend:
FRONTEND_URL=https://your-exact-vercel-url.vercel.app
```

### ❌ Erreur: "Impossible de créer un compte" (inscription)

**Causes possibles:**
- ✋ Connection API incorrecte (`NEXT_PUBLIC_API_URL`)
- ✋ Utilisateur existe déjà
- ✋ Problème de validation des données

**Solutions:**
1. Vérifier `NEXT_PUBLIC_API_URL` sur Vercel
2. Ouvrir la console du navigateur (F12) pour voir les erreurs détaillées
3. S'assurer que le username n'existe pas déjà

---

## 4. Commandes utiles pour tester

### Test local:
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### Test avec curl (vérifier que l'API fonctionne):
```bash
# Tester le signup
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123","nom":"Test","prenom":"User"}'

# Tester le login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

---

## 5. Vérification des déploiements

### Sur Railway:
- ✅ Backend en "Running" (pas d'erreurs rouge)
- ✅ PostgreSQL en "Running"
- ✅ Logs sans erreur: vérifier dans l'onglet "Logs"
- ✅ Variables d'environnement configées

### Sur Vercel:
- ✅ Déploiement réussi
- ✅ Inspecteur navigateur (F12) ne montre pas d'erreurs CORS
- ✅ `NEXT_PUBLIC_API_URL` correct

### Tester la connexion:
1. Allez sur votre app Vercel
2. Essayez de vous connecter avec un compte connu
3. Ouvrez la console (F12) → Network tab
4. Regardez la requête POST vers `/auth/login`
5. Vérifiez la réponse (200 OK et token reçu)

---

## 6. Structure des requêtes API

### Login:
```javascript
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}

Response 200:
{
  "access_token": "eyJhbGci..."
}
```

### Register:
```javascript
POST /auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "secure123",
  "nom": "Dupont",
  "prenom": "Jean"
}

Response 201:
{
  "id": 1,
  "username": "newuser",
  "nom": "Dupont",
  "prenom": "Jean",
  "role": "ENSEIGNANT"
}
```

## 7. Checklist de déploiement

- [ ] PostgreSQL connecté sur Railway
- [ ] Variables `DB_*` ou `DATABASE_URL` configurées dans Railway
- [ ] `FRONTEND_URL` configurée dans Railway (doit être exact)
- [ ] `NEXT_PUBLIC_API_URL` configurée dans Vercel  
- [ ] Backend redéployé après changement de variables
- [ ] Frontend redéployé après changement de variables
- [ ] Utilisateur de test créé dans PostgreSQL
- [ ] Test login/register depuis le navigateur
- [ ] Console navigateur (F12) sans erreurs CORS
