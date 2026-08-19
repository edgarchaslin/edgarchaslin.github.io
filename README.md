# Site personnel — Edgar Chaslin

**→ [edgarchaslin.github.io](https://edgarchaslin.github.io/)**

Page de présentation et CV d'un chercheur post-doctorant au CEA SPEC
(Université Paris-Saclay) : croissance épitaxiale et caractérisation de
couches minces d'oxydes ferroélectriques.

Le site rassemble les travaux de recherche, la thèse consultable en ligne
avec son sommaire cliquable, les publications et communications, les
enseignements et l'encadrement d'étudiants. Le CV téléchargeable n'est pas
un fichier déposé : il est **fabriqué à la volée depuis le contenu de la
page**, et reste donc toujours à jour.

## Comment c'est fait

HTML, CSS et JavaScript, sans aucun outil de compilation, sans dépendance
et sans étape de publication : ouvrir `index.html` suffit à voir le site,
et déposer le dossier sur un hébergeur suffit à le mettre en ligne.

| Dossier | Contenu |
|---|---|
| `contenu/` | Tout le texte du site, un fichier par section |
| `css/` | Sept feuilles de style, de la base aux réglages d'impression |
| `js/` | La machinerie qui construit la page |
| `images/` | Les figures, avec leurs versions allégées dans `images/opt` |
| `documents/` | Le manuscrit de thèse |
| `outils/` | Le script de génération des images allégées |

Le parti pris est de séparer strictement le **contenu** de la
**machinerie** : mettre le site à jour ne demande que d'éditer un fichier
texte du dossier `contenu/`, sans toucher à une ligne de programme.

## Mettre le site à jour

Tout est expliqué dans **[LISEZ-MOI.md](LISEZ-MOI.md)** : où modifier quoi,
comment ajouter une publication ou une image, et quoi faire si la page
devient blanche.

```bash
git add -A && git commit -m "Mise à jour du contenu" && git push
```

GitHub Pages republie le site automatiquement dans la minute qui suit.

## Licence

Le code est réutilisable librement. En revanche le contenu — textes,
photographies, figures scientifiques et manuscrit de thèse — reste la
propriété de son auteur et n'est pas réutilisable sans accord.
