# EDU-CI

**Plateforme Numérique de Gestion Scolaire pour la Côte d'Ivoire**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-development-orange.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

## 🌍 Contexte
EDU-CI est une solution complète de gestion scolaire (SIS) adaptée aux spécificités du système éducatif ivoirien. Elle permet la digitalisation des processus administratifs et pédagogiques des établissements (primaires, collèges, lycées), tout en offrant une interface mobile aux parents et enseignants, avec un support complet du mode hors-ligne.

**Note importante :** Ce système exclut volontairement toute gestion financière (paiements, facturation).

## 🚀 Fonctionnalités Clés

- **Gestion Multi-Établissements** : Configuration centralisée par le Ministère (MENETFP) ou locale par les écoles.
- **Vie Scolaire** : Saisie des présences, gestion des retards et sanctions.
- **Notes & Bulletins** : Calcul automatique des moyennes selon les coefficients officiels ivoiriens, génération de bulletins PDF.
- **Portail Parents** : Suivi en temps réel des notes, absences et communication avec l'école.
- **Mode Hors-Ligne (Offline-First)** : Application mobile fonctionnelle sans internet pour la saisie (sync différée).
- **Tableaux de Bord** : Indicateurs de performance (KPI) pour les chefs d'établissement et le Ministère.

## 🛠 Architecture Technique

Le projet repose sur une architecture moderne et conteneurisée :

| Composant | Technologie | Description |
| :--- | :--- | :--- |
| **Backend** | [NestJS](https://nestjs.com/) | API REST modulaire, TypeScript, TypeORM |
| **Frontend Web** | [Next.js](https://nextjs.org/) | React, Tailwind CSS, Dashboard Admin/Parents |
| **Mobile** | React Native | (À venir) Application iOS/Android Offline-first |
| **Base de Données** | [PostgreSQL](https://www.postgresql.org/) | Données relationnelles structurées |
| **Cache & Queue** | [Redis](https://redis.io/) | Files d'attente pour sync et cache sessions |
| **Stockage** | [MinIO](https://min.io/) | Stockage objet compatible S3 (Documents, Photos) |
| **Infra** | Docker | Conteneurisation de tous les services |

## 📦 Installation & Démarrage

### Prérequis
- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### 1. Cloner le projet
```bash
git clone https://github.com/votre-orga/edu-ci.git
cd edu-ci
```

### 2. Démarrer l'infrastructure (Base de données, Redis, MinIO)
```bash
docker-compose up -d
```
*Vérifiez que les conteneurs `edu-ci-postgres`, `edu-ci-redis` et `edu-ci-minio` sont bien lancés via Docker Desktop.*

### 3. Démarrer le Backend (API)
Dans un nouveau terminal :
```bash
cd backend
npm install
# Lancement en mode développement (avec Hot-Reload)
npm run start:dev
```
L'API sera accessible sur : `http://localhost:3000`
Documentation Swagger (si activée) : `http://localhost:3000/api`

### 4. Démarrer le Frontend (Web)
Dans un autre terminal :
```bash
cd frontend
npm install
# Lancement en mode développement
npm run dev
```
L'application web sera accessible sur : `http://localhost:3001` (ou port indiqué)

## 📚 Documentation
La documentation détaillée des spécifications fonctionnelles et techniques est disponible dans le dossier `docs/` :
- [Spécifications Complètes (SPECIFICATIONS.md)](docs/SPECIFICATIONS.md)

## 🤝 Contribution
Ce projet suit les standards de code suivants :
- **Backend** : ESLint + Prettier (NestJS standard)
- **Frontend** : ESLint + Prettier (Next.js standard)
- **Commits** : Conventional Commits

## 📄 Licence
Tous droits réservés. Usage interne ou sous licence uniquement.
