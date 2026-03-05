# Déploiement du Projet

Ce guide explique comment déployer cette application Next.js sur différentes plateformes d'hébergement : Vercel, Render et Railway.

## Déploiement sur Vercel (Recommandé)

Vercel est la plateforme créée par les développeurs de Next.js et offre la meilleure expérience pour le déploiement de projets Next.js.

1.  **Poussez votre code sur un dépôt Git** (GitHub, GitLab, ou Bitbucket).
2.  **Inscrivez-vous ou connectez-vous à [Vercel](https://vercel.com/)** avec votre compte Git.
3.  **Créez un nouveau projet** en cliquant sur "Add New... -> Project".
4.  **Importez votre dépôt Git**. Vercel détectera automatiquement qu'il s'agit d'un projet Next.js.
5.  **Configurez le projet** :
    *   **Root Directory** : Assurez-vous que le répertoire racine est bien `frontend` si votre application Next.js se trouve dans ce sous-dossier.
    *   **Variables d'environnement** : Ajoutez toutes les variables d'environnement nécessaires (par exemple, `NEXT_PUBLIC_API_URL`) dans la section "Environment Variables".
6.  **Cliquez sur "Deploy"**. Vercel s'occupera du build et du déploiement.

## Déploiement sur Render

Render est une alternative flexible pour héberger des applications web.

1.  **Poussez votre code sur un dépôt Git**.
2.  **Inscrivez-vous ou connectez-vous à [Render](https://render.com/)**.
3.  **Créez un nouveau service web** en cliquant sur "New + -> Web Service".
4.  **Connectez votre dépôt Git**.
5.  **Configurez le service** :
    *   **Name** : Donnez un nom à votre service.
    *   **Root Directory** : `frontend` (si votre application est dans ce dossier).
    *   **Environment** : `Node`.
    *   **Build Command** : `npm install && npm run build`.
    *   **Start Command** : `npm run start`.
6.  **Ajoutez les variables d'environnement** dans la section "Environment".
7.  **Cliquez sur "Create Web Service"**. Render va construire et déployer votre application.

## Déploiement sur Railway

Railway est une autre plateforme moderne qui simplifie le déploiement.

1.  **Poussez votre code sur un dépôt Git**.
2.  **Inscrivez-vous ou connectez-vous à [Railway](https://railway.app/)**.
3.  **Créez un nouveau projet** et sélectionnez "Deploy from GitHub repo".
4.  **Sélectionnez votre dépôt**.
5.  **Configurez les paramètres du service** :
    *   Dans l'onglet "Settings" de votre service, sous la section "Build":
        *   **Root Directory**: `/frontend/` (assurez-vous d'inclure les slashes).
    *   Les commandes de build et de démarrage sont généralement détectées automatiquement par les "Nixpacks" de Railway. Si ce n'est pas le cas, vous pouvez les définir manuellement.
6.  **Ajoutez les variables d'environnement** dans l'onglet "Variables".
7.  Le déploiement démarre automatiquement après chaque `git push` sur la branche principale.
