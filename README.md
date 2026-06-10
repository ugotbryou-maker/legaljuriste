# Légal Juriste — Mini-site vitrine

Site statique (HTML/CSS/JS, zéro build) pour **Légal Juriste**, nom commercial de **JURID FRANCE** (SAS), service de mise en relation directe avec une avocate et une juriste spécialisées en droit des étrangers, pour l'accompagnement de démarches en préfecture.

## Structure du projet

```
legal-juriste/
├── index.html                     # Page d'accueil
├── mentions-legales.html          # Mentions légales (LCEN)
├── politique-confidentialite.html # Politique de confidentialité (RGPD)
├── css/
│   └── style.css
├── js/
│   └── main.js                    # Nav mobile, accordéon FAQ, reveal au scroll, bannière cookies
├── assets/
│   ├── favicon.svg
│   ├── logo-icon.svg              # Monogramme L/J
│   ├── logo-full.svg              # Logo horizontal (fond clair)
│   └── logo-full-light.svg        # Logo horizontal (fond foncé / footer)
└── README.md
```

## Aperçu local

Aucune dépendance, aucun build. Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur local :

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## ⚠️ Checklist avant mise en ligne

Le site contient des **placeholders** (texte surligné en rouge, balise `<span class="placeholder">`) à remplacer impérativement avant toute campagne publicitaire.

### 1. Coordonnées
- [ ] **Téléphone** : remplacer toutes les occurrences de `[TÉLÉPHONE]` et `tel:+33184XXXXXX` (header, hero, section contact, footer, mentions légales, politique de confidentialité — présent dans les 3 pages) par le numéro réel du cabinet.
- [ ] **Email** : vérifier que `contact@legaljuriste.fr` est une adresse fonctionnelle et surveillée, ou la remplacer par l'adresse réelle.
- [ ] **Adresse** : confirmer que "58 Rue de Monceau, 75008 Paris" est bien l'adresse à afficher publiquement (siège social JURID FRANCE selon Pappers).

### 2. Mentions légales (`mentions-legales.html`)
- [ ] **Capital social** : remplacer `[CAPITAL SOCIAL] €` par le montant réel du capital social de JURID FRANCE.
- [ ] **Directeur de la publication** : confirmer le nom (actuellement indiqué comme "Bouabdellah Dgena — Président de JURID FRANCE, à confirmer") et mettre à jour si nécessaire.
- [ ] **Hébergement** : compléter la section "Hébergement" avec le nom, l'adresse et le contact de l'hébergeur réel (actuellement placeholder, exemple Vercel Inc. fourni à titre indicatif).
- [ ] **Médiation de la consommation** : compléter les coordonnées du médiateur de la consommation choisi (nom, adresse postale, site web).

### 3. Politique de confidentialité (`politique-confidentialite.html`)
- [ ] **Durée de conservation des données du formulaire** : confirmer la durée indiquée (`[3 ans — à confirmer]`) avec un conseil juridique si besoin.
- [ ] Vérifier la cohérence des sections "Cookies & traceurs" et "Transferts hors UE" avec les outils effectivement installés (voir point 5).

### 4. Formulaire de contact (`index.html`, section `#contact`)
- [ ] Le formulaire pointe vers `https://formspree.io/f/REMPLACER_PAR_VOTRE_ID`. Créer un compte sur [Formspree](https://formspree.io) (ou utiliser Netlify Forms si hébergement sur Netlify) et remplacer l'ID par l'identifiant réel du formulaire.
- [ ] Tester l'envoi du formulaire en production avant de lancer les campagnes.

### 5. Suivi publicitaire (Google Ads / Meta Ads / GA4)
- [ ] Si des campagnes Google Ads / Meta Ads / Google Analytics sont mises en place, ajouter les scripts de suivi correspondants dans `index.html` (et idéalement les autres pages), **conditionnés au consentement cookies**.
- [ ] Dans `js/main.js`, les événements `cookies:accepted` / `cookies:refused` sont déjà déclenchés (voir fonction `applyConsent`) — y brancher le chargement conditionnel des scripts tiers (gtag.js, Meta Pixel, etc.) :
  ```js
  document.addEventListener('cookies:accepted', function () {
    // Charger ici Google Ads / Meta Pixel / GA4
  });
  ```
- [ ] Mettre à jour la section "Cookies & traceurs" de la politique de confidentialité avec la liste exacte des cookies déposés par ces outils.

### 6. SEO / déploiement
- [ ] Le domaine prévu est `legaljuriste.fr` (`https://www.legaljuriste.fr/...`) — les balises `canonical`, Open Graph et le JSON-LD utilisent déjà cette URL. Adapter si le domaine final diffère.
- [ ] Déployer sur [Vercel](https://vercel.com) ou [Netlify](https://netlify.com) :
  - **Vercel** : `npx vercel` depuis ce dossier, puis configurer le domaine `legaljuriste.fr` dans les paramètres du projet.
  - **Netlify** : glisser-déposer le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop), ou `npx netlify deploy`, puis configurer le domaine personnalisé.
- [ ] Une fois l'hébergeur choisi, mettre à jour la section "Hébergement" des mentions légales (point 2).
- [ ] Vérifier l'image Open Graph (`og:image`) si une image de partage dédiée est souhaitée.

### 7. Vérifications finales
- [ ] Rendu desktop + mobile (375px) sur les 3 pages, menu burger, accordéon FAQ, bannière cookies.
- [ ] Liens entre les 3 pages (header, footer, FAQ, CTA) fonctionnels.
- [ ] Aucun `[placeholder]` visible restant sur le site en production.

## Charte graphique

- **Bleu marine** `#1B2168` / **Rouge** `#C0392B` (issus du logo)
- Typographies : **Playfair Display** (titres) + **Inter** (texte courant), via Google Fonts
- Logos disponibles en SVG dans `assets/` (versions claire et foncée)
