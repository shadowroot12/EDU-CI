# Guide Complet: Déploiement EDU-CI sur Railway + Vercel

## Phase 1: Préparation Locale ✅

### 1. Si ce n'est pas déjà fait, créer les fichiers .env

**Backend: `backend/.env.local`**
```
DATABASE_URL=postgresql://edu_user:edu_password@localhost:5432/edu_db
JWT_SECRET=dev-default-secret-change-in-production
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3000
```

**Frontend: `frontend/.env.local`**
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Tester localement

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run start:dev
# Doit afficher: "Listening on port 3000"

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
# Doit afficher: "▲ Next.js 16.1.6"
```

### 3. Test d'une inscription locale

```bash
# Ouvrir http://localhost:3000 dans le navigateur
# Cliquer sur "S'inscrire"
# Remplir le formulaire et soumettre
# Vérifier qu'aucune erreur CORS ne s'affiche en F12 → Console
```

---

## Phase 2: Configuration Railway (Backend) 🚀

### Étape 1: Créer le service Backend

1. Allez sur [railway.app](https://railway.app)
2. Cliquez sur "New Project"
3. Sélectionnez "GitHub Repo"
4. Connectez votre repo GitHub edu-ci
5. Sélectionnez la branche principale
6. Railway va détecter `backend/package.json` automatiquement

### Étape 2: Créer la base de données PostgreSQL

1. Dans votre projet Railway, cliquez sur "Add Plugin"
2. Cherchez et sélectionnez "PostgreSQL"
3. Railway va générer automatiquement les variables d'environnement

### Étape 3: Configuration des Variables d'Environnement

1. Cliquez sur votre service Backend
2. Allez dans "Variables"
3. Ajoutez les variables manquantes:

```
# JWT Secret - Générer une clé forte
JWT_SECRET=[Exécuter: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]

# Frontend URL - À configurer APRÈS Vercel (voir Phase 3)
FRONTEND_URL=https://your-vercel-app.vercel.app

# Node Environment
NODE_ENV=production

# Port
PORT=3000
```

### Étape 4: Build and Deploy

1. Railway va automatiquement détecter que c'est un projet NestJS
2. Il va installer les dépendances et construire le projet
3. Attendez que le statut passe à "✅ Success"
4. Notez l'URL du backend (ex: `https://edu-ci-production.up.railway.app`)

### Étape 5: Vérifier le déploiement

```bash
# Ouvrir dans le navigateur:
https://your-railway-backend-url/auth/profile

# Vous devriez obtenir une erreur 401 (normal - pas authentifié)
# Si erreur 404 ou 502, vérifier les logs dans Railway
```

### Vérifier les logs Railway

1. Cliquez sur Backend → onglet "Logs"
2. Cherchez les erreurs:
   - `error listening on port` → Port conflit
   - `ECONNREFUSED` → PostgreSQL non connecté
   - `No JWT_SECRET` → Variable manquante
   - `CORS` errors → FRONTEND_URL non configurée

---

## Phase 3: Configuration Vercel (Frontend) 🎨

### Étape 1: Connecter Vercel à GitHub

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Import Project"
3. Sélectionnez "GitHub"
4. Cherchez le repo `edu-ci`
5. Cliquez "Import"

### Étape 2: Configuration du Déploiement

1. Dans "Project Settings", sélectionnez "Framework" = "Next.js"
2. Root Directory = `./frontend`
3. Build Command = `npm run build` (déjà défini dans package.json)
4. Output Directory = `.next`

### Étape 3: Variables d'Environnement

1. Allez dans "Settings" → "Environment Variables"
2. Ajoutez:

```
NEXT_PUBLIC_API_URL = [Votre URL Railway backend]
```

Exemple:
```
NEXT_PUBLIC_API_URL = https://edu-ci-production.up.railway.app
```

### Étape 4: Créer le Déploiement

1. Vercel va automatiquement déployer
2. Attendez que le statut passe à "✅ Ready"
3. Notez l'URL Vercel (ex: `https://edu-ci.vercel.app`)

### Étape 5: Mettre à jour FRONTEND_URL sur Railway

**Très important!** Maintenant que vous avez l'URL Vercel:

1. Retournez sur Railway
2. Allez dans Backend → Variables
3. Mettez à jour `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://your-vercel-app.vercel.app
   ```
4. Railway va automatiquement redéployer
5. Attendez le ✅

### Étape 6: Test du déploiement

```bash
# 1. Ouvrir votre URL Vercel dans le navigateur
https://your-vercel-app.vercel.app

# 2. Ouvrir la Console (F12 → Console)
# Ne pas avoir d'erreurs CORS ni 404

# 3. Essayer de s'inscrire avec un nouvel utilisateur
# Si erreur, voir la console pour les détails

# 4. Essayer de se connecter
# Doit rediriger vers /dashboard
```

---

## Phase 4: Dépannage Final 🔧

### Vérifier chaque partie en isolation

```bash
# 1. Backend répond?
curl https://your-railway-backend-url/auth/profile
# Réponse attendue: {"message":"Unauthorized"} ou erreur 401

# 2. Frontend charge?
# Ouvrir https://your-vercel-app.vercel.app 
# Ne pas avoir d'erreurs dans Devtools (F12)

# 3. API URL correcte?
# F12 → Console → Taper:
console.log(process.env.NEXT_PUBLIC_API_URL)
# Doit afficher: https://your-railway-backend-url
```

### Problèmes courants et solutions

| Problème | Cause | Solution |
|----------|-------|----------|
| ❌ CORS error lors du login | `FRONTEND_URL` incorrect sur Railway | Verifier que c'est exact: `https://your-app.vercel.app` |
| ❌ 502 Bad Gateway au login | Backend n'a pas redéployé | Attendre que Railway finisse de rebuild |
| ❌ "Cannot reach API" | `NEXT_PUBLIC_API_URL` manquant | Ajouter sur Vercel → Redployer |
| ❌ "Database connection lost" | Problème PostgreSQL | Vérifier qu'il est Running sur Railway |
| ❌ Erreur statique Vercel | Mauvaise config du projet | Vérifier que Root Directory = `./frontend` |

### Vérifier les logs

**Railway - Backend Logs:**
```
1. Backend service → Logs tab
2. Chercher les errors (rouge)
3. Common: "CORS", "ECONNREFUSED", "JWT_SECRET"
```

**Vercel - Build Logs:**
```
1. Vercel Dashboard → Deployments
2. Cliquer sur le dernier déploiement
3. Chercher les errors dans "Build Logs"
```

---

## Phase 5: Après le déploiement ✨

### 1. Créer les données de test

```bash
# Créer un utilisateur de test via l'inscription en ligne
# Ou utiliser curl:
curl -X POST https://your-railway-backend-url/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "nom": "Admin",
    "prenom": "User"
  }'
```

### 2. Tester toutes les fonctionnalités

- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Dashboard se charge
- [ ] Pas d'erreur CORS
- [ ] localStorage contient le token
- [ ] La déconnexion fonctionne

### 3. Configuration de sécurité recommandée

**Sur Railway Backend:**
```
# Générer une clé secrète forte:
JWT_SECRET = [clé 32 chars générée]

# Ajouter les variables manquantes:
NODE_ENV = production
```

### 4. Auto-déploiement

Les deux services (Railway et Vercel) vont automatiquement redéployer quand vous pushez sur GitHub:
- Changement dans `/backend` → Railway redéploie
- Changement dans `/frontend` → Vercel redéploie

---

## Checklist Globale

- [ ] Backend construit et déployé sur Railway ✅
- [ ] PostgreSQL créé et connecté sur Railway ✅
- [ ] JWT_SECRET configuré sur Railway ✅
- [ ] Frontend construit et déployé sur Vercel ✅
- [ ] NEXT_PUBLIC_API_URL configuré sur Vercel ✅
- [ ] FRONTEND_URL configuré sur Railway ✅
- [ ] Test inscription sur l'app Vercel ✅
- [ ] Test connexion sur l'app Vercel ✅
- [ ] Pas d'erreur CORS dans F12 ✅
- [ ] Dashboard accessible après connexion ✅

---

## Besoin d'aide?

Si vous êtes bloqué:

1. **Ouvrir F12 → Console** dans votre navigateur
2. **Copier l'erreur exacte**
3. **Aller dans Railway → Logs** pour le backend
4. **Comparerle message d'erreur avec le TROUBLESHOOTING.md**

Les erreurs les plus courantes:
- `CORS error` → Variable `FRONTEND_URL` incorrecte
- `Cannot POST /auth/login` → Backend URL incorrecte
- `Unauthorized` → Identifiants de test manquants
- `database not found` → PostgreSQL pas créé
