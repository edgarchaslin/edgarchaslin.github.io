# Site web — Edgar Chaslin

Le site est écrit en HTML/CSS/JavaScript simples. **Aucune installation,
aucun outil à lancer** : on modifie un fichier texte, on enregistre, on
recharge la page dans le navigateur.

Pour voir le site : double-cliquer sur **`index.html`**.

---

## En un coup d'œil

| Dossier | Ce qu'il contient | Faut-il y toucher ? |
|---|---|---|
| **`contenu/`** | Tout le texte du site : publications, expériences, cours, prix… | **Oui — c'est ici qu'on travaille** |
| `images/` | Les photos et figures, en pleine résolution | Oui, pour changer une image |
| `images/opt/` | Les versions allégées, fabriquées automatiquement | **Non** |
| `documents/` | Le PDF de la thèse | Oui, une fois |
| `index.html` | Le squelette de la page | Rarement (titre Google) |
| `css/` | L'apparence : couleurs, tailles, marges | Seulement pour changer le style |
| `js/` | La machinerie qui construit la page | **Non** |
| `outils/` | Le script qui allège les images | Non — on le *lance*, on ne l'ouvre pas |
| `_ancienne-version/` | L'ancien fichier unique, gardé au cas où | Non |

---

## Mettre le site à jour

Tout se passe dans le dossier **`contenu/`**. Il contient onze fichiers,
un par section du site, numérotés dans l'ordre où les sections
apparaissent :

| Fichier | Ce qu'on y modifie |
|---|---|
| `1-identite.js` | Nom, poste, laboratoire, accroche, e-mail, adresse, liens (Scholar, ORCID…), réglages du CV, date de mise à jour |
| `2-titres.js` | Nom des onglets et grand titre de chaque section |
| `3-a-propos.js` | Paragraphes de présentation et les quatre compteurs |
| `4-recherche.js` | Les projets de recherche mis en avant |
| `5-these.js` | Résumé de la thèse, mots-clés, sommaire de la liseuse |
| `6-galerie.js` | Les images et leurs légendes |
| `7-parcours.js` | Expériences professionnelles et diplômes |
| `8-publications.js` | Articles et communications |
| `9-distinctions.js` | Prix |
| `10-enseignement.js` | Cours donnés et étudiants encadrés |
| `11-competences.js` | Instruments et méthodes |

**La méthode, toujours la même :**

1. ouvrir le fichier avec un éditeur de texte (le Bloc-notes suffit) ;
2. repérer une entrée qui ressemble à celle qu'on veut créer ;
3. la copier entièrement, de l'accolade `{` à l'accolade `}` ;
4. la coller juste en dessous et remplacer les textes ;
5. enregistrer, puis recharger la page (`Ctrl` + `F5`).

**Les quatre règles à respecter :**

- garder les guillemets `" "` autour de chaque texte ;
- garder la **virgule** entre deux blocs `{ … }` ;
- le **dernier** bloc d'une liste ne prend pas de virgule ;
- ne pas toucher aux mots situés à **gauche** des deux-points
  (`titre:`, `annee:`, `doi:`…) : ce sont les étiquettes que le site
  reconnaît. Seul ce qui est à droite se modifie.

### Exemple : ajouter une publication

Dans `contenu/8-publications.js`, coller un bloc de plus dans la liste :

```js
  { type:"journal", annee:"2026",
    auteurs:"E. Chaslin, ...",
    titre:"Le titre de l'article",
    source:"Nom de la revue 42", doi:"10.1016/j.exemple.2026.123456" },
```

- `type` vaut `"journal"`, `"international"`, `"national"` ou `"invited"` ;
- `format` (`"Oral"`, `"Poster"`, `"Invited"`) ne sert qu'aux conférences ;
- `doi` s'écrit **sans** `https://doi.org/` devant, et peut être omis.

Le classement par catégorie puis par année se fait tout seul : le bloc
peut être collé n'importe où dans la liste. Les compteurs des onglets et
le total affiché dans le titre de la section se recalculent aussi.

### Si la page devient blanche

C'est presque toujours une **virgule oubliée** ou un **guillemet en
trop**, dans le fichier modifié en dernier. Deux réflexes :

1. relire la ligne modifiée en la comparant à celle du dessus ;
2. appuyer sur `F12` dans le navigateur, onglet *Console* : le message
   d'erreur indique le fichier et le numéro de ligne fautifs.

---

## Changer une image

Le plus simple : **remplacer le fichier dans `images/` en gardant
exactement le même nom**, puis relancer le script d'allègement (voir
plus bas). Il n'y a rien d'autre à faire.

| Fichier | Usage |
|---|---|
| `portrait-vertical.jpg` | Grande photo de la colonne de gauche (format 3:4) |
| `portrait-carre.jpg` | Photo d'identité du CV généré (format 1:1) |
| `tem.jpg`, `antenna.jpg`, `ceo2-growth.jpg`, `dme.jpg` | Figures affichées aujourd'hui |
| `xrd.jpg`, `rsm.jpg`, `afm.jpg` | Présentes dans le dossier, **pas encore utilisées** |

Pour **ajouter** une image : la déposer dans `images/`, puis ajouter un
bloc dans `contenu/6-galerie.js` avec une `cle` encore inutilisée.
Cette `cle` permet ensuite d'associer l'image à un projet dans
`contenu/4-recherche.js`.

Le réglage `cadrage:"contain"` affiche l'image **entière** — utile pour
un graphe, dont on ne veut pas rogner les axes. Sans ce réglage, l'image
est recadrée pour remplir le cadre, ce qui convient aux photos.

### Alléger les images — à faire après chaque ajout

Les fichiers d'`images/` sont les **originaux** : `antenna.jpg` fait
8000 px de large et 2,8 Mo. Les envoyer tels quels à un visiteur qui
regarde une vignette de 300 px serait absurde — et sur le wifi d'un
centre de conférence, la page ne s'afficherait pas.

Une seule commande règle la question :

```bash
python outils/optimiser-images.py
```

Le script ne touche **jamais** aux originaux. Il fabrique à côté, dans
`images/opt/`, trois largeurs de chaque image au format WebP, puis note
ce qu'il a produit dans `contenu/12-images-optimisees.js`. Le site lit
cette note et laisse ensuite le navigateur choisir tout seul la taille
utile : 640 px pour une vignette, 2400 px quand on ouvre la visionneuse.

Résultat sur la page d'accueil : **environ 4,9 Mo d'images ramenés à
160 Ko**, sans perte visible.

Le script a besoin d'être installé une seule fois :

```bash
python -m pip install --user pillow
```

**Oublier de le relancer ne casse rien.** Une image absente de la liste
est simplement servie en pleine résolution, comme avant.

### La visionneuse plein écran

Un clic — ou la touche `Entrée` — sur n'importe quelle figure ouvre la
galerie en grand. On y circule sans en ressortir :

| Geste | Effet |
|---|---|
| `←` `→`, flèches à l'écran, balayage du doigt | image précédente / suivante |
| clic, molette, `+` `−` | zoomer (jusqu'à 6×) |
| glisser | se déplacer dans l'image zoomée |
| `0` | revenir à l'image entière |
| `Échap` | fermer |

### Afficher une échelle sur une micrographie

Une micrographie sans échelle est une jolie image ; avec échelle, c'est
une donnée. Pour en ajouter une, compléter le bloc de l'image dans
`contenu/6-galerie.js` :

```js
  echelle: { texte:"5 nm", part:0.18 },
```

`part` est la fraction de la **largeur totale** de l'image que couvre
cette distance. Pour la mesurer une bonne fois : ouvrir l'image dans
ImageJ ou Gwyddion, relever la largeur totale en pixels (L) et la
longueur en pixels correspondant à la distance choisie (l), puis écrire
`part = l / L`. La barre s'allonge ensuite toute seule quand on zoome.

Sans ce réglage, aucune échelle ne s'affiche — le site n'en invente
jamais.

---

## Le PDF de la thèse

Déposer le manuscrit dans `documents/` sous le nom indiqué à la ligne
`fichier` de `contenu/5-these.js`, aujourd'hui
`These-Edgar-Chaslin.pdf`.

Tant que le fichier n'est pas là, la section *Thesis* reste visible mais
affiche un message d'attente : le visiteur ne voit aucune erreur.

Les numéros de page du sommaire (`chapitres`) sont ceux du PDF : ce sont
eux qui font sauter la liseuse au bon endroit. Ils sont à vérifier une
fois le vrai manuscrit déposé.

---

## Le CV

**Il n'y a aucun fichier de CV à téléverser.** Le bouton *Download CV*
fabrique une feuille A4 à la volée à partir de tout ce qui est écrit sur
le site : il est donc toujours à jour. Le visiteur l'enregistre en PDF
avec le bouton *Save as PDF*.

Trois champs de `contenu/7-parcours.js` n'apparaissent **que** dans le
CV, jamais sur la page : `contexte`, `realisations` et `acquis`. C'est ce
qui permet au CV d'être détaillé sans alourdir le site.

Les réglages du CV (téléphone, nationalité, langues, référents) sont
regroupés à la fin de `contenu/1-identite.js`. Attention : le CV est
téléchargeable par n'importe qui — l'option `montrerEmails: false` publie
les référents sans leurs adresses.

---

## La colonne de gauche

Sur ordinateur, elle a **deux états**.

À l'arrivée, la photo occupe toute la hauteur de l'écran : c'est la
première impression, elle est intacte.

Dès que le défilement commence — après 90 px — elle se replie à un peu
plus de la moitié et découvre une **carte** restée jusque-là hors champ.
Le visiteur garde ainsi l'essentiel sous les yeux d'un bout à l'autre du
site, au lieu de devoir redescendre jusqu'à la section *Contact*. On y
trouve, de haut en bas :

- l'**e-mail** cliquable et l'**adresse postale** ;
- **« Currently »** : le projet en cours et les deux articles les plus
  récents, avec leur lien DOI ;
- un **repère de lecture** : section en cours, rang (`6 / 11`) et jauge
  d'avancement dans la page.

Rien de tout cela ne se saisit deux fois. L'e-mail et l'adresse viennent
de `1-identite.js` ; le projet est celui marqué `statut:"Current"` dans
`4-recherche.js` ; les articles sont les deux premiers de
`8-publications.js` une fois triés par année décroissante.

**Pour mettre un autre article en avant**, il suffit de le remonter dans
`contenu/8-publications.js` : à année égale, l'ordre du fichier est
respecté. C'est utile, car le tri par date seule fait parfois remonter
un article où tu n'es pas premier auteur.

Les titres sont volontairement bornés à deux lignes, avec des points de
suspension au-delà : sans cela, un titre de projet plus long saisi dans
six mois ferait déborder la carte.

Pour laisser la place, deux lignes du bloc titre s'effacent au repli :
l'accroche en italique, qui a joué son rôle à l'arrivée, et le nom du
laboratoire, qui se relit juste en dessous dans l'adresse.

Sur téléphone, rien de tout cela : la colonne redevient une simple
bannière que l'on quitte en défilant, et la carte n'apparaît pas.

**Ce qui se règle, dans `css/2-colonne-portrait.css`, tout en haut :**

```css
--photo-haut     : hauteur de la photo une fois repliée
--repli          : durée du mouvement
--photo-y        : cadrage vertical à l'arrivée
--photo-y-replie : cadrage vertical une fois repliée   ← le réglage utile
--photo-y-mobile : cadrage vertical sur téléphone
```

Le `max(52vh, 336px)` de `--photo-haut` n'est pas décoratif : le bloc
titre est posé au bas de la photo, et sans ce plancher en pixels il
déborderait par le haut — nom rogné — sur un écran d'ordinateur
portable peu haut.

### Recadrer la photo repliée

Le cadre replié est large et court, alors que la photo est en hauteur :
il faut donc choisir **quelle tranche de la photo reste visible**. C'est
le rôle de `--photo-y-replie` : `0%` garde le haut de l'image, `50%` le
milieu, `100%` le bas. Le cadrage glisse pendant le repli, en même temps
que la hauteur.

Avec le portrait actuel (700 × 933) sur un écran 16/9, voici ce que
chaque valeur laisse voir — mesuré, pas estimé :

| `--photo-y-replie` | Tranche visible de la photo |
|---|---|
| `0%` | du haut jusqu'à 55 % |
| `10%` | 5 % → 59 % |
| **`24%`** *(actuel)* | **11 % → 66 %** |
| `30%` | 14 % → 68 % |
| `40%` | 18 % → 73 % |
| `50%` | 23 % → 77 % |
| `65%` | 29 % → 84 % |
| `100%` | 45 % → jusqu'en bas |

Pour **remonter** le cadrage — montrer davantage le haut du portrait —
il faut **diminuer** la valeur. Pour descendre, l'augmenter.

**À savoir avant de toucher aux deux autres.** Sur un écran 16/9, la
colonne fait 40 % de la largeur pour 100 % de la hauteur : à l'arrivée,
le cadre est donc plus étroit que la photo, qui est rognée sur les
**côtés** et pas du tout en hauteur. Même chose sur la bannière du
téléphone. Modifier `--photo-y` ou `--photo-y-mobile` n'y changera donc
rien de visible — seule la photo repliée est réellement recadrée en
hauteur.

Les deux seuils de défilement (repli à 90 px, dépli à 30 px) sont dans
`js/2-outils.js`, en tête de `activerColonne`. Ils sont volontairement
différents : avec un seuil unique, la colonne se remettrait à clignoter
dès qu'un doigt hésite autour de la valeur limite.

Les trois petits titres de la carte — « Get in touch », « Currently »,
« Latest articles » — se changent dans `contenu/2-titres.js`, lignes
`carte`, `actu` et `dernieres`.

**Le bloc « Currently » s'allège par paliers** quand la hauteur de la
fenêtre manque, plutôt que de déborder. Les seuils sont en bas de
`css/2-colonne-portrait.css` :

| Hauteur de fenêtre | Ce qui reste affiché |
|---|---|
| plus de 1010 px | projet + mots-clés + **2 articles** |
| 901 – 1010 px | projet + mots-clés + **1 article** |
| 731 – 900 px | projet + mots-clés |
| 661 – 730 px | projet seul |
| 660 px et moins | rien — mieux vaut le vide qu'un texte coupé |

---

## Changer les couleurs ou la mise en page

Tout part de `css/1-base.css`, au tout début :

```css
--paper : le fond, beige clair
--ink   : le texte
--moss  : le vert d'accent (liens actifs, pastilles, titres du CV)
--sage  : le vert clair derrière le portrait
--warm  : le gris-brun des petites légendes
```

Changer une seule de ces valeurs suffit à changer le site entier.

Les six autres feuilles de style suivent l'ordre de la page :
`2-colonne-portrait`, `3-contenu` (barre d'onglets et titres),
`4-sections` (tout le corps du site), `5-these-et-images`,
`6-cv-genere` et `7-impression`.

---

## Mettre le site en ligne

Le site est entièrement statique : il suffit de copier le contenu du
dossier sur un hébergeur (GitHub Pages, Netlify, l'espace web du
laboratoire…). Le fichier d'accueil doit s'appeler `index.html`, ce qui
est déjà le cas. Seuls `index.html` et les dossiers `contenu`, `css`,
`js`, `images` (avec son sous-dossier `opt`) et `documents` sont
nécessaires : `outils`, `_ancienne-version` et ce fichier-ci peuvent
rester sur l'ordinateur.

**Penser à lancer `python outils/optimiser-images.py` avant de mettre en
ligne**, sinon `images/opt/` sera absent et les visiteurs recevront les
images en pleine résolution.

Deux choses à faire une fois le domaine connu, dans `index.html` :

- vérifier le `<title>` et la `<meta name="description">`, qui sont le
  titre et le texte affichés par Google ;
- pour soigner l'aperçu lors d'un partage sur les réseaux, déposer une
  image de 1200 × 630 px dans `images/apercu.jpg` et décommenter la
  ligne `og:image` en y mettant le vrai domaine.

---

## Ordre de chargement des fichiers

Utile seulement si un nouveau fichier de contenu est ajouté. Un fichier
supplémentaire doit être déclaré à **deux** endroits :

1. dans `index.html`, une ligne `<script src="contenu/…"></script>` de
   plus, à la suite des autres ;
2. dans `js/1-assemblage.js`, une ligne de plus dans la liste, qui relie
   le nom de la liste au nom utilisé par le site.

Le reste de `js/` n'a alors pas à être touché.

Un cas à part : `contenu/12-images-optimisees.js` est le seul fichier du
dossier `contenu` qui ne s'écrit **pas** à la main. Il est refabriqué à
chaque passage de `outils/optimiser-images.py`. Toute retouche manuelle
y serait effacée au passage suivant.
