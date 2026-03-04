# EDU-CI Backend (API)

Ce dossier contient le code source de l'API REST de la plateforme EDU-CI, construite avec [NestJS](https://nestjs.com/).

## 🏗 Architecture

Le backend est structuré en modules fonctionnels :

- **Auth** : Gestion de l'authentification (JWT, Refresh Token) et des rôles.
- **Users** : Gestion des utilisateurs (Élèves, Enseignants, Parents, Admin).
- **School** : (À venir) Gestion des établissements, classes, matières.
- **Grades** : (À venir) Gestion des notes et bulletins.

### Base de Données
Nous utilisons **PostgreSQL** avec **TypeORM** pour l'ORM.
La configuration de connexion se trouve dans `src/app.module.ts` (ou via variables d'environnement en production).

## 🚀 Démarrage

### Prérequis
Assurez-vous que l'infrastructure Docker (Postgres, Redis) est lancée depuis la racine du projet :
```bash
docker-compose up -d
```

### Installation
```bash
npm install
```

### Lancer le serveur (Dev)
```bash
npm run start:dev
```

### Tests
```bash
# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e
```

## 🔐 Sécurité & Rôles
Le système utilise un RBAC (Role-Based Access Control) strict défini dans `src/users/enums/user-role.enum.ts`.
Les endpoints sont protégés par des Guards JWT.

## 📄 Documentation API
L'API expose une documentation Swagger (OpenAPI) accessible sur `/api` (si activé dans `main.ts`).
