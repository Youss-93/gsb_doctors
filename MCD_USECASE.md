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

### Diagramme structurel des Use Cases 

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SYSTÈME GSBDoctor - USE CASES                        │
└─────────────────────────────────────────────────────────────────────────────┘

          ┌──────────────────────────────────────────────────────────┐
          │              <<include>> Authentifier (JWT)              │
          └─────────────┬──────────────────────────────┬─────────────┘
                        ^                              ^
          ┌─────────────┴─────┐                  ┌─────┴─────────────┐
          │     S'inscrire    │                  │    Se connecter   │
          └──────────┬────────┘                  └─────────┬─────────┘
                     │                                     │
    [INTERNAUTE] ────┴──────────────────┬──────────────────┴──── [INTERNAUTE]
                                        │
                         ┌──────────────V──────────────┐
                         │    VISITEUR (Authentifié)   │
                         └──────────────┬──────────────┘
                                        │
        ┌───────────────────┬───────────┴───────────┬───────────────────┐
        │                   │                       │                   │
┌───────┴───────┐   ┌───────┴───────┐       ┌───────┴───────┐   ┌───────┴───────┐
│ Se déconnecter│   │ Cons. Médecins│       │ Cons. Médocs  │   │ Cons. Rapports│
└───────────────┘   └───────┬───────┘       └───────┬───────┘   └───────────────┘
                            │                       │
                            │        [ADMIN]        │
        ┌───────────────────┼───────────────────────┼───────────────────┐
        │                   │        (Hérite)       │                   │
        │                   │                       │                   │
┌───────V───────┐   ┌───────V───────┐       ┌───────V───────┐   ┌───────V───────┐
│ Gérer Médecins│   │ Gérer Médocs  │       │ Gérer Familles│   │ Gérer Rapports│
├───────────────┤   ├───────────────┤       ├───────────────┤   ├───────────────┤
│ - CRUD        │   │ - CRUD        │       │ - Lister      │   │ - CRUD        │
│ - Recherche   │   │ - Familles    │       │ - Modifier    │   │ - Modération  │
│ - Filtrer     │   │ - Effets/Risq │       │               │   │ - (include)   │
└───────────────┘   └───────────────┘       └───────────────┘   └───────┬───────┘
                                                                        │
                                                        ┌───────────────V───────┐
                                                        │  Rechercher Rapport   │
                                                        ├───────────────────────┤
                                                        │ - Par date / médecin  │
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



### Use Cases

- **17 cas d'utilisation** couvrant le projet complètement
- **3 acteurs**: Internaute, Utilisateur, Admin
- **Include**: Authentification JWT systématique pour les opérations protégées
- **Contrôle d'accès**: Bien défini par rôle
