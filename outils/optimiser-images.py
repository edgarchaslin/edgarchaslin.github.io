# -*- coding: utf-8 -*-
"""
======================================================================
OPTIMISATION DES IMAGES — à relancer après avoir ajouté une image

Ce script ne modifie JAMAIS les fichiers d'origine du dossier
« images » : ce sont les masters, ils restent à pleine résolution.
Il fabrique à côté, dans « images/opt », des versions allégées à
plusieurs largeurs, puis écrit la liste de ce qu'il a produit dans
« contenu/12-images-optimisees.js ».

Le site lit cette liste : une image qui y figure est servie en WebP à
la bonne taille ; une image absente de la liste est servie telle quelle.
Oublier de relancer le script ne casse donc rien — le site est
simplement un peu plus lourd.

UTILISATION
    python outils/optimiser-images.py

PRÉ-REQUIS (une seule fois)
    python -m pip install --user pillow
======================================================================
"""

import os, glob, sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow n'est pas installé.  Lancer :  python -m pip install --user pillow")

RACINE  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE  = os.path.join(RACINE, "images")
SORTIE  = os.path.join(SOURCE, "opt")
LISTE   = os.path.join(RACINE, "contenu", "12-images-optimisees.js")

# Largeurs produites, en pixels.
#   640  : les vignettes de la page (affichées ~300 px, doublées pour
#          les écrans à haute densité)
#   1280 : la même image sur un grand écran, et le repli JPEG
#   2400 : la version chargée par la visionneuse plein écran, assez
#          fine pour supporter le zoom
LARGEURS      = [640, 1280, 2400]
QUALITE_WEBP  = 80
QUALITE_JPEG  = 82
REPLI_JPEG    = 1280      # largeur du fichier de secours (navigateurs sans WebP)


def redimensionner(im, largeur):
    if im.width <= largeur:
        return im.copy()
    hauteur = round(im.height * largeur / im.width)
    return im.resize((largeur, hauteur), Image.LANCZOS)


def traiter(chemin):
    nom = os.path.splitext(os.path.basename(chemin))[0]
    im  = Image.open(chemin)
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")

    # On ne fabrique jamais une version plus grande que l'original :
    # agrandir une image n'ajoute aucun détail, seulement du poids.
    largeurs = sorted({min(l, im.width) for l in LARGEURS})

    produits = []
    for l in largeurs:
        petite = redimensionner(im, l)
        sortie = os.path.join(SORTIE, "%s-%d.webp" % (nom, l))
        # save() sans argument « exif » écrit un fichier nu : les
        # métadonnées de l'appareil, dont la position GPS, disparaissent.
        petite.save(sortie, "WEBP", quality=QUALITE_WEBP, method=6)
        produits.append((l, os.path.getsize(sortie)))

    # Fichier de secours, servi aux rares navigateurs sans WebP.
    l_repli = min(REPLI_JPEG, im.width)
    redimensionner(im, l_repli).save(
        os.path.join(SORTIE, "%s-%d.jpg" % (nom, l_repli)),
        "JPEG", quality=QUALITE_JPEG, optimize=True, progressive=True)

    return {
        "cle":      "images/%s" % os.path.basename(chemin),
        "nom":      nom,
        "l":        im.width,
        "h":        im.height,
        "largeurs": [l for l, _ in produits],
        "repli":    l_repli,
        "avant":    os.path.getsize(chemin),
        "apres":    dict(produits),
    }


def ecrire_liste(entrees):
    lignes = []
    for e in entrees:
        lignes.append(
            '  "%s": { l:%d, h:%d, base:"images/opt/%s", '
            'w:[%s], jpg:%d },'
            % (e["cle"], e["l"], e["h"], e["nom"],
               ",".join(str(x) for x in e["largeurs"]), e["repli"]))

    with open(LISTE, "w", encoding="utf-8", newline="\n") as f:
        f.write("""/* ======================================================================
   FICHIER 12 — VERSIONS ALLÉGÉES DES IMAGES

   ⚠ CE FICHIER EST ÉCRIT AUTOMATIQUEMENT — ne pas le modifier à la main.
   Il est refabriqué par :  python outils/optimiser-images.py

   Il dit simplement au site quelles versions allégées existent dans
   « images/opt » pour chaque image. Une image absente de cette liste
   s'affiche quand même : le site sert alors le fichier d'origine.
   ====================================================================== */

const IMAGES_OPT = {
%s
};
""" % "\n".join(lignes))


def main():
    os.makedirs(SORTIE, exist_ok=True)
    fichiers = sorted(
        f for motif in ("*.jpg", "*.jpeg", "*.png")
        for f in glob.glob(os.path.join(SOURCE, motif)))

    if not fichiers:
        sys.exit("Aucune image trouvée dans « images ».")

    entrees, avant, apres = [], 0, 0
    for chemin in fichiers:
        e = traiter(chemin)
        entrees.append(e)
        # Poids réellement téléchargé par un visiteur : la vignette sur
        # la page, puis la grande version s'il ouvre la visionneuse.
        vignette = e["apres"][e["largeurs"][0]]
        pleine   = e["apres"][e["largeurs"][-1]]
        avant += e["avant"]
        apres += vignette
        print("  %-26s %5d Ko  ->  %4d Ko (vignette) / %4d Ko (plein écran)"
              % (os.path.basename(chemin), e["avant"] / 1024,
                 vignette / 1024, pleine / 1024))

    ecrire_liste(entrees)
    print("\n  %d images traitées." % len(entrees))
    print("  Page d'accueil : %d Ko d'images  ->  %d Ko  (-%d %%)"
          % (avant / 1024, apres / 1024, 100 - 100 * apres / avant))
    print("  Liste écrite dans contenu/12-images-optimisees.js")


if __name__ == "__main__":
    main()
