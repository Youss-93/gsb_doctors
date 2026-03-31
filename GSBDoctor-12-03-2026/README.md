# GSBDoctor Frontend (Angular)

Application Angular pour consommer l'API GSB locale (Node/Express) et gerer 3 domaines:
- Medecins
- Medicaments
- Rapports de visite

Le frontend inclut l'authentification, des pages protegees et un CRUD complet sur chaque domaine.

## Stack

- Angular 20 (standalone components)
- TypeScript
- Angular Signals (`signal`, `computed`, `toSignal`)
- HttpClient + interceptor Bearer token
- Router + auth guard

## Prerequis

- Node.js LTS + npm
- API backend lancee sur `http://localhost:3000`
- Base MySQL deja importee cote API

## Installation

Depuis le dossier frontend:

```bash
cd GSBDoctor-12-03-2026
npm install
```

## Lancer en developpement

```bash
npm start
```

Application dispo sur:
- `http://localhost:4200`

## Build

```bash
npm run build
```

Le build de production est genere dans `dist/`.

## Authentification

- Route publique: `/login`
- Identifiants de test (BDD fournie):
  - login: `aribiA`
  - password: `aaaa`
- A la connexion, le token JWT est stocke et automatiquement ajoute aux requetes via l'interceptor `Authorization: Bearer <token>`.

## Pages et fonctionnalites

- `/doctors`
  - Liste + recherche
  - Creation d'un medecin
  - Modification d'un medecin
  - Suppression d'un medecin

- `/medicines`
  - Liste + recherche
  - Creation d'un medicament
  - Modification d'un medicament
  - Suppression d'un medicament

- `/reports`
  - Liste + recherche
  - Creation d'un rapport
  - Modification d'un rapport
  - Suppression d'un rapport

Toutes ces routes sont protegees par `authGuard`.

## Structure utile

```text
src/app/
  components/login/
  pages/doctors-page/
  pages/medicines-page/
  pages/reports-page/
  services/auth.ts
  services/doctors.service.ts
  services/medicines.service.ts
  services/reports.service.ts
  guards/auth.guard.ts
  interceptors/auth.interceptor.ts
```

## Notes importantes

- Si le login echoue alors que les identifiants sont corrects, verifier d'abord que l'API backend tourne bien sur le port 3000.
- Les pages CRUD consomment directement les routes API locales (pas de mock en production).
