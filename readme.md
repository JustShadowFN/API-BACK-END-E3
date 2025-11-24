# 🌿 ZenTrack Core API

## Plateforme de Gestion de Formations QVT

Ce projet implémente l'API Back-End (V1) de ZenTrack Core, une plateforme destinée à gérer les formations de Qualité de Vie au Travail (QVT).

---

## 💻 1. Architecture et Technologies

| Composant | Technologie | Rôle |
| :--- | :--- | :--- |
| **Serveur** | Node.js / Express | Environnement d'exécution et Framework. |
| **Architecture** | MVC (Model-View-Controller) | Structure modulaire et claire. |
| **Base SQL** | PostgreSQL (via `pg`) | Gestion des entités relationnelles : `companies`, `trainings`, `sessions`, `registrations`. |
| **Base NoSQL** | MongoDB (via `mongoose`) | Stockage des descriptions pédagogiques détaillées (`workshopDetails`) . |

---

## 📥 2. Installation et Configuration

### Pré-requis

* Node.js (version 18+)
* Un serveur PostgreSQL démarré.
* Un service MongoDB démarré.

### 2.1. Installation des Dépendances 

Cloner le dépôt, puis installer les modules :

```bash
git clone <votre_repo_url>
cd ZenTrackCore
npm install