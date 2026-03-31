# GSBDoctor - Application Complète de Gestion Sanitaire

Application fullstack moderne pour la gestion des médecins, médicaments et rapports de visite avec authentification sécurisée et interface moderne.

## 📚 Table des matières

1. [Vue d'ensemble](#-vue-densemble)
2. [Architecture](#-architecture)
3. [Installation (Début Rapide)](#-installation-début-rapide)
4. [Configuration Base de Données](#-configuration-base-de-données-servbay)
5. [Lancer le Projet](#-lancer-le-projet)
6. [Backend API REST](#-backend-api-rest)
7. [Frontend Angular](#-frontend-angular)
8. [Authentification](#-authentification)
9. [Routes et Endpoints](#-routes-et-endpoints)
10. [Troubleshooting](#-troubleshooting)

---

## 🎯 Vue d'ensemble

GSBDoctor est une **application web fullstack** complète composée de:

- **Backend API** (Node.js + Express + Sequelize + MySQL)
- **Frontend** (Angular 20 + TypeScript + Signals)
- **Base de données** (MySQL avec 1000+ médecins et 500+ médicaments)

### Fonctionnalités principales

✅ **Authentification sécurisée** avec JWT Bearer Token
✅ **Gestion des Médecins** - CRUD complet avec recherche
✅ **Gestion des Médicaments** - CRUD complet avec recherche
✅ **Gestion des Rapports** - CRUD protégé par authentification
✅ **Interface moderne** - Responsive, intuitive
✅ **Données de test** - 1000+ médecins prêts

---

## 🏗️ Architecture

```
GSBDoctor Final/
│
├── gsb-node-api-samir/              # BACKEND API
│   ├── app.js                       # Point d'entrée
│   ├── config/config.json           # Config DB + environnements
│   ├── controllers/
│   │   ├── authController.js        # Login, signup, logout
│   │   ├── medecinController.js     # Médecins CRUD
│   │   ├── medicineController.js    # Médicaments CRUD
│   │   └── reportController.js      # Rapports CRUD (Auth)
│   ├── models/
│   │   ├── medecin.js               # Model Médecin
│   │   ├── medicament.js            # Model Médicament
│   │   ├── rapport.js               # Model Rapport
│   │   └── visiteur.js              # Model Utilisateur
│   ├── routes/
│   │   ├── auth.js                  # Routes auth
│   │   ├── medecin.js               # Routes médecins
│   │   ├── medicine.js              # Routes médicaments
│   │   └── report.js                # Routes rapports
│   ├── services/
│   │   └── jwtService.js            # Gestion JWT
│   ├── database/
│   │   └── gsbrapports.sql          # Dump SQL
│   ├── package.json
│   └── node_modules/
│
├── GSBDoctor-12-03-2026/            # FRONTEND ANGULAR
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── login/           # Page connexion
│   │   │   │   └── doctor-card/     # Carte médecin
│   │   │   ├── pages/
│   │   │   │   ├── doctors-page/    # CRUD Médecins
│   │   │   │   ├── medicines-page/  # CRUD Médicaments
│   │   │   │   └── reports-page/    # CRUD Rapports
│   │   │   ├── services/
│   │   │   │   ├── auth.ts          # Auth + storage
│   │   │   │   ├── doctors.service.ts
│   │   │   │   ├── medicines.service.ts
│   │   │   │   └── reports.service.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts    # Route protection
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts # Bearer token
│   │   │   ├── types/               # Interfaces TypeScript
│   │   │   ├── helpers/             # Utilitaires
│   │   │   ├── app.routes.ts        # Routing
│   │   │   ├── app.config.ts        # Config app
│   │   │   └── app.ts               # Composant racine
│   │   ├── assets/
│   │   ├── styles.css               # Styles globaux
│   │   └── main.ts
│   ├── dist/                        # Build production
│   ├── angular.json
│   ├── package.json
│   └── node_modules/
│
├── .gitignore                       # Git config
└── README.md                        # Ce fichier

```

---

## 🚀 Installation (Début Rapide)

### Prérequis absolus

✅ **Node.js** 18+ (LTS recommandé)
✅ **npm** 9+ (inclus avec Node)
✅ **MySQL 8+** - Via **ServBay**, Docker ou installation native
✅ **Git**

### Étape 1 : Cloner le projet

```bash
git clone https://github.com/Youss-93/gsb_doctors.git
cd gsb_doctors
```

### Étape 2 : Installer Backend

```bash
cd gsb-node-api-samir
npm install
```

### Étape 3 : Installer Frontend

```bash
cd ../GSBDoctor-12-03-2026
npm install
```

### Étape 4 : Configurer la Base de Données (voir section suivante)

---

## 🗄️ Configuration Base de Données (ServBay)

### Avec ServBay (Recommandé macOS/Windows)

**ServBay** est un gestionnaire local tout-en-un qui inclut MySQL, PHP, etc.

#### 1. Démarrer MySQL dans ServBay

```bash
# Interface graphique ServBay
# → Services → MySQL → Démarrer
# OU en terminal:
servbay mysql start
```

#### 2. Vérifier la connexion

```bash
# Connexion par défaut ServBay
mysql -u root -p123456
# Ou sans mot de passe selon config
mysql -u root
```

#### 3. Importer la base

```bash
# Depuis le dossier du projet
mysql -u root -p123456 < gsb-node-api-samir/database/gsbrapports.sql

# Ou si pas de mot de passe
mysql -u root < gsb-node-api-samir/database/gsbrapports.sql
```

#### 4. Vérifier l'import

```bash
mysql -u root -p123456
```

```sql
-- Dans MySQL
SHOW DATABASES;
-- Vous devriez voir: gsbrapports

USE gsbrapports;
SHOW TABLES;
-- Vous devriez voir: medecin, medicament, offrir, rapport, visiteur
SELECT COUNT(*) FROM medecin;  -- Devrait afficher ~1000
```

### Configuration fichier config.json

Éditer `gsb-node-api-samir/config/config.json`:

```json
{
  "development": {
    "username": "root",
    "password": "123456", // ServBay default
    "database": "gsbrapports",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "123456",
    "database": "gsbrapports",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "votre_password",
    "database": "gsbrapports",
    "host": "votre_host",
    "port": 3306,
    "dialect": "mysql"
  }
}
```

### Alternative: MySQL natif

```bash
# Si MySQL n'est pas lancé
brew services start mysql  # macOS
# ou
sudo systemctl start mysql  # Linux
# ou
net start MySQL80          # Windows

# Créer la base
mysql -u root -p
CREATE DATABASE gsbrapports;
```

### Alternative: Docker Compose

```bash
cd gsb-node-api-samir
docker-compose up -d
# Cela lance un container MySQL automatiquement
```

---

## ▶️ Lancer le Projet

### Étape 1 : Backend (Terminal 1)

```bash
cd gsb-node-api-samir
npm start
```

**Résultat attendu:**

```
Express server running on port 3000
Connected to MySQL database: gsbrapports
```

L'API est maintenant disponible: **http://localhost:3000**

### Étape 2 : Frontend (Terminal 2)

```bash
cd GSBDoctor-12-03-2026
npm start
```

**Résultat attendu:**

```
Angular app is running at http://localhost:4200
...
```

L'app est maintenant disponible: **http://localhost:4200**

### Étape 3 : Accéder à l'application

Ouvrir votre navigateur:

🔗 **http://localhost:4200**

### Connexion initiale

```
Login: aribiA
Password: aaaa
```

---

## 🔌 Backend API REST

### Stack Backend

- **Node.js** 18+ + **Express.js** 4.x
- **Sequelize** ORM pour MySQL
- **JWT** (RS256) pour authentification
- **bcrypt** pour hachage des mots de passe
- **MySQL** 8.x database

### Ports et URLs

- **Backend API**: `http://localhost:3000`
- **CORS configuré**: `http://localhost:4200` (frontend)

### Routes d'authentification

#### POST /inscription

Créer un nouveau compte

```bash
curl -X POST http://localhost:3000/inscription \
  -H "Content-Type: application/json" \
  -d '{
    "login": "newuser",
    "password": "SecurePass!123",
    "firstname": "Jean",
    "lastname": "Dupont"
  }'
```

**Règles password:**

- Min 8 caractères
- 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial

#### POST /connexion

Se connecter

```bash
curl -X POST http://localhost:3000/connexion \
  -H "Content-Type: application/json" \
  -d '{
    "login": "aribiA",
    "password": "aaaa"
  }'
```

**Réponse:**

```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "username": "aribiA"
}
```

#### GET /deconnexion

Se déconnecter

```bash
curl -X GET http://localhost:3000/deconnexion \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Routes Médecins (GET/POST/PUT/DELETE)

#### GET /medecins

Lister les médecins

```bash
# Tous
curl http://localhost:3000/medecins

# Avec pagination
curl "http://localhost:3000/medecins?page=1&element=50"

# Avec filtre par nom
curl "http://localhost:3000/medecins?name=Dupont"
```

**Réponse:**

```json
{
  "medecins": [
    {
      "id": 1,
      "firstname": "Jean",
      "lastname": "Dupont",
      "address": "123 Rue de Paris",
      "phone": "01.23.45.67.89",
      "speciality": "Généraliste",
      "department": 75
    }
  ],
  "currentPage": 1,
  "totalPages": 20
}
```

#### POST /medecins

Créer un médecin

```bash
curl -X POST http://localhost:3000/medecins \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Martin",
    "prenom": "Claire",
    "adresse": "456 Boulevard Lyon",
    "tel": "02.34.56.78.90",
    "specialitecomplementaire": "Cardiologue",
    "departement": 69
  }'
```

#### PUT /medecins/:id

Modifier un médecin

```bash
curl -X PUT http://localhost:3000/medecins/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Martin",
    "prenom": "Claire",
    "adresse": "456 Boulevard Lyon",
    "tel": "02.34.56.78.90",
    "specialitecomplementaire": "Cardiologue",
    "departement": 69
  }'
```

#### DELETE /medecins/:id

Supprimer un médecin

```bash
curl -X DELETE http://localhost:3000/medecins/1
```

### Routes Médicaments (GET/POST/PUT/DELETE)

#### GET /medicaments

```bash
curl http://localhost:3000/medicaments
```

#### POST /medicaments

```bash
curl -X POST http://localhost:3000/medicaments \
  -H "Content-Type: application/json" \
  -d '{
    "id": "NEWCODE01",
    "nomCommercial": "Aspirin Plus",
    "idFamille": "ANA",
    "composition": "Acide acétylsalicylique 500mg",
    "effets": "Analgésique, antipyrétique",
    "contreIndications": "Allergie aux salicylates"
  }'
```

#### PUT /medicaments/:id

```bash
curl -X PUT http://localhost:3000/medicaments/3MYC7 \
  -H "Content-Type: application/json" \
  -d '{
    "nomCommercial": "Updated Name",
    "idFamille": "ANA",
    "composition": "...",
    "effets": "...",
    "contreIndications": "..."
  }'
```

#### DELETE /medicaments/:id

```bash
curl -X DELETE http://localhost:3000/medicaments/3MYC7
```

### Routes Rapports (Authentifiées - Nécessite Token)

#### GET /rapports

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/rapports?page=1&element=50
```

#### POST /rapports

Créer un rapport (nécessite authentification)

```bash
curl -X POST http://localhost:3000/rapports \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "balanceSheet": "Bilan satisfaisant",
    "motive": "Visite de routine",
    "doctorId": 1,
    "date": "2026-03-31",
    "medicineId": "3MYC7",
    "quantity": 2
  }'
```

#### PUT /rapports/:id

Modifier un rapport (nécessite authentification)

```bash
curl -X PUT http://localhost:3000/rapports/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "balanceSheet": "Bilan bon",
    "motive": "Visite de suivi",
    "doctorId": 1,
    "date": "2026-03-31",
    "medicineId": "3MYC7",
    "quantity": 3
  }'
```

#### DELETE /rapports/:id

Supprimer un rapport (nécessite authentification)

```bash
curl -X DELETE http://localhost:3000/rapports/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎨 Frontend Angular

### Stack Frontend

- **Angular** 20.3 (standalone components)
- **TypeScript** 5.9
- **Angular Signals** (state management moderne)
- **HttpClient** + interceptor Bearer token
- **Angular Router** + guards de sécurité
- **RxJS** pour les observables

### Pages de l'application

#### 🔑 Page Connexion (/login)

- Route **publique** (accessible sans authentification)
- Formulaire simple login/password
- Stockage du token en localStorage
- Session persistante
- Redirection automatique vers /doctors après succès

**Identifiants de test:**

```
Login: aribiA
Password: aaaa
```

#### 👨‍⚕️ Page Médecins (/doctors)

- Route **protégée** (nécessite authentification)
- Affichage de tous les médecins (1000+)
- **Sidebar gauche** - Formulaire CRUD
- **Liste droite** - Médecins avec actions
- 🔍 Recherche en temps réel (par nom, spécialité, email, adresse)
- ➕ **Créer** un nouveau médecin
- ✏️ **Modifier** un médecin existant
- 🗑️ **Supprimer** un médecin
- Messages feedback (succès/erreur)

#### 💊 Page Médicaments (/medicines)

- Route **protégée** (nécessite authentification)
- Affichage de tous les médicaments (500+)
- **Sidebar gauche** - Formulaire CRUD
- **Grille droite** - Cards de médicaments
- 🔍 Recherche dynamique
- ➕ **Créer** un médicament (code unique)
- ✏️ **Modifier** un médicament (code non éditable)
- 🗑️ **Supprimer** un médicament
- Messages feedback

#### 📝 Page Rapports (/reports)

- Route **protégée** (nécessite authentification)
- Affichage des rapports de visite
- **Sidebar gauche** - Formulaire CRUD
- **Liste droite** - Rapports
- 🔍 Recherche par date/motif/bilan
- ➕ **Créer** un rapport (nécessite token)
- ✏️ **Modifier** un rapport
- 🗑️ **Supprimer** un rapport
- Messages feedback

### Commandes Frontend

```bash
cd GSBDoctor-12-03-2026

# Lancer en développement
npm start

# Build production
npm run build
# Output: dist/gsbrapportsvisites/

# Tests unitaires
npm test

# Accès direct Angular CLI
npm run ng -- serve
npm run ng -- build
```

---

## 🔐 Authentification

### Flux d'authentification complet

```
1. Utilisateur accède http://localhost:4200
   ↓
2. Redirection automatique → /login (authGuard)
   ↓
3. Utilisateur entre credentials (aribiA / aaaa ou visiteur1 / Visiteur123!)
   ↓
4. Frontend envoie POST /connexion au backend
   ↓
5. Backend retourne JWT token
   ↓
6. Frontend stocke token en localStorage
   ↓
7. Interceptor HTTP ajoute header:
   Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
   ↓
8. Redirection automatique → /doctors
   ↓
9. Toutes les requêtes protégées incluent le token
   ↓
10. Routes protégées du backend vérifient le token
```

### Sécurité appliquée

✅ **Tokens JWT** RS256 (RS256 = RSA Signature)
✅ **localStorage** pour la persistance
✅ **Bearer token** sur les headers
✅ **authGuard** côté frontend (route protection)
✅ **authMiddleware** côté backend (route protection)
✅ **CORS** configuré pour `localhost:4200`
✅ **bcrypt** pour les mots de passe (non stockés en clair)

---

## 📊 Données de test

La base de données inclut:

- **1000+ Médecins** avec informations complètes
  - Nom, prénom, adresse
  - Téléphone, spécialité
  - Département, ville

- **500+ Médicaments** classés par famille
  - Code unique
  - Nom commercial
  - Composition, effets
  - Contre-indications

- **Comptes utilisateurs de test**
  - **Admin** (CRUD complet)
    - Login: `aribiA`
    - Password: `aaaa`
  - **Visiteur** (Lecture seule)
    - Login: `visiteur1`
    - Password: `Visiteur123!`

---

## 🔧 Configuration et Personnalisation

### Changer l'URL de l'API

**Frontend:** Éditer `GSBDoctor-12-03-2026/src/app/services/auth.ts`

```typescript
private readonly API_URL = 'http://localhost:3000';  // Changer ici
```

### Changer le port du backend

**Backend:** Éditer `gsb-node-api-samir/app.js`

```javascript
const PORT = process.env.PORT || 3000; // Changer ici
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Changer le port du frontend

**Frontend:** `npm start -- --port 5200`

### Changer les credentials de la BD

**Éditer:** `gsb-node-api-samir/config/config.json`

```json
{
  "development": {
    "username": "root",
    "password": "votre_password",
    "host": "127.0.0.1",
    "port": 3306
  }
}
```

---

## 📚 Architecture détaillée

### Backend Controllers

#### authController.js

- `signup()` - POST /inscription (créer compte)
- `login()` - POST /connexion (authentifier)
- `logout()` - GET /deconnexion (déconnecter)

#### medecinController.js

- `getDoctors()` - List médecins (paginated)
- `getDoctorById()` - Get un médecin
- `createDoctor()` - POST new médecin
- `updateDoctor()` - PUT modifier médecin
- `deleteDoctor()` - DELETE supprimer médecin

#### medicineController.js

- `getMedicines()` - List médicaments
- `getMedicineById()` - Get un médicament
- `createMedicine()` - POST new médicament
- `updateMedicine()` - PUT modifier médicament
- `deleteMedicine()` - DELETE supprimer médicament

#### reportController.js

- `getReports()` - List rapports (auth required)
- `getReportById()` - Get un rapport
- `createReport()` - POST new rapport (auth required)
- `updateReport()` - PUT modifier rapport (auth required)
- `deleteReport()` - DELETE supprimer rapport (auth required)

### Frontend Services

#### auth.ts

- `login()` - Authentifier utilisateur
- `logout()` - Déconnecter
- `isAuthenticated()` - Vérifier l'état
- `getToken()` - Récupérer le token

#### doctors.service.ts

- `getDoctors()` - List
- `getDoctorById()` - Get
- `createDoctor()` - Create
- `updateDoctor()` - Update
- `deleteDoctor()` - Delete

#### medicines.service.ts

- `getMedicines()` - List
- `getMedicineById()` - Get
- `createMedicine()` - Create
- `updateMedicine()` - Update
- `deleteMedicine()` - Delete

#### reports.service.ts

- `getReports()` - List (token requis)
- `getReportById()` - Get
- `createReport()` - Create (token requis)
- `updateReport()` - Update (token requis)
- `deleteReport()` - Delete (token requis)

---

## 🐛 Troubleshooting

### ❌ "Cannot connect to API"

**Cause:** L'API n'est pas lancée

```bash
# Solution
cd gsb-node-api-samir
npm start
# Vérifier le message: "Express server running on port 3000"
```

### ❌ "ECONNREFUSED 127.0.0.1:3306"

**Cause:** MySQL n'est pas lancé

```bash
# Solution avec ServBay
servbay mysql start
# Ou directement
mysql -u root -p123456
```

### ❌ "ER_BAD_DB_ERROR: Unknown database"

**Cause:** La base gsbrapports n'existe pas

```bash
# Solution
mysql -u root -p123456 < gsb-node-api-samir/database/gsbrapports.sql
# Ou créer manuellement
mysql -u root -p123456
CREATE DATABASE gsbrapports;
```

### ❌ "Login failed 401"

**Cause 1:** Identifiants incorrects

```bash
# Vérifier: aribiA / aaaa
```

**Cause 2:** Token expiré

```bash
# Solution: Se reconnecter
```

**Cause 3:** API ne répond pas

```bash
# Vérifier que Backend tourne bien
npm start  # Dans gsb-node-api-samir/
```

### ❌ "CORS error"

**Cause:** Frontend et backend sur ports différents

```bash
# Vérifier:
# Backend http://localhost:3000
# Frontend http://localhost:4200

# CORS configuré dans app.js pour localhost:4200
```

### ❌ "Cannot GET /rapports" (404)

**Cause:** Routes d'authentification non exportées

```bash
# Solution
# Vérifier que routes/report.js est importé dans app.js
# Relancer: npm start
```

### ❌ "angular build error"

**Cause:** Dépendances manquantes

```bash
# Solution
cd GSBDoctor-12-03-2026
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🧪 Tests

### Tests Backend (optionnel)

```bash
cd gsb-node-api-samir
npm test  # Si tests configurés
```

### Tests Frontend

```bash
cd GSBDoctor-12-03-2026

# Tests unitaires
npm test

# Tests avec coverage
npm test -- --code-coverage

# Tests spécifiques
npm test -- --include='**/doctors-page.spec.ts'
```

---

## 📦 Build Production

### Build Backend

```bash
cd gsb-node-api-samir
# Pas de build nécessaire, l'app Node.js tourne directement
npm start
```

### Build Frontend

```bash
cd GSBDoctor-12-03-2026
npm run build
# Output: dist/gsbrapportsvisites/
```

Déployer le contenu de `dist/gsbrapportsvisites/` sur un serveur web.

---

## 📄 Licence

Projet GSBDoctor - Tous droits réservés

---

## ✅ Checklist de démarrage

- [ ] Node.js 18+ installé (`node -v`)
- [ ] npm 9+ installé (`npm -v`)
- [ ] MySQL lancé (ServBay ou autre)
- [ ] Base gsbrapports importée (`mysql gsbrapports`)
- [ ] Backend installé (`npm install` dans gsb-node-api-samir)
- [ ] Frontend installé (`npm install` dans GSBDoctor-12-03-2026)
- [ ] Backend lancé (`npm start` en terminal 1)
- [ ] Frontend lancé (`npm start` en terminal 2)
- [ ] Accès http://localhost:4200
- [ ] Connection avec aribiA / aaaa

---

## 🚀 Commandes rapides

```bash
# Cloner et setup
git clone https://github.com/Youss-93/gsb_doctors.git
cd gsb_doctors

# Terminal 1 - Backend
cd gsb-node-api-samir && npm install && npm start

# Terminal 2 - Frontend
cd GSBDoctor-12-03-2026 && npm install && npm start

# Navigateur
# http://localhost:4200
# Login: aribiA / aaaa
```

---

**Besoin d'aide?** Vérifiez la section [Troubleshooting](#-troubleshooting).

**Prêt?** 🎉 Allez vers http://localhost:4200!
