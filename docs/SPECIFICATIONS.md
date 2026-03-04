# EDU-CI : Spécifications Techniques et Fonctionnelles
**Version :** 1.0  
**Date :** 04 Mars 2026  
**Statut :** Document de référence pour développement  
**Contexte :** Système d'Information Scolaire (SIS) pour la Côte d'Ivoire (Hors Paiements)

---

## 1. Vision & Principes

### 1.1 Vision
**EDU-CI** a pour ambition de numériser la gestion académique et administrative des établissements scolaires ivoiriens (publics et privés), du primaire au secondaire. La plateforme vise à centraliser les données scolaires pour faciliter le pilotage par le Ministère de l'Éducation Nationale et de l'Alphabétisation (MENETFP), tout en offrant aux parents une visibilité temps réel sur la scolarité de leurs enfants.

### 1.2 Principes Directeurs
1.  **Souveraineté et Conformité :** Alignement strict sur les nomenclatures du MENETFP (matricules, cycles, coefficients) et hébergement des données respectant la législation ivoirienne sur la protection des données à caractère personnel.
2.  **Mobile-First & Offline-First :** L'application mobile (enseignants/parents) doit fonctionner pleinement sans connexion internet (saisie des notes, présences) avec une synchronisation différée dès que le réseau est disponible, pour répondre aux zones à couverture réseau instable.
3.  **Zéro Paiement :** Le système se concentre exclusivement sur le pédagogique et l'administratif. Aucune donnée financière ne transite par la plateforme.
4.  **Accessibilité Universelle :** Interfaces simplifiées pour les zones rurales et compatibilité avec les terminaux d'entrée de gamme.

---

## 2. Modules Majeurs

### 2.1 Gestion des Établissements (Socle)
*   Configuration de l'identité de l'école (Code établissement MENETFP, Dren/IEPP de rattachement).
*   Paramétrage des années scolaires, découpage (Trimestres/Semestres).
*   Gestion des infrastructures (Salles de classe, Bâtiments).
*   Gestion des cycles (Préscolaire, Primaire, Collège, Lycée) et des séries (A, C, D, E, F, G...).

### 2.2 Admissions & Inscriptions
*   **Préinscription :** Saisie des dossiers élèves (extrait de naissance, photos).
*   **Immatriculation :** Génération ou importation du Matricule MENETFP unique.
*   **Constitution des classes :** Répartition des élèves par classe et par niveau.
*   **Transferts :** Gestion des demandes de changement d'établissement (Exeat).
*   **Radiation/Abandon :** Archivage des dossiers avec motif.

### 2.3 Vie Scolaire
*   **Assiduité :** Appel numérique par cours ou par demi-journée.
*   **Discipline :** Saisie des incidents, sanctions (avertissements, blâmes, exclusions temporaires) et conseils de discipline.
*   **Encouragements :** Félicitations, tableaux d'honneur.
*   **Badge numérique :** Génération de cartes scolaires avec QR Code.

### 2.4 Notes & Examens
*   **Saisie des notes :** Par matière, par classe, avec pondération (Interrogations, Devoirs Surveillés, Compositions).
*   **Calculs automatiques :** Moyennes (Matière, Générale), Rangs, Mentions.
*   **Examens Blancs & Officiels :** Gestion des candidats au CEPE, BEPC, BAC.
*   **Délibérations :** Outils d'aide à la décision pour les conseils de classe (passage, redoublement, exclusion).

### 2.5 Messagerie & Annonces
*   **Communication ciblée :** Envoi de messages (SMS, Push, Email) aux parents (retards, absences, résultats).
*   **Cahier de liaison numérique :** Échanges parents-professeurs.
*   **Actualités :** Fil d'information de l'établissement (événements, réunions).

### 2.6 Documents Officiels
*   **Bulletins :** Génération PDF conforme aux modèles officiels ivoiriens.
*   **Certificats :** Certificat de scolarité, Certificat de fréquentation.
*   **Relevés de notes :** Relevés partiels ou annuels.
*   **Convocations :** Parents, conseils de discipline.

### 2.7 Calendrier & Planning
*   **Emploi du temps :** Génération et consultation par classe et par enseignant.
*   **Agenda :** Dates des examens, jours fériés nationaux, vacances scolaires.
*   **Cahier de textes :** Suivi de la progression pédagogique et devoirs à faire.

### 2.8 Bibliothèque & Ressources
*   **Gestion du fonds :** Inventaire des manuels et ouvrages.
*   **Prêts :** Suivi des emprunts et retours élèves/profs.
*   **Ressources numériques :** Mise à disposition de supports de cours PDF/Vidéo.

### 2.9 Transport & Cantine (Logistique uniquement)
*   **Cantine :** Pointage des présences au réfectoire (scan QR Code élève).
*   **Transport :** Affectation aux lignes de bus scolaires, liste des passagers.

### 2.10 Tableaux de Bord & Reporting
*   **École :** Taux de réussite, taux d'absentéisme, répartition par genre.
*   **MENETFP (Vue Nationale/Régionale) :** Agrégation des données, carte scolaire, indicateurs de performance (KPI).

### 2.11 Support & Helpdesk
*   Base de connaissances (FAQ).
*   Système de tickets pour signaler des bugs ou demander de l'assistance technique.

---

## 3. Rôles & Matrice d'autorisations (RBAC)

**Légende :** `C`=Créer, `R`=Lire, `U`=Modifier, `D`=Supprimer, `-`=Aucun accès

| Fonctionnalité / Rôle | Élève | Parent/Tuteur | Enseignant | Censeur / Surv. | Proviseur / Dir. | Inspecteur / État |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Mon Profil** | R/U (partiel) | R/U (partiel) | R/U (partiel) | R | R | R |
| **Emploi du temps** | R | R | R | C/R/U/D | R | R |
| **Présences (Saisie)** | - | - | C/R/U | C/R/U | R | R (Stats) |
| **Notes (Saisie)** | - | - | C/R/U (ses mat.) | R/U (audit) | R | R (Stats) |
| **Bulletins (Gén.)** | R (PDF) | R (PDF) | R | C/R/U | R | R |
| **Discipline (Saisie)** | - | R (si enfant) | C | C/R/U | C/R/U | R (Grave) |
| **Messagerie** | R/C (interne) | R/C (Prof/Admin) | C/R | C/R/U | C/R/U | C (Mass) |
| **KPI & Stats** | - | - | R (sa classe) | R (global) | R (global) | R (National) |
| **Config. École** | - | - | - | - | C/R/U | - |

---

## 4. Scripts Fonctionnels (User Flows)

### 4.1 Élève : Consulter ses notes & devoirs
1.  L'élève se connecte via l'application mobile (Matricule + Mot de passe).
2.  Sur le **Tableau de bord**, il voit : "Dernière note : 14/20 en Mathématiques" et "Devoirs pour demain : 2".
3.  Il clique sur le module **Notes**.
4.  Il sélectionne le **Trimestre** en cours.
5.  Il visualise la liste des matières avec sa moyenne provisoire.
6.  Il clique sur "Détails" d'une matière pour voir les notes individuelles (Interro, Devoir).

### 4.2 Parent : Suivre les absences
1.  Le parent reçoit une notification Push : "Absence non justifiée de KOFFI A. le 04/03 à 08h00".
2.  Il ouvre l'application, section **Vie Scolaire**.
3.  Il voit l'entrée "Absence" en rouge.
4.  Il clique sur **"Justifier"**.
5.  Il sélectionne un motif (Maladie, Famille...) et peut prendre en photo un certificat médical (upload).
6.  Le statut passe à "En attente de validation" (pour le Censeur).

### 4.3 Enseignant : Saisie des présences (Mode Hors-ligne)
1.  L'enseignant ouvre l'app dans une zone sans réseau.
2.  Il sélectionne sa classe actuelle : "3ème 2 - Histoire-Géo - 10h00".
3.  La liste des élèves s'affiche (pré-chargée).
4.  Par défaut, tous sont marqués "Présent".
5.  Il tape sur les noms des absents (bascule en "Absent").
6.  Il valide la saisie.
7.  L'app stocke les données localement (SQLite).
8.  Dès que le réseau revient, une synchronisation en arrière-plan envoie les données au serveur et déclenche les notifications parents.

### 4.4 Admin École (Censeur) : Génération des bulletins
1.  Le Censeur accède au portail Web.
2.  Il vérifie que toutes les notes sont saisies pour la classe de "Tle D1".
3.  Il lance le traitement **"Calcul des Moyennes - Trimestre 2"**.
4.  Le système calcule les moyennes pondérées, les rangs, et applique les coefficients.
5.  Il clique sur **"Générer Bulletins PDF"**.
6.  Il peut télécharger les bulletins en masse (ZIP) ou les publier pour accès parent.

### 4.5 Inspecteur (MENETFP) : Indicateurs Régionaux
1.  L'inspecteur se connecte au portail national.
2.  Il filtre sur sa zone (DREN Abidjan 1).
3.  Il visualise une carte thermique des taux de présence enseignants.
4.  Il exporte un rapport CSV des établissements ayant un taux de réussite < 40% aux examens blancs.

---

## 5. Règles Métier Spécifiques (Côte d'Ivoire)

### 5.1 Gestion des Périodes
*   **Primaire :** Trimestres (3 périodes).
*   **Secondaire :** Semestres ou Trimestres selon directive ministérielle annuelle.

### 5.2 Calcul des Moyennes
*   **Moyenne Interrogation (MI) :** Somme des notes / nombre d'interros.
*   **Moyenne Devoir (MD) :** Note de devoir surveillé.
*   **Moyenne Trimestrielle Matière (MTM) :** Formule type : `((MI + MD) / 2) * 1 + (Composition * 2)) / 3` (Ajustable selon niveau).
*   **Moyenne Générale (MG) :** `Somme(MTM * Coefficient) / Somme(Coefficients)`.
*   **Système de notation :** Toujours sur 20.
*   **Coefficients :** Variables selon la série (ex: Maths Coeff 5 en Série C, Coeff 2 en Série A).

### 5.3 Seuils d'alerte (Absences)
*   **Alerte SMS :** Immédiate après saisie de l'absence.
*   **Conseil de discipline :** Déclenché automatiquement après X heures d'absences non justifiées (ex: 30 heures).
*   **Exclusion temporaire (3 jours) :** Paramétrable par le règlement intérieur.

### 5.4 Examens Nationaux
*   Les notes de BEPC et BAC sont saisies dans un module séparé, souvent importées depuis la base centrale de la DECO (Direction des Examens et Concours), ou saisies manuellement pour les examens blancs.
*   Verrouillage strict des notes après la date limite de saisie fixée par l'administration.

---

## 6. Architecture Technique

### 6.1 Stack Technologique
*   **Frontend Web (Admin/État) :** Next.js (React), Tailwind CSS. Interface responsive.
*   **Mobile (Parents/Profs) :** React Native. Codebase unique pour Android et iOS.
*   **Backend API :** NestJS (Node.js). Architecture modulaire.
*   **Base de Données :** PostgreSQL (Relationnel robuste).
*   **Cache & Queue :** Redis (Gestion des files d'attente de synchronisation et cache sessions).
*   **Stockage Fichiers :** MinIO (Compatible S3, hébergeable localement ou cloud souverain).

### 6.2 Architecture Mobile (Sync Strategy)
*   **Local Database :** SQLite sur le terminal mobile.
*   **Sync Engine :** Utilisation d'une queue de synchronisation ("Optimistic UI"). Les actions sont stockées dans une file locale, jouées vers l'API quand la connexion est détectée. Gestion des conflits "Last-Write-Wins" ou arbitrage manuel pour les notes.

### 6.3 Infrastructure
*   **Conteneurisation :** Docker.
*   **Orchestration :** Kubernetes (K8s) pour la scalabilité (pics de charge lors de la publication des bulletins).
*   **Monitoring :** Prometheus + Grafana (Métriques système et métier).
*   **Logs :** ELK Stack (Elasticsearch, Logstash, Kibana) pour l'audit et la sécurité.

---

## 7. Schéma de Données (Entités Principales)

| Entité | Champs Clés | Relations |
| :--- | :--- | :--- |
| **Etablissement** | `id`, `code_menetfp`, `nom`, `type` (Public/Privé), `ville`, `dren` | 1-n Classes, 1-n Utilisateurs |
| **AnneeScolaire** | `id`, `libelle` (2025-2026), `date_debut`, `date_fin`, `active` | 1-n Periodes |
| **Classe** | `id`, `nom` (6ème 1), `niveau`, `serie` | n-1 Etablissement, 1-n Eleves, 1-n Cours |
| **Matiere** | `id`, `code`, `libelle` (Mathématiques), `groupe` (Scientifique/Littéraire) | n-n Classe (via Cours) |
| **Utilisateur** | `id`, `username`, `password_hash`, `role`, `telephone` | Hérite vers Prof/Parent/Admin |
| **Eleve** | `id`, `matricule_menetfp`, `nom`, `prenom`, `date_naissance`, `genre` | n-1 Classe, n-n Parents |
| **Inscription** | `id`, `statut` (Inscrit/Radié), `date_inscription` | n-1 Eleve, n-1 AnneeScolaire |
| **Presence** | `id`, `date`, `statut` (Present/Absent/Retard), `justifie` (bool) | n-1 Eleve, n-1 Cours |
| **Note** | `id`, `valeur` (float), `type` (Interro/Devoir), `coefficient`, `date` | n-1 Eleve, n-1 Matiere, n-1 Periode |
| **AuditLog** | `id`, `user_id`, `action`, `entity`, `ip_address`, `timestamp` | - |

---

## 8. Contrats API REST (Extraits)

### 8.1 Authentification
*   `POST /auth/login` : Retourne JWT + Refresh Token.
*   `POST /auth/refresh` : Renouvelle le JWT.
*   `POST /auth/logout` : Invalide le Refresh Token.

### 8.2 Élèves
*   `GET /students?classId=X` : Liste des élèves d'une classe.
*   `POST /students` : Création d'un élève (Admin/Censeur).
*   `GET /students/:id/details` : Fiche complète (Notes, Absences, Parents).

### 8.3 Présences
*   `POST /attendances/bulk` : Saisie massive pour une classe (Payload optimisé pour sync hors-ligne).
    *   *Body :* `{ classId: "uuid", date: "ISO", hour: "H", absents: ["uuid1", "uuid2"] }`
*   `GET /attendances/stats?studentId=X` : Agrégats pour un élève.

### 8.4 Notes & Bulletins
*   `POST /grades` : Saisie d'une note.
*   `GET /grades/report/class/:classId/period/:periodId` : Matrice de notes pour conseil de classe.
*   `POST /reports/generate/:studentId` : Déclenche la génération asynchrone du PDF.

### 8.5 Reporting État
*   `GET /ministry/stats/region/:drenId` : KPI régionaux JSON.
*   `GET /ministry/export/national` : Export CSV asynchrone des données agrégées.

---

## 9. Exemples de Code (NestJS / TypeScript)

### 9.1 Calcul de Moyenne Pondérée
```typescript
/**
 * Calcule la moyenne pondérée d'un élève pour une matière donnée
 */
function calculateSubjectAverage(grades: Grade[]): number {
  if (grades.length === 0) return 0;

  let totalPoints = 0;
  let totalCoeffs = 0;

  grades.forEach(grade => {
    // Normalisation si la note est sur autre chose que 20 (ex: note sur 10 -> x2)
    const normalizedValue = (grade.value / grade.base) * 20; 
    
    totalPoints += normalizedValue * grade.coefficient;
    totalCoeffs += grade.coefficient;
  });

  if (totalCoeffs === 0) return 0;
  
  // Arrondi à 2 décimales
  return Math.round((totalPoints / totalCoeffs) * 100) / 100;
}
```

### 9.2 Guard RBAC (Contrôle d'accès)
```typescript
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Pas de restriction
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Injecté par JWT Strategy

    // Le SuperAdmin MENETFP a accès à tout
    if (user.role === 'MENETFP_ADMIN') return true;

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
        throw new ForbiddenException("Accès refusé: Rôle insuffisant.");
    }
    return true;
  }
}
```

---

## 10. UX/UI — Écrans Clés (Wireframes Textuels)

### 10.1 Dashboard Élève (Mobile)
```text
+--------------------------------------------------+
|  [Menu]      EDU-CI         [Notif] [Profil]     |
+--------------------------------------------------+
|  Bonjour, KOUASSI Jean (Tle D)                   |
|  Lycée Classique Abidjan                         |
+--------------------------------------------------+
|  [ ALERTE ]                                      |
|  Devoir de Maths demain 08:00 (M. KONE)          |
+--------------------------------------------------+
|  MA SEMAINE                                      |
|  [Lun] [Mar] [Mer] [Jeu] [Ven]                   |
|  08h-10h : Physiques (Salle B12)                 |
|  10h-12h : Philosophie (Salle A01)               |
+--------------------------------------------------+
|  MES DERNIÈRES NOTES                             |
|  - Anglais : 15/20 (Oral)                        |
|  - SVT     : 08/20 (Devoir surv.)                |
+--------------------------------------------------+
|  [Accès Bulletin]   [Cantine]   [Bibliothèque]   |
+--------------------------------------------------+
```

### 10.2 Saisie Présences Enseignant (Mobile Offline)
```text
+--------------------------------------------------+
|  < Retour    APPEL - 04 Mars 08:00    [Valider]  |
|  Classe : 4ème 3 | Matière : EPS                 |
+--------------------------------------------------+
|  Rechercher un élève...                          |
+--------------------------------------------------+
|  [x] TOUT SÉLECTIONNER (Présent)                 |
+--------------------------------------------------+
|  (P) AKA Melissa                                 |
|  (P) BAMBA Moussa                                |
|  (A) DIALLO Amadou   [Toucher pour changer]      |
|      -> Motif : [ Non justifié v ]               |
|  (P) KOUAME Yves                                 |
|  (R) TOURE Awa (Retard: 15min)                   |
+--------------------------------------------------+
|  Statut : Hors-ligne (Données sauvées localement)|
+--------------------------------------------------+
```

---

## 11. Internationalisation & Accessibilité

*   **Langue :** Interface entièrement en Français (fr-CI).
*   **Formats :**
    *   Dates : JJ/MM/AAAA (04/03/2026).
    *   Nombres : Virgule pour décimales (14,50).
    *   Devise (pour affichage de valeurs théoriques hors paiement) : FCFA (XOF).
*   **Accessibilité (RGAA) :**
    *   Contraste élevé pour lisibilité sur écrans bas de gamme en plein soleil.
    *   Tailles de police ajustables.
    *   Navigation compatible clavier pour les postes administratifs anciens.
    *   Support lecteur d'écran (ARIA labels).

---

## 12. Sécurité & Conformité

*   **Protection des Mineurs :** Aucune donnée élève n'est exposée publiquement. Les parents ne voient que *leurs* enfants.
*   **Chiffrement :**
    *   En transit : TLS 1.3 obligatoire (HTTPS).
    *   Au repos : Bases de données chiffrées (AES-256).
*   **Audit Trail (Traçabilité) :** Toute modification de note (création, mise à jour, suppression) génère une entrée de log immuable (Qui, Quand, Ancienne valeur, Nouvelle valeur, Adresse IP).
*   **Authentification :** 2FA (Double facteur) obligatoire pour les administrateurs et enseignants (via SMS ou OTP App).
*   **Sauvegardes :** Backup quotidien incrémental + Backup hebdomadaire complet. Réplication géographique (ex: Data Center Abidjan + Yamoussoukro).

---

## 13. Intégrations Locales (Hors Paiement)

*   **SMS Gateway :** Intégration avec agrégateurs locaux (ex: Orange, MTN, Moov) pour l'envoi de notifications SMS (Absences, Urgences).
*   **Identifiant Unique (Matricule) :** Vérification de cohérence du format Matricule MENETFP lors de la saisie.
*   **API Ministère :** Flux montant sécurisé pour transmettre les statistiques agrégées vers le système central du Ministère (SIG-Education).

---

## 14. Plan de Déploiement

### Phase 1 : Pilote (3 mois)
*   **Cible :** 3 établissements (1 Lycée Public d'Excellence, 1 Collège Privé à Abidjan, 1 Collège Public en zone rurale).
*   **Objectif :** Valider le mode hors-ligne et l'UX.

### Phase 2 : Déploiement Régional (6 mois)
*   Extension à une DREN complète (Direction Régionale).
*   Formation des "Super-Utilisateurs" dans chaque école.

### Phase 3 : Généralisation (12-24 mois)
*   Déploiement national progressif.
*   Migration des données historiques via CSV standardisés.

### Gouvernance
*   Comité de pilotage mensuel (MENETFP + Prestataire).
*   SLA Support : Garantie de temps d'intervention < 4h pour blocage critique (ex: impossibilité de générer les bulletins).

---

## 15. Tests (Scénarios Gherkin)

### Feature: Saisie des présences
```gherkin
Fonctionnalité: Saisie d'appel par l'enseignant
  En tant qu'enseignant
  Je veux marquer les absents
  Afin de tenir à jour le registre de vie scolaire

  Scénario: Saisie hors-ligne réussie
    Etant donné que je suis connecté sur l'application mobile
    Et que je n'ai pas de connexion internet
    Quand je sélectionne la classe "3ème 2"
    Et que je marque l'élève "KOUASSI Jean" comme "Absent"
    Et que je valide la feuille d'appel
    Alors la présence est enregistrée localement avec le statut "À synchroniser"
    Et le compteur d'éléments à synchroniser s'incrémente de 1
```

### Feature: Génération Bulletin
```gherkin
Fonctionnalité: Génération de bulletin
  En tant qu'administrateur (Censeur)
  Je veux générer le bulletin du 1er trimestre
  Afin de le distribuer aux parents

  Scénario: Calcul de moyenne avec coefficients
    Etant donné que l'élève a 10/20 en Maths (Coeff 2)
    Et que l'élève a 14/20 en Histoire (Coeff 1)
    Quand je lance le calcul du bulletin
    Alors la moyenne générale affichée doit être 11.33
    Et le rang doit être calculé par rapport aux autres élèves de la classe
```

---

## 16. Backlog Priorisé (MVP vs V2)

### MVP (Mois 1-4)
*   Authentification & RBAC.
*   Gestion structure (Classes, Matières, Élèves).
*   Saisie des notes & Présences (Web + Mobile).
*   Génération Bulletins PDF simples.
*   Dashboard Admin basique.

### V2 (Mois 5-8)
*   Application Parents complète.
*   Mode Hors-ligne avancé (Mobile).
*   Bibliothèque numérique.
*   Module Cantine & Transport.
*   API d'intégration complète avec le Ministère.
*   Analytics prédictifs (Détection risque décrochage scolaire).

---

## 17. Checklist Mise en Production

*   [ ] **Sécurité :** Scan de vulnérabilités (Pentest) validé.
*   [ ] **Performance :** Test de charge (Load Testing) simulant 5000 utilisateurs simultanés.
*   [ ] **Données :** Base de données de production initialisée et vide (sauf comptes Admins).
*   [ ] **Légal :** Mentions légales et Politique de confidentialité validées par juriste.
*   [ ] **Infra :** Certificats SSL/TLS valides. Domaines configurés.
*   [ ] **Formation :** Guides utilisateurs (PDF/Vidéo) disponibles dans le Helpdesk.
*   [ ] **Support :** Équipe de support niveau 1 opérationnelle et formée.

---

## 18. Annexes

### 18.1 Matrice des Coefficients (Exemple partiel)
| Niveau | Série | Matière | Coeff |
| :--- | :--- | :--- | :---: |
| 3ème | - | Mathématiques | 3 |
| 3ème | - | Français | 3 |
| Tle | C | Mathématiques | 5 |
| Tle | C | Physique-Chimie | 5 |
| Tle | A2 | Philosophie | 5 |

### 18.2 Représentation Textuelle : Grille de Notes (Enseignant Web)
```text
CLASSE : 3ème 2  |  TRIMESTRE 1  |  MATIÈRE : MATHS

+------------------+-------+-------+-------+-------+-------+
| NOM PRÉNOM       | INT 1 | INT 2 | DEV 1 | COMPO | MOY.  |
+------------------+-------+-------+-------+-------+-------+
| ABOUA Serge      | 12.0  | 14.5  | 13.0  | 11.0  | 12.33 |
| BAMBA Awa        | 08.0  | 09.0  | 07.5  | 10.0  | 08.91 |
| KONE Moussa      | 18.0  | 17.0  | 19.0  | 18.5  | 18.25 |
+------------------+-------+-------+-------+-------+-------+
| MOYENNE CLASSE   | 12.6  | 13.5  | 13.1  | 13.1  | 13.16 |
+------------------+-------+-------+-------+-------+-------+
[SAUVEGARDER]  [EXPORTER EXCEL]  [VERROUILLER]
```
