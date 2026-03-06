# 🔴 Diagnostique Rapide - Erreur "Identifiants incorrects ou problème de connexion"

L'erreur que vous voyez sur votre app Vercel signifie que **l'une de ces choses manque**:

## ⚡ Quick Fix (5 minutes)

### 1️⃣ Railway: Vérifier les variables

**Allez sur Railway → Backend Service → Variables**

Ces variables DOIVENT exister:
```
✅ DATABASE_URL = postgresql://... (créée automatique avec PostgreSQL)
✅ JWT_SECRET = (une clé générée)
✅ NODE_ENV = production
✅ PORT = 3000
✅ FRONTEND_URL = https://your-vercel-app.vercel.app (TRÈS IMPORTANT)
```

Si `FRONTEND_URL` n'existe pas ou est vide, **ajouter le maintenant**.

### 2️⃣ Vercel: Vérifier les variables

**Allez sur Vercel → Settings → Environment Variables**

Cette variable DOIT exister:
```
✅ NEXT_PUBLIC_API_URL = https://your-railway-backend-url.up.railway.app
```

Si elle n'existe pas ou est vide, **ajouter le maintenant**.

### 3️⃣ Redéployer

```
Railway: Attendre que ✅ finisse (auto-redeploy après changement)
Vercel: Attendre que ✅ finisse (auto-redeploy après changement)
```

### 4️⃣ Tester

Attendre 2 minutes, puis rafraîchir votre page Vercel et essayer de vous connecter.

---

## 🔍 Si ça ne marche toujours pas

### Vérifier l'API directement

```bash
# Ouvrir dans le navigateur ou Postman:
GET https://your-railway-backend-url/auth/profile

# Si vous obtenez:
# ✅ {"iat": ...} ou erreur 401 → API fonctionne! ✅
# ❌ 404 ou 502             → Backend problème
# ❌ CORS error             → FRONTEND_URL incorrect
```

### Vérifier les logs Railway

1. Railway → Backend → Logs
2. Chercher les mots clés:
   - `"CORS"` → Configurer FRONTEND_URL
   - `"ECONNREFUSED"` → PostgreSQL problème
   - `"listening on"` → Backend OK
   - `"error"` rouge → Voir les détails

### Vérifier la console Vercel

1. F12 (DevTools)
2. Onglet "Console"
3. Chercher les erreurs rouges
4. Copier le message et chercher dans TROUBLESHOOTING.md

---

## 📋 Résumé des URLs à Vérifier

Voici ce que vous devrez mettre:

### Votre URL Vercel (ex):
```
https://edu-ci-production.vercel.app
```
**Utiliser cette URL dans Railway `FRONTEND_URL`**

### Votre URL Railway (ex):
```
https://edu-ci-production.up.railway.app
```
**Utiliser cette URL dans Vercel `NEXT_PUBLIC_API_URL`**

---

## ✅ Étapes de Troubleshooting (5-10 min max)

1. [ ] Copier votre URL Vercel complète (ex: https://edu-ci-xxx.vercel.app)
2. [ ] Aller à Railway → Backend → Variables
3. [ ] Configurer `FRONTEND_URL = votre-url-vercel` (exactement)
4. [ ] Attendre que Railway finisse de redéployer (pas d'erreur rouge)
5. [ ] Copier votre URL Railway (pendant ce temps)
6. [ ] Aller à Vercel → Settings → Env Variables
7. [ ] Configurer `NEXT_PUBLIC_API_URL = votre-url-railway`
8. [ ] Attendre que Vercel finisse de redéployer
9. [ ] F12 (DevTools) → Console (vérifier pas d'erreur)
10. [ ] Rafraîchir et essayer de se connecter

---

## 🚨 Erreurs Spécifiques Vues

### Erreur 1: "Identifiants incorrects ou problème de connexion"

**Cause la plus probable:** `NEXT_PUBLIC_API_URL` manquant ou incorrect

**Vérifier:**
```javascript
// F12 → Console → Taper:
process.env.NEXT_PUBLIC_API_URL

// Doit montrer une URL, pas undefined
```

### Erreur 2: CORS Policy violation

**Cause:** `FRONTEND_URL` non configuré sur Railway

**Vérifier:**
```
Railway → Backend → Variables → FRONTEND_URL doit exister
```

### Erreur 3: 502 Bad Gateway

**Cause:** Backend ne répond pas

**Vérifier:**
```
Railway → Backend → Logs → chercher "error" en rouge
```

---

## 🎯 Checklist Finale

Avant de vous plaindre que ça marche pas:

- [ ] Vérifier que DATABASE_URL existe sur Railway
- [ ] Vérifier que FRONTEND_URL existe sur Railway et match votre Vercel URL
- [ ] Vérifier que NEXT_PUBLIC_API_URL existe sur Vercel et match votre Railway URL
- [ ] Attendre que Railway finisse de redéployer (✅)
- [ ] Attendre que Vercel finisse de redéployer (✅)
- [ ] F12 → Console → pas d'erreurs rouges
- [ ] Tester avec curl ou Postman la route `/auth/profile`
- [ ] Si tout ça marche, faire une inscription fresh pour tester

---

## 📞 Si tu es vraiment bloqué

**Partager ces informations:**

1. URL de ta page Vercel
2. Capture d'écran du Railway backend Variables
3. Capture d'écran du Vercel environment variables
4. Capture d'écran de l'erreur F12 Console
5. Output de: `curl https://your-railway-backend-url/auth/profile`

Ça permettra de voir exactement ce qui manque.
