# GSBDoctor Frontend - Angular

Application Angular moderne pour consommer l'API GSB backend.

Gère les **3 domaines métier**:
- 👨‍⚕️ **Médecins** (CRUD complet + recherche)
- 💊 **Médicaments** (CRUD complet + recherche)
- 📝 **Rapports** (CRUD avec authentification + recherche)

## 🏗️ Stack technique

- **Angular** 20.3 (standalone components)
- **TypeScript** 5.9
- **Angular Signals** (state management moderne)
- **HttpClient** + Bearer token interceptor
- **Angular Router** + auth guards
- **RxJS** pour les observables

## 📋 Prérequis

- **Node.js** LTS (18+) + npm
- **Backend API** lancée sur `http://localhost:3000`
  - (Voir `../gsb-node-api-samir/readme.md` pour lancer l'API)

## 🚀 Installation rapide

### 1. Cloner et installer

```bash
git clone https://github.com/Youss-93/gsb_doctors.git
cd gsb_doctors/GSBDoctor-12-03-2026
npm install
```

### 2. Démarrer en développement

```bash
npm start
```

**L'app sera disponible sur:** 🔗 `http://localhost:4200`

### 3. Authentification

À la première visite, vous serez redirigé vers `/login`.

**Credentials de test:**
```
Login: aribiA
Password: aaaa
```

Après connexion réussie → redirection vers `/doctors`

## 📖 Navigation et Pages

### 🔑 Page Connexion (`/login`)
- Route publique
- Formulaire de connexion
- Stockage du token JWT en localStorage
- Session persistante (reste connecté après rechargement)

### 👨‍⚕️ Page Médecins (`/doctors`)
- **Route protégée** ✅
- 📋 Liste complète des médecins avec pagination
- 🔍 Recherche en temps réel (nom, spécialité, email, adresse)
- ➕ **Créer** un nouveau médecin
- ✏️ **Modifier** les infos d'un médecin existant
- 🗑️ **Supprimer** un médecin
- Messages de feedback (succès/erreur)

### 💊 Page Médicaments (`/medicines`)
- **Route protégée** ✅
- 📋 Liste avec cards
- 🔍 Recherche dynamique
- ➕ **Créer** un médicament (code unique)
- ✏️ **Modifier** les propriétés (code non éditable)
- 🗑️ **Supprimer** un médicament
- Messages de feedback

### 📝 Page Rapports (`/reports`)
- **Route protégée** ✅
- 📋 Liste des rapports de visite
- 🔍 Recherche par date/motif/bilan
- ➕ **Créer** un rapport (nécessite token)
- ✏️ **Modifier** un rapport (nécessite token)
- 🗑️ **Supprimer** un rapport (nécessite token)
- Messages de feedback

## 🎨 Design et UX

### Layout
- Navigation horizontale en haut (Médecins / Médicaments / Rapports)
- **Sidebar formulaire CRUD** à gauche (380px)
- **Liste/détails** à droite (responsive)

### Styling
- Design moderne et minimaliste
- Palette de couleurs cohérente
- Boutons avec feedback visuel
- Messages d'erreur/succès en couleur
- Responsive design (mobile, tablet, desktop)

### Interactions
- Formulaire en temps réel
- Recherche instantanée
- Actions inline (Modifier / Supprimer par ligne)
- Confirmation implicite via success message

## 🔐 Sécurité et Authentification

### FluxAuthentification
1. Connexion → API `/connexion` → JWT token reçu
2. Token stocké en **localStorage** sous `authToken`
3. **Interceptor HTTP** ajoute automatiquement:
   ```
   Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Chaque page protégée vérifie l'auth via `authGuard`
5. Si pas auth → redirection `/login`

### Routes protégées
- `/doctors` - Nécessite authentification
- `/medicines` - Nécessite authentification
- `/reports` - Nécessite authentification (aussi côté API)

### Services avec authentification
- `DoctorsService` - GET/POST/PUT/DELETE
- `MedicinesService` - GET/POST/PUT/DELETE
- `ReportsService` - GET/POST/PUT/DELETE (token obligatoire)

## 📁 Structure du projet

```
src/app/
├── components/
│   ├── login/
│   │   ├── login.ts
│   │   ├── login.html
│   │   ├── login.css
│   │   └── login.spec.ts
│   └── doctor-card/
│       ├── doctor-card.ts
│       ├── doctor-card.html
│       ├── doctor-card.css
│       └── doctor-card.spec.ts
│
├── pages/
│   ├── doctors-page/
│   │   ├── doctors-page.ts      # CRUD doctors
│   │   ├── doctors-page.html
│   │   ├── doctors-page.css
│   │   └── doctors-page.spec.ts
│   ├── medicines-page/
│   │   ├── medicines-page.ts    # CRUD medicines
│   │   ├── medicines-page.html
│   │   └── medicines-page.css
│   └── reports-page/
│       ├── reports-page.ts      # CRUD reports (Auth)
│       ├── reports-page.html
│       └── reports-page.css
│
├── services/
│   ├── auth.ts                  # Authentification + storage
│   ├── auth.spec.ts
│   ├── doctors.service.ts       # Doctors API
│   ├── medicines.service.ts     # Medicines API
│   └── reports.service.ts       # Reports API (Auth)
│
├── guards/
│   └── auth.guard.ts            # Route protection
│
├── interceptors/
│   └── auth.interceptor.ts      # Ajoute token Bearer
│
├── types/
│   ├── auth.model.ts
│   ├── doctor.interface.ts
│   ├── medicine.interface.ts
│   └── report.interface.ts
│
├── helpers/
│   └── convert-medecin-to-doctor.ts
│
├── app.routes.ts                # Configuration routes
├── app.config.ts                # Configuration app
├── app.ts                       # Component racine
└── app.css                      # Styles globaux

dist/                            # Build production
```

## 🛠️ Développement

### Commandes disponibles

```bash
# Démarrage en mode watch
npm start

# Build production
npm run build
# Output: dist/gsbrapportsvisites/

# Lancer les tests
npm test

# Ng CLI directement
npm run ng -- <commande>
```

### Architecture moderne

**Standalone Components**
```typescript
@Component({
  selector: 'app-doctors-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctors-page.html',
  styleUrl: './doctors-page.css'
})
```

**Angular Signals**
```typescript
// State management
doctors = toSignal(this.service.getDoctors(), { initialValue: [] });
searchTerm = signal('');

// Computed values
filteredDoctors = computed(() => {
  // Réactif automatiquement
});
```

**Functional Guards**
```typescript
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isAuthenticated() ? true : inject(Router).createUrlTree(['/login']);
};
```

**Functional Interceptors**
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
```

## 🔄 Flux de données

```
Component ← Signal/computed
    ↓ (input events)
Update signal
    ↓ (subscribe)
Service.updateData(payload)
    ↓ (HTTP + interceptor)
Backend API + Bearer token
    ↓ (response)
Refresh list (new signal value)
    ↓
UI updates automatically
```

## 🧪 Tests

```bash
# Tests unitaires
npm test

# Tests spécifiques
npm test -- --include='**/doctors-page.spec.ts'

# Coverage
npm test -- --code-coverage
```

Les tests incluent:
- ✅ ComponentsLogin, Doctors, Medicines, Reports
- ✅ Services (Auth, Doctors, etc.)
- ✅ Guards et interceptors
- ✅ Conversions de données

## 📦 Build Production

```bash
npm run build
```

Génère:
- 📁 **dist/gsbrapportsvisites/** - Application prête à déployer
- 🗜️ **Bundles optimisésavec tree-shaking**
- 📊 **Taille finale ~72KB gzipped**

### Déployer

```bash
# Copier dist/ vers votre serveur web
scp -r dist/gsbrapportsvisites/* user@server:/var/www/gsbdoctor/

# Ou avec Netlify, Vercel, Firebase Hosting, etc.
```

## 🔧 Configuration de l'API

### URL de l'API

Dans `src/app/services/auth.ts`:
```typescript
private readonly API_URL = 'http://localhost:3000';
```

Pour changer:
1. Éditer le fichier
2. Mettre à jour `API_URL`
3. Redémarrer `npm start`

### CORS

L'API backend doit autoriser `localhost:4200`:
```javascript
// app.js (backend)
cors: { origin: 'http://localhost:4200' }
```

## 🐛 Troubleshooting

| Problème | Solution |
|----------|----------|
| **"Cannot GET"** | Vérifier que `npm start` tourne et port 4200 libre |
| **"Connection refused to :3000"** | L'API n'est pas lancée. Voir backend README |
| **"Unauthorized 401"** | Token expiré ou invalide. Se reconnecter |
| **"CORS error"** | Vérifier config CORS du backend |
| **Build errors** | `npm install` et `npm run build` à nouveau |

## 📚 Ressources

- [Angular Docs](https://angular.io/docs)
- [Angular Signals](https://angular.io/guide/signals)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 📄 Licence

Projet GSBDoctor - Tous droits réservés

## 🤝 Support

Pour toute question ou bug, consulter les logs du browser (`F12 → Console`).

---

**Prêt à démarrer?** 🚀

```bash
# Backend d'abord
cd ../gsb-node-api-samir && npm install && npm start

# Dans un autre terminal, frontend
cd GSBDoctor-12-03-2026 && npm install && npm start

# Accès: http://localhost:4200
```

