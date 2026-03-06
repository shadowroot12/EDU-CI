# Dépannage CORS et Authentification

## 🔍 Diagnostic rapide

### Option 1: Vérifier les logs du backend sur Railway

1. Allez sur Railway → votre projet → Backend service
2. Cliquez sur "Logs"
3. Cherchez les erreurs de type:
   - `ECONNREFUSED` → PostgreSQL ne répond pas
   - `CORS` error → Configurez `FRONTEND_URL`
   - `authentication failed` → Vous connecter avec les bon identifiants

### Option 2: Tester directement l'API (Postman / curl)

```bash
# 1. Test de connexion à l'API
curl https://your-railway-backend-url/auth/profile

# 2. Test d'inscription
curl -X POST https://your-railway-backend-url/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test123","password":"test123","nom":"Test","prenom":"User"}'

# 3. Test de connexion
curl -X POST https://your-railway-backend-url/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test123","password":"test123"}'
```

---

## 🛠️ Correction du CORS (à faire si vous avez des erreurs CORS)

Si vous recevez des erreurs CORS, modifiez `main.ts`:

### Avant (actuel):
```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

### Après (plus robuste):
```typescript
app.enableCors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
});
```

---

## 🔐 Configurer JWT_SECRET

### Générer une clé secrète forte:

```bash
# Sur Windows PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Min 0 -Max 256) }))

# Sur Linux/Mac:
openssl rand -base64 32

# Ou utiliser Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiez la clé générée et configurez-la sur Railway:
```
JWT_SECRET=votre-clé-générée-ici
```

---

## 📋 Checklist rapide de débogage

### 1. Vérifier Backend sur Railway:

```bash
curl https://your-railway-url/auth/profile
# Attendu: Erreur 401 (non authentifié) - C'est normal, c'est bon signe!
```

### 2. Vérifier la connexion à la BD:

Dans Railway, allez à Postgres → Logs, vous devriez voir les connexions réussies

### 3. Vérifier Frontend sur Vercel:

```bash
# Ouvrir DevTools (F12) → Console
# Vous ne devriez pas voir d'erreurs CORS
```

### 4. Tester une inscription:

```bash
curl -X POST https://your-railway-backend-url/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username":"newuser_'$(date +%s%N)'",
    "password":"Test123!@#",
    "nom":"User",
    "prenom":"Test"
  }'
```

---

## 🚨 Problèmes Courants

| Problème | Cause | Solution |
|----------|-------|----------|
| `ECONNREFUSED` | PostgreSQL ne répond pas | Créer une BD PostgreSQL sur Railway |
| Erreur CORS | `FRONTEND_URL` ne correspond pas | Configurer `FRONTEND_URL=https://your-vercel-url` |
| 401 Unauthorized | Token invalide/expiré | Se reconnecter après clearing localStorage |
| 404 /auth/login | Backend ne répond pas | Vérifier que Railway backend est Running |
| 500 Database error | BD non configurée | Configurer DATABASE_URL ou DB_* sur Railway |
| Inscription: username exists | L'utilisateur existe | Utiliser un username unique |
| Vide localhost en prod | `NEXT_PUBLIC_API_URL` manquante | Configurer sur Vercel |

---

## 💡 Résumé des URLs

Remplacer dans votre configuration:

```
VOTRE_VERCEL_URL = https://your-app.vercel.app
VOTRE_RAILWAY_BACKEND_URL = https://your-backend.up.railway.app
```

### Sur Railway (variables du backend):
```
FRONTEND_URL = https://your-app.vercel.app
DATABASE_URL = postgresql://user:pass@host:5432/db
NODE_ENV = production
```

### Sur Vercel (variables du frontend):
```
NEXT_PUBLIC_API_URL = https://your-backend.up.railway.app
```

---

## 📞 Support Rapide

1. **"Cannot connect to database"** → Allez sur Railway → PostgreSQL → créez une BD avec Railway
2. **"CORS error"** → Copiez votre URL Vercel complète dans Railway `FRONTEND_URL`
3. **"Wrong credentials"** → Créez un nouveau compte test d'abord
4. **"API not responding"** → Vérifiez dans les logs Railway qu'il n'y a pas d'erreur
