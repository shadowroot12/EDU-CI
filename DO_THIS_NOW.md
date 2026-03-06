# 🚀 TO-DO: À FAIRE MAINTENANT POUR CORRIGER LES PROBLÈMES

## ⏰ Durée: ~10-15 min

---

## ÉTAPE 1: Récupérer vos URLs (2 min) 📋

### URL Railway Backend:
1. Ouvrez [railway.app](https://railway.app)
2. Sélectionnez votre projet EDU-CI
3. Cliquez sur le service "Backend"
4. Cherchez "Domains" ou "Public URL"
5. Copiez l'URL (ex: `https://edu-ci-production.up.railway.app`)

**Notez-la ici:** 
```
RAILWAY_BACKEND_URL = ____________________________
```

### URL Vercel Frontend:
1. Ouvrez [vercel.com](https://vercel.com)
2. Sélectionnez votre projet EDU-CI
3. Cherchez "Domains" en haut
4. C'est généralement la première URL (ex: `https://edu-ci-production.vercel.app`)

**Notez-la ici:**
```
VERCEL_FRONTEND_URL = ____________________________
```

---

## ÉTAPE 2: Configurer Railroad (Backend) ✨ (5 min)

1. Allez sur Railway → Backend Service
2. Cliquez sur l'onglet "**Variables**"
3. Pour **chaque ligne ci-dessous**, vérifiez/ajoutez/corrigez:

### Vérifier ces variables existent:

```
DATABASE_URL     → Devrait commencer par "postgresql://"
                    (créée automatiquement avec PostgreSQL)

JWT_SECRET       → Doit avoir une valeur (voir QUICK_FIX.md si vide)

NODE_ENV         → "production"

PORT             → "3000"

FRONTEND_URL     → "https://votre-url-vercel" 
                    (celle que vous avez copié plus haut)
```

### ⚠️ TRÈS IMPORTANT:
**La variable `FRONTEND_URL` doit être EXACTEMENT votre URL Vercel!**

Exemple:
```
❌ FRONTEND_URL = https://vercel.app (FAUX)
✅ FRONTEND_URL = https://edu-ci-production.vercel.app (BON)
```

### Après modification:
- Railway va **automatiquement redéployer**
- Attendez que le statut devienne ✅ (pas d'erreur rouge)
- ⏳ **Patience: 2-3 minutes**

---

## ÉTAPE 3: Configuration Vercel (Frontend) 🎨 (5 min)

1. Allez sur Vercel → Settings
2. Cherchez "**Environment Variables**"
3. Vérifiez/Ajoutez:

```
NEXT_PUBLIC_API_URL = https://votre-railroad-url
                     (celle que vous avez copié plus haut)
```

Exemple:
```
❌ NEXT_PUBLIC_API_URL = https://up.railway.app (FAUX)
✅ NEXT_PUBLIC_API_URL = https://edu-ci-production.up.railway.app (BON)
```

### Après modification:
- Cliquez "Save"
- Vercel va **automatiquement redéployer**
- Attendez que le statut devienne ✅
- ⏳ **Patience: 2-3 minutes**

---

## ÉTAPE 4: Attendre et Tester ✅ (3 min)

### Attendre que tout soit ✅:
- [ ] ✅ Railway backend (pas d'erreur rouge)
- [ ] ✅ Vercel frontend (pas d'erreur)

### Tester:
1. Ouvrez votre app Vercel: `https://votre-url-vercel`
2. Ouvrez **F12** (Devtools)
3. Allez à l'onglet **"Console"**
4. **Attendez 1-2 sec**, la page doit charger sans erreur CORS

### Si vous voyez une erreur rouge dans la Console:
- Cherchez le message dans `TROUBLESHOOTING.md`
- Ou dans `QUICK_FIX.md`

### Si pas d'erreur:
✨ **Essayez maintenant de vous connecter!**

---

## ÉTAPE 5: Tester la Connexion 🔐

### Option 1: Si vous avez un compte créé avant:
1. Email/Username: `votre-username`
2. Mot de passe: Celui que vous avez utilisé
3. Cliquez "Se connecter"

### Option 2: Si c'est la première fois:
1. Cliquez "S'inscrire"
2. Remplissez le formulaire
3. Cliquez "Créer un compte"
4. Vous serez redirigé vers la connexion
5. Connectez-vous avec votre nouvel compte

### Résultat attendu:
✅ Vous arrivez à `/dashboard`
✅ Pas d'erreur CORS ou 404 en F12

### Si erreur:
1. Ouvrez **F12 → Console**
2. Cherchez l'erreur exacte
3. Comparez avec `QUICK_FIX.md` ou `TROUBLESHOOTING.md`

---

## 📋 CHECKLIST de Configuration Finale

- [ ] Railway `FRONTEND_URL` = votre-url-vercel (exactement)
- [ ] Vercel `NEXT_PUBLIC_API_URL` = votre-url-railway (exactement)
- [ ] Railway a fini de redéployer (✅)
- [ ] Vercel a fini de redéployer (✅)
- [ ] F12 Console pas d'erreur CORS
- [ ] Vous pouvez vous connecter ou vous inscrire
- [ ] Redirection vers dashboard marche

---

## 🆘 Si tu es bloqué

**Avant de demander de l'aide, partage:**

1. Tes DEUX URLs (Railway + Vercel)
2. Une capture de la page d'erreur + F12 Console
3. Une capture de Railway Variables
4. Une capture de Vercel Environment Variables

**Lis aussi:**
- `QUICK_FIX.md` → Dépannage rapide
- `TROUBLESHOOTING.md` → Common issues
- `DEPLOYMENT_COMPLETE_GUIDE.md` → Guide complet

---

## ✨ Résumé en Une Phrase

> **Mets exactement tes URLs Vercel et Railway dans les bonnes variables d'environnement, attends le redeploy, et ça devrait marcher.**
