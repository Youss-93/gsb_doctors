# GSBDoctor - Modèle Conceptuel de Données (MCD) et Use Cases

## Annexe 1: MCD (Modele Conceptuel de Donnees)

### Entites et attributs (conformes au schema fourni)

#### VISITEUR

| Attribut     |
| ------------ |
| id_Visiteurs |
| Login        |
| Mdp          |
| Nom          |
| Prenom       |
| AdressePost  |
| CodePostale  |
| Ville        |
| dateEmbauche |

#### RAPPORT

| Attribut    |
| ----------- |
| id_Rapport  |
| dateRapport |
| Motif       |
| Bilan       |

#### MEDECIN

| Attribut          |
| ----------------- |
| id_Medecin        |
| Nom               |
| Prenom            |
| AdressePostale    |
| SpeComplementaire |
| NumTel            |
| Departement       |

#### MEDICAMENT

| Attribut          |
| ----------------- |
| id_Medicament     |
| nomCommercial     |
| Composition       |
| Effets            |
| contreIndications |

#### FAMILLE

| Attribut   |
| ---------- |
| id_Famille |
| Libelle    |

### Associations et cardinalites

#### Rediger

- Entre VISITEUR et RAPPORT
- Cardinalites: VISITEUR (0,n) - RAPPORT (1,1)

#### Concerner

- Entre RAPPORT et MEDECIN
- Cardinalites: RAPPORT (1,1) - MEDECIN (1,n)

#### Offrir

- Entre RAPPORT et MEDICAMENT
- Attribut d'association: quantite
- Cardinalites: RAPPORT (0,n) - MEDICAMENT (0,n)

#### Appartenir

- Entre MEDICAMENT et FAMILLE
- Cardinalites: MEDICAMENT (1,1) - FAMILLE (0,n)

### Representation textuelle compacte

```text
VISITEUR(id_Visiteurs, Login, Mdp, Nom, Prenom, AdressePost, CodePostale, Ville, dateEmbauche)
RAPPORT(id_Rapport, dateRapport, Motif, Bilan)
MEDECIN(id_Medecin, Nom, Prenom, AdressePostale, SpeComplementaire, NumTel, Departement)
MEDICAMENT(id_Medicament, nomCommercial, Composition, Effets, contreIndications)
FAMILLE(id_Famille, Libelle)

REDIGER: VISITEUR (0,n) <-> RAPPORT (1,1)
CONCERNER: RAPPORT (1,1) <-> MEDECIN (1,n)
OFFRIR(quantite): RAPPORT (0,n) <-> MEDICAMENT (0,n)
APPARTENIR: MEDICAMENT (1,1) <-> FAMILLE (0,n)
```

## Annexe 2: FONCTIONNALITES / Diagramme des Cas d'Utilisation (Use Case)

### Diagramme structurel des Use Cases (Format ASCII)

┌──────────────────────────────────────────────────────────────────────────────┐
│                        SYSTÈME GSBDoctor - USE CASES                         │
└──────────────────────────────────────────────────────────────────────────────┘

          ┌──────────────────────────────────────────────────────────┐
          │               <<include>> Authentifier (JWT)             │
          └─────────────┬──────────────────────────────┬─────────────┘
                        ▲                              ▲
          ┌─────────────┴─────┐                  ┌─────┴─────────────┐
          │     S'inscrire    │                  │    Se connecter   │
          └──────────┬────────┘                  └─────────┬─────────┘
                     │                                     │
    [Internaute] ────┴──────────────────┬──────────────────┴──── [Internaute]
                                        │
                         ┌──────────────▼──────────────┐
                         │    VISITEUR (Authentifié)   │
                         └──────────────┬──────────────┘
                                        │
        ┌───────────────────┬───────────┴───────────┬───────────────────┐
        │                   │                       │                   │
┌───────▼───────┐   ┌───────▼───────┐       ┌───────▼───────┐   ┌───────▼───────┐
│ Se déconnecter│   │ Cons. Médecins│       │ Cons. Médocs  │   │ Cons. Rapports│
└───────────────┘   └───────▼───────┘       └───────▼───────┘   └───────────────┘
                            │                       │
                            │        [Admin]        │
        ┌───────────────────┼───────────────────────┼───────────────────┐
        │                   │        (Hérite)       │                   │
        │                   │                       │                   │
┌───────▼───────┐   ┌───────▼───────┐       ┌───────▼───────┐   ┌───────▼───────┐
│ Gérer Médecins│   │ Gérer Médocs  │       │ Gérer Familles│   │ Gérer Rapports│
├───────────────┤   ├───────────────┤       ├───────────────┤   ├───────────────┤
│- CRUD         │   │- CRUD         │       │- Lister       │   │- CRUD         │
│- Recherche    │   │- Effets       │       │- Modifier     │   │- Modération   │
│- Filtrer      │   │- Risques      │       │               │   │- (include)    │
└───────────────┘   └───────────────┘       └───────────────┘   └───────┬───────┘
                                                                        │
                                                        ┌───────────────▼───────┐
                                                        │  Rechercher Rapport   │
                                                        ├───────────────────────┤
                                                        │- Par date             │
                                                        │- Par médecin          │
                                                        └───────────────────────┘




    ┌──────────────────────────────────────────────────────┐
    │         ACTEURS DE L'APPLICATION                     │
    ├──────────────────────────────────────────────────────┤
    │ • INTERNAUTE (Non authentifié)                       │
    │   → Seulement: S'inscrire, voir /login               │
    │                                                      │
    │ • UTILISATEUR AUTHENTIFIÉ                            │
    │   → Consulter médecins, médicaments, rapports        │
    │   → Créer/Modifier/Supprimer les rapports            │
    │   → Se déconnecter                                   │
    │                                                      │
    │ • ADMIN                                              │
    │   → Toutes les fonctionnalités UTILISATEUR           │
    │   → Gestion complète: Médecins + Médicaments         │
    │   → Gestion des familles                             │
    │   → Modération des rapports                          │
    └──────────────────────────────────────────────────────┘
```

### Matrice des Cas d'Utilisation par Acteur

| Use Case              | Internaute | Utilisateur |   Admin   |
| --------------------- | :--------: | :---------: | :-------: |
| S'inscrire            |     ✅     |     ❌      |    ❌     |
| Se connecter          |     ✅     |     ❌      |    ✅     |
| Se déconnecter        |     ❌     |     ✅      |    ✅     |
| Consulter médecins    |     ❌     |     ✅      |    ✅     |
| Rechercher médecin    |     ❌     |     ✅      |    ✅     |
| Consulter médicaments |     ❌     |     ✅      |    ✅     |
| Rechercher médicament |     ❌     |     ✅      |    ✅     |
| Consulter rapports    |     ❌     |     ✅      |    ✅     |
| Créer rapport         |     ❌     |     ✅      |    ✅     |
| Modifier rapport      |     ❌     | ✅ (propre) | ✅ (tous) |
| Supprimer rapport     |     ❌     | ✅ (propre) | ✅ (tous) |
| Créer médecin         |     ❌     |     ❌      |    ✅     |
| Modifier médecin      |     ❌     |     ❌      |    ✅     |
| Supprimer médecin     |     ❌     |     ❌      |    ✅     |
| Créer médicament      |     ❌     |     ❌      |    ✅     |
| Modifier médicament   |     ❌     |     ❌      |    ✅     |
| Supprimer médicament  |     ❌     |     ❌      |    ✅     |

### Description détaillée des Cas d'Utilisation

#### 1. S'inscrire

- **Acteurs**: Internaute
- **Pré-condition**: N/A
- **Scénario principal**:
  1. Internaute accède à la page /login
  2. Clique sur "S'inscrire"
  3. Remplit formulaire (login, password, firstname, lastname)
  4. Valide les règles de password
  5. Crée le compte avec rôle USER
  6. Affiche message succès → Redirection /login
- **Scénario d'erreur**: Login déjà utilisé → Message erreur

#### 2. Se connecter

- **Acteurs**: Internaute, Utilisateur, Admin
- **Pré-condition**: Compte existant
- **Scénario principal**:
  1. Accède à /login
  2. Entre login/password
  3. Appelle endpoint POST /connexion
  4. Backend vérifie credentials (bcrypt)
  5. Génère token JWT
  6. Stock token en localStorage
  7. Redirection vers /doctors (ou dashboard admin)
- **Scénario d'erreur**: Identifiants incorrects → 401 Unauthorized
- **Include**: Authentifier (avec JWT)

#### 3. Se déconnecter

- **Acteurs**: Utilisateur, Admin
- **Pré-condition**: Connecté
- **Scénario principal**:
  1. Clique "Se déconnecter"
  2. Appelle endpoint GET /deconnexion + token
  3. Supprime token du localStorage
  4. Redirige vers /login
- **Scénario d'erreur**: Token expiré → Redirection automatique /login

#### 4. Consulter les médecins

- **Acteurs**: Utilisateur, Admin
- **Pré-condition**: Authentifié
- **Scénario principal**:
  1. Accède à /doctors
  2. Affiche liste médecins (1000+) avec pagination
  3. Montre: id, nom, prenom, specialite, tel, department
  4. Pagination: page 1, 50 par page
- **Cas alternatif**: Lister sans filtre vs avec recherche

#### 5. Rechercher un médecin

- **Acteurs**: Utilisateur, Admin
- **Pré-condition**: Sur page /doctors
- **Scénario principal**:
  1. Tape du texte dans la barre recherche
  2. Filtre en temps réel (nom, prenom, specialite, email, adresse)
  3. Affiche résultats dynamiquement
  4. Cas insensible (minuscules/majuscules)
- **Performance**: Recherche côté frontend (Signals Angular)

#### 6. Consulter les médicaments

- **Acteurs**: Utilisateur, Admin
- **Pré-condition**: Authentifié
- **Scénario principal**:
  1. Accède à /medicines
  2. Affiche liste médicaments (500+)
  3. Format card: NomCommercial, Famille, Composition, Effets, Risques
  4. Filtre optionnel par famille
- **Include**: Rechercher médicament

#### 7. Rechercher un médicament

- **Acteurs**: Utilisateur, Admin
- **Pré-condition**: Sur page /medicines
- **Scénario principal**:
  1. Tape dans barre recherche
  2. Filtre par: nomCommercial, composition, effets, contreIndications
  3. Affichage dynamique
- **Performance**: Recherche côté frontend

#### 8. Consulter les rapports (Authentifié)

- **Acteurs**: Utilisateur, Admin
- **Pré-condition**: Authentifié + token JWT valide
- **Scénario principal**:
  1. Accède à /reports
  2. Backend vérifie token (authMiddleware)
  3. Affiche liste des rapports
  4. Format: Date, Motif, Bilan, Médecin, Médicament
  5. Pagination: 50 par page
- **Include**: Authentifier (token requis)

#### 9. Créer un rapport

- **Acteurs**: Utilisateur, Admin
- **Pré-condition**: Authentifié
- **Scénario principal**:
  1. Sur page /reports, clique "Nouveau rapport"
  2. Ouvre formulaire avec champs:
     - Date (date picker)
     - Motif (textarea)
     - Bilan (textarea)
     - Médecin (select)
     - Médicament (input code)
     - Quantité (number)
  3. Valide les données obligatoires
  4. Envoie POST /rapports + token
  5. Backend crée rapport avec CreatedBy = user.id
  6. Affiche message succès
- **Include**: Authentifier (token requis)
- **Scénario d'erreur**: Données manquantes → Message validation

#### 10. Modifier un rapport

- **Acteurs**: Utilisateur (propre rapport), Admin (tous)
- **Pré-condition**: Rapport existant + Authentifié
- **Scénario principal**:
  1. Clique "Modifier" sur un rapport
  2. Remplit formulaire avec données existantes
  3. Change les infos
  4. Envoie PUT /rapports/:id + token
  5. Backend met à jour
  6. Message succès
- **Contrôle d'accès**: Vérifier CreatedBy = user.id (User) ou role=ADMIN
- **Include**: Authentifier

#### 11. Supprimer un rapport

- **Acteurs**: Utilisateur (propre), Admin (tous)
- **Pré-condition**: Rapport existant + Authentifié
- **Scénario principal**:
  1. Clique "Supprimer" sur un rapport
  2. Confirmation (optionnel)
  3. Envoie DELETE /rapports/:id + token
  4. Backend supprime
  5. Actualise la liste
- **Include**: Authentifier
- **Sécurité**: Vérifier propriété ou rôle admin

#### 12. Créer un médecin (Admin uniquement)

- **Acteurs**: Admin
- **Pré-condition**: Authentifié + rôle Admin
- **Scénario principal**:
  1. Sur page /doctors, clique "Nouveau médecin"
  2. Formulaire: nom, prenom, adresse, tel, specialite, departement
  3. Valide champs obligatoires
  4. Envoie POST /medecins
  5. Backend crée et retourne id
  6. Actualise liste + message succès
- **Contrôle d'accès**: Vérifier role = ADMIN
- **Include**: Authentifier

#### 13. Modifier un médecin (Admin uniquement)

- **Acteurs**: Admin
- **Pré-condition**: Authentifié + Admin
- **Scénario principal**:
  1. Clique "Modifier" sur médecin
  2. Édite champs
  3. PUT /medecins/:id
  4. Succès + Actualise liste
- **Include**: Authentifier

#### 14. Supprimer un médecin (Admin uniquement)

- **Acteurs**: Admin
- **Pré-condition**: Authentifié + Admin
- **Scénario principal**:
  1. Clique "Supprimer" sur médecin
  2. Confirmation
  3. DELETE /medecins/:id
  4. Succès ou erreur (lié à des rapports)
- **Scénario d'erreur**: Médecin référencé dans rapports → Erreur CASCADE
- **Include**: Authentifier

#### 15-17. Créer/Modifier/Supprimer un médicament (Admin)

- Identique à médecins, mais sur /medicines
- Champs: id, nomCommercial, idFamille, composition, effets, contreIndications
- Contrôle: Admin uniquement

---

## Résumé

### MCD

- **5 entités principales**: VISITEUR, MEDECIN, MEDICAMENT, RAPPORT, FAMILLE
- **Relations 1,n**: bien définies avec cardinalités
- **Contraintes**: PK, FK, UNIQUE, NOT NULL

### Use Cases

- **17 cas d'utilisation** couvrant le projet complètement
- **3 acteurs**: Internaute, Utilisateur, Admin
- **Include**: Authentification JWT systématique pour les opérations protégées
- **Contrôle d'accès**: Bien défini par rôle
