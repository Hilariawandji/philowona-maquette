# Brief maquette — Philowona.com (Pilier 1 / MVP)

Ce document est un brief prêt à coller dans Figma Make pour générer la maquette du Pilier 1 (Éducation financière patrimoniale populaire), conformément au Cahier des Charges, aux Spécifications Fonctionnelles et Techniques et au Dossier de lancement du MVP.

## 1. Contexte produit

Philowona.com est une plateforme web (PWA, mobile-first) d'éducation financière patrimoniale populaire destinée à un public francophone, en priorité les jeunes entrepreneurs urbains et les TPE, en Afrique et dans sa diaspora (France, Suisse). Le MVP couvre uniquement le Pilier 1 : parcours de formation en ligne, quiz, certificat, abonnement premium via mobile money, et back-office de gestion de contenu.

Positionnement : « La plateforme qui rend la finance et les échanges accessibles, dans la langue et les codes de la communauté. »

## 2. Principes de design

- **Mobile-first strict** : l'essentiel des usages se fait sur smartphone, y compris en connexion limitée (3G). Concevoir d'abord l'écran mobile, décliner ensuite en tablette/desktop.
- **Sobriété et confiance** : produit financier populaire, pas une app fintech premium — éviter le jargon, privilégier la clarté et la pédagogie. Ton rassurant, pas intimidant.
- **Accessibilité** : contraste fort, tailles de texte lisibles, zones tactiles ≥ 44px, feedback visuel explicite sur chaque action (paiement, quiz, OTP).
- **Performance perçue** : prévoir des états de chargement (skeleton screens) partout où une donnée réseau est attendue (catalogue, vidéo, paiement).
- **Langue** : français uniquement pour le MVP (prévoir en conception un espace pour un sélecteur de langue désactivé/grisé, sans le développer).
- **Identité de marque** : charte officielle transmise par le maître d'ouvrage — registre noir/or/crème, typographies serif (Playfair Display, Cormorant Garamond) + sans-serif (Montserrat). Voir section 6 pour le détail des tokens. Ton patrimonial et haut de gamme, cohérent avec le positionnement « éducation financière patrimoniale ».

## 3. Rôles / personas à couvrir dans la maquette

| Rôle | Accès | Écrans concernés |
|---|---|---|
| Visiteur (non connecté) | Modules gratuits en consultation uniquement | Accueil publique, Catalogue (lecture seule) |
| Utilisateur inscrit (gratuit) | Modules gratuits + historique, peut initier un paiement | Espace apprenant complet, page premium |
| Utilisateur premium | Ensemble des modules + historique paiements | Espace apprenant complet + modules premium débloqués |
| Administrateur | Gestion complète des contenus, paiements, utilisateurs | Back-office complet |

## 4. Arborescence des écrans

```
Public
 ├─ Accueil publique
 ├─ Inscription
 ├─ Vérification OTP
 ├─ Connexion
 └─ Mot de passe oublié

Espace Apprenant (connecté)
 ├─ Tableau de bord apprenant
 ├─ Catalogue de modules
 │   └─ Détail d'un module
 │       └─ Lecteur vidéo + support texte
 │           └─ Quiz de fin de module
 │               └─ Résultat + certificat
 ├─ Espace personnel (profil, historique, favoris, abonnement)
 └─ Passer premium
     └─ Paiement mobile money
         └─ Confirmation de paiement

Back-office Admin
 ├─ Connexion admin
 ├─ Tableau de bord admin (indicateurs)
 ├─ Gestion des modules (liste)
 │   └─ Créer / Éditer un module
 ├─ Gestion des utilisateurs
 └─ Export des paiements
```

## 5. Détail des écrans

### 5.1 Accueil publique
- **Objectif** : présenter la promesse (éducation financière accessible) et pousser vers l'inscription, sans compte requis pour parcourir.
- **Contenu** : titre d'accroche, aperçu de 3-4 modules gratuits (vignette + titre + durée), bouton « S'inscrire », lien « J'ai déjà un compte ».
- **États** : chargement du catalogue public (skeleton cards).
- **Navigation** : → Inscription, → Connexion, → Détail module (lecture seule, incite à s'inscrire pour continuer).

### 5.2 Inscription
- **Objectif** : créer un compte par email ou numéro mobile.
- **Contenu** : champ email OU mobile (toggle), mention RGPD/consentement explicite, bouton « Créer mon compte ».
- **États** : erreur de validation (format email/mobile invalide), champ déjà utilisé.
- **Navigation** : → Vérification OTP.

### 5.3 Vérification OTP
- **Objectif** : valider le numéro mobile par code SMS.
- **Contenu** : 6 champs de saisie de code, minuteur de renvoi (« Renvoyer le code dans 00:30 »), bouton « Valider ».
- **États** : code erroné, code expiré, renvoi possible.
- **Navigation** : → Tableau de bord apprenant (première connexion).

### 5.4 Connexion
- **Objectif** : connexion d'un utilisateur existant.
- **Contenu** : champ identifiant, mot de passe, lien « Mot de passe oublié », bouton « Se connecter ».
- **Navigation** : → Tableau de bord apprenant, → Mot de passe oublié.

### 5.5 Mot de passe oublié
- **Objectif** : réinitialisation via email/SMS.
- **Contenu** : champ identifiant, message de confirmation d'envoi, écran de saisie du nouveau mot de passe.

### 5.6 Tableau de bord apprenant
- **Objectif** : point d'entrée post-connexion, reprise rapide du parcours.
- **Contenu** : bannière de reprise (« Reprendre : [Module en cours] »), statut d'abonnement (gratuit/premium), accès rapide au catalogue, accès profil.
- **États** : nouvel utilisateur sans historique (message d'invitation à démarrer un module).
- **Navigation** : → Catalogue, → Détail module en cours, → Espace personnel, → Passer premium.

### 5.7 Catalogue de modules
- **Objectif** : parcourir les 8-10 modules disponibles.
- **Contenu** : liste/grille de cartes module (titre, durée, badge gratuit/premium, icône de progression si déjà commencé), filtre gratuit/premium.
- **États** : module verrouillé (premium) avec cadenas visuel pour un utilisateur gratuit.
- **Navigation** : → Détail d'un module.

### 5.8 Détail d'un module
- **Objectif** : présenter le module avant lecture, inciter à l'action.
- **Contenu** : titre, description, durée, niveau, bouton « Commencer » ou « Reprendre », bouton « Ajouter aux favoris ».
- **États** : module premium non débloqué → CTA « Passer premium » à la place de « Commencer ».
- **Navigation** : → Lecteur vidéo, → Passer premium.

### 5.9 Lecteur vidéo + support texte
- **Objectif** : consommation du contenu pédagogique avec suivi de progression.
- **Contenu** : lecteur vidéo (contrôles standards), barre de progression du module, onglet ou section « Support texte » (PDF/texte téléchargeable), bouton « Passer le quiz » activé en fin de vidéo.
- **États** : reprise automatique à l'endroit quitté, connexion lente (indicateur de chargement/qualité adaptative).
- **Navigation** : → Quiz de fin de module.

### 5.10 Quiz de fin de module
- **Objectif** : valider les acquis.
- **Contenu** : questions à choix multiples, une à la fois ou liste scrollable, barre de progression du quiz, bouton « Valider mes réponses ».
- **États** : score insuffisant (proposition de repasser le quiz), score suffisant.
- **Navigation** : → Résultat + certificat (si dernier module du parcours) ou → Catalogue (module suivant).

### 5.11 Résultat + certificat
- **Objectif** : féliciter et délivrer la preuve de complétion.
- **Contenu** : score obtenu, message de félicitations, aperçu du certificat PDF nominatif, bouton « Télécharger le certificat ».
- **Navigation** : → Espace personnel (le certificat y reste accessible).

### 5.12 Espace personnel (Profil)
- **Objectif** : vue d'ensemble de l'activité utilisateur.
- **Contenu** : informations de base (nom, ville, langue), historique des modules suivis/complétés, liste des favoris, statut d'abonnement + date d'échéance, liste des certificats obtenus.
- **Navigation** : → Passer premium (si gratuit), → Détail module (depuis historique/favoris).

### 5.13 Passer premium
- **Objectif** : conversion freemium → premium.
- **Contenu** : présentation de l'offre (contenu débloqué), prix mensuel, bouton « S'abonner ».
- **Navigation** : → Paiement mobile money.

### 5.14 Paiement mobile money
- **Objectif** : redirection sécurisée vers la passerelle de paiement.
- **Contenu** : récapitulatif de l'offre et du montant, choix de l'opérateur mobile money, bouton « Payer ».
- **États** : en attente de confirmation, échec de paiement (message clair + bouton réessayer).
- **Navigation** : → Confirmation de paiement.

### 5.15 Confirmation de paiement
- **Objectif** : confirmer l'activation du statut premium.
- **Contenu** : message de succès, récapitulatif de la transaction, bouton « Accéder à mes modules premium ».
- **Navigation** : → Tableau de bord apprenant.

### 5.16 Connexion admin
- **Objectif** : accès restreint au back-office.
- **Contenu** : formulaire de connexion dédié (rôle Admin).

### 5.17 Tableau de bord admin
- **Objectif** : pilotage des indicateurs clés.
- **Contenu** : cartes indicateurs (inscriptions cumulées, nouvelles inscriptions/semaine, taux de complétion moyen, taux de conversion gratuit→premium, chiffre d'affaires cumulé, NPS), graphique d'évolution simple.
- **Navigation** : → Gestion des modules, → Gestion des utilisateurs, → Export des paiements.

### 5.18 Gestion des modules (liste)
- **Objectif** : vue d'ensemble des contenus.
- **Contenu** : tableau des modules (titre, statut brouillon/publié, niveau gratuit/premium), bouton « Créer un module », actions publier/dépublier par ligne.
- **Navigation** : → Créer/éditer un module.

### 5.19 Créer / éditer un module
- **Objectif** : CRUD complet d'un module.
- **Contenu** : champ titre, description, upload vidéo, upload support texte, éditeur de quiz associé (questions + score minimal configurable), sélecteur gratuit/premium, bouton « Publier » / « Enregistrer en brouillon ».

### 5.20 Gestion des utilisateurs
- **Objectif** : support et modération.
- **Contenu** : recherche/filtre utilisateurs, fiche utilisateur (statut, historique), action « Bloquer » en cas d'abus.

### 5.21 Export des paiements
- **Objectif** : rapprochement comptable.
- **Contenu** : tableau des paiements (utilisateur, montant, statut, date, référence passerelle), bouton « Exporter en CSV », filtre par période.

## 6. Design system officiel (charte transmise par le maître d'ouvrage)

Cette charte fait foi et remplace toute palette générique. Elle est extraite d'une page d'accueil déjà produite pour Philowona.com — à répliquer à l'identique sur l'ensemble des écrans de la maquette.

### 6.1 Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--black` | `#141414` | Fond principal des sections sombres (nav, hero) |
| `--black-2` | `#1b1b1a` | Fond sombre secondaire (variation de surface) |
| `--gold` | `#B8975A` | Couleur de marque, accents |
| `--gold-dark` | `#8A6D3A` | Bordures, états par défaut sur fond sombre |
| `--gold-light` | `#D9C39C` | Hover, texte de mise en valeur sur fond sombre |
| `--cream` | `#F6F1E7` | Fond principal des sections claires, texte sur fond noir |
| `--cream-2` | `#EEE5D2` | Fond clair secondaire |
| `--ink-on-cream` | `#211C13` | Texte principal sur fond crème |
| `--muted-on-cream` | `#6E6353` | Texte secondaire sur fond crème |
| `--muted-on-black` | `#B7AB92` | Texte secondaire sur fond noir |
| `--line-on-black` | `rgba(184,151,90,0.35)` | Séparateurs sur fond noir |
| `--line-on-cream` | `rgba(138,109,58,0.28)` | Séparateurs sur fond crème |

### 6.2 Typographie

| Rôle | Police | Détail |
|---|---|---|
| Titres (serif) | Playfair Display | Graisses 600/700, utilisée pour logo et gros titres (h1 ~44px, line-height 1.2) |
| Voix / accent éditorial | Cormorant Garamond | Italique, pour citations ou accroches secondaires |
| Texte courant (sans-serif) | Montserrat | Graisses 400/500/600, corps de texte, navigation, boutons |

Charger via Google Fonts : `Playfair+Display:wght@600;700`, `Cormorant+Garamond:ital@1`, `Montserrat:wght@400;500;600`.

### 6.3 Navigation (pattern fourni)

- Header fixe en haut, fond noir semi-transparent (`rgba(20,20,20,0.92)`) avec flou d'arrière-plan (backdrop-blur), bordure basse fine dorée (`--line-on-black`).
- Logo à gauche en Playfair Display, gras, couleur crème.
- Liens de navigation à droite en Montserrat, couleur `--muted-on-black`, passage en `--gold-light` au survol.
- Bouton CTA de nav : fond transparent, bordure `--gold-dark`, texte `--gold-light`, coins légèrement arrondis (3px) ; au survol, bordure et texte s'éclaircissent (blanc).
- Mobile (< 760px) : liens masqués derrière un bouton hamburger, menu déroulant plein écran en fond noir, liens empilés avec séparateurs dorés fins.

### 6.4 Hero / sections d'ouverture (pattern fourni)

- Fond noir, texte crème, padding généreux (approx. 168px en haut / 96px en bas sur desktop).
- Contenu centré, largeur max ~720px.
- Titre principal en Playfair Display, gras, ~44px, line-height serré (1.2).
- Ce pattern (fond noir + texte crème + titre serif centré) sert de référence pour tout écran d'ouverture/splash (ex. Accueil publique) ; les écrans applicatifs (dashboard, catalogue, formulaires) basculent sur fond crème avec texte `--ink-on-cream` pour rester lisibles en usage prolongé.

⚠ Cette charte provient d'un fichier HTML transmis par le maître d'ouvrage, dont seule la partie nav + hero a été communiquée jusqu'ici. Les sections suivantes (features, catalogue, footer, formulaires) n'ont pas encore de style officiel fourni — appliquer la même logique de tokens (noir/or/crème, Playfair + Montserrat) par cohérence, à faire valider par le maître d'ouvrage avant mise en maquette finale.

### 6.5 Composants transverses à définir dans le design system

- Barre de navigation mobile (bottom nav applicative) : Accueil, Catalogue, Profil (+ badge premium si applicable) — fond crème, icône active en `--gold`
- Carte module (variantes : gratuit, premium verrouillé, en cours, complété) — fond `--cream-2`, bordure `--line-on-cream`
- Bouton primaire (fond `--gold`, texte `--black`) / secondaire (bordure `--gold-dark`, texte `--ink-on-cream`) / CTA premium (accent `--gold`)
- Champ de saisie avec état d'erreur (bordure rouge discrète, message en dessous)
- Bandeau de consentement RGPD (bannière basse, fond `--black`, texte `--cream`, une seule fois)
- Skeleton loader (carte, liste, lecteur vidéo) en tons `--cream-2` / `--line-on-cream`
- Toast de confirmation/erreur (paiement, OTP, sauvegarde admin)

## 7. Contraintes techniques à respecter visuellement

- Temps de chargement perçu cible < 3 secondes → toujours prévoir un état de chargement, jamais d'écran blanc.
- Hébergement UE / RGPD → bandeau de consentement obligatoire avant tout tracking, mention claire lors de l'inscription.
- Aucune donnée de paiement sensible affichée ou saisie directement dans l'interface Philowona (tout passe par la redirection vers la passerelle mobile money).
- Prévoir dans le modèle d'écran « Profil » un emplacement extensible pour de futurs profils TPE/Partenaire (Piliers 2/3), sans le développer au MVP.

## 8. Instructions d'usage pour Figma Make

Générer la maquette dans cet ordre pour garder la cohérence des composants d'un écran à l'autre :
1. Design system officiel (couleurs, typographie, nav, hero, boutons, cartes) — section 6
2. Parcours public + onboarding (5.1 à 5.5)
3. Parcours apprenant (5.6 à 5.15)
4. Back-office admin (5.16 à 5.21)

Prompt de démarrage suggéré : « Crée une maquette mobile-first PWA pour Philowona.com, plateforme d'éducation financière patrimoniale, en suivant les écrans décrits dans ce document. Charte graphique : fond noir (#141414) et crème (#F6F1E7) en alternance selon les écrans, accent or (#B8975A, dégradé #8A6D3A à #D9C39C), typographie Playfair Display pour les titres, Cormorant Garamond en italique pour les accroches éditoriales, Montserrat pour le texte courant et l'UI. Ton patrimonial, sobre et haut de gamme, jamais criard. Navigation fixe en haut style bandeau noir semi-transparent avec liseré or. »