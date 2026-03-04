# EDU-CI Frontend (Web)

Application Web de gestion scolaire pour EDU-CI, développée avec [Next.js](https://nextjs.org/) (App Router).

## 🎨 Tech Stack
- **Framework** : Next.js (React)
- **Styling** : Tailwind CSS
- **Langage** : TypeScript
- **Icônes** : Heroicons (ou similaire)

## 📱 Structure des Pages (`src/app`)
- `/login` : Page de connexion unifiée (Élève, Parent, Prof, Admin).
- `/dashboard` : Tableau de bord principal (Layout avec Sidebar).
  - `/dashboard/students` : Liste des élèves.
  - `/dashboard/grades` : Gestion des notes.
  - `/dashboard/attendance` : Saisie des présences.

## 🚀 Démarrage

### Installation
```bash
npm install
```

### Serveur de Développement
```bash
npm run dev
```
Accessible sur `http://localhost:3000` (ou 3001 si le port 3000 est pris par le backend).

### Build Production
```bash
npm run build
npm start
```

## 🌍 Internationalisation
L'interface est conçue pour être principalement en **Français (Côte d'Ivoire)**.
Les formats de date et monétaires respectent les standards locaux (JJ/MM/AAAA, FCFA).
