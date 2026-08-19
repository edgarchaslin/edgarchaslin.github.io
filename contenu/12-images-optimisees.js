/* ======================================================================
   FICHIER 12 — VERSIONS ALLÉGÉES DES IMAGES

   ⚠ CE FICHIER EST ÉCRIT AUTOMATIQUEMENT — ne pas le modifier à la main.
   Il est refabriqué par :  python outils/optimiser-images.py

   Il dit simplement au site quelles versions allégées existent dans
   « images/opt » pour chaque image. Une image absente de cette liste
   s'affiche quand même : le site sert alors le fichier d'origine.
   ====================================================================== */

const IMAGES_OPT = {
  "images/afm.jpg": { l:520, h:520, base:"images/opt/afm", w:[520], jpg:520 },
  "images/antenna.jpg": { l:8000, h:5200, base:"images/opt/antenna", w:[640,1280,2400], jpg:1280 },
  "images/ceo2-growth.jpg": { l:2076, h:1251, base:"images/opt/ceo2-growth", w:[640,1280,2076], jpg:1280 },
  "images/dme.jpg": { l:3117, h:1969, base:"images/opt/dme", w:[640,1280,2400], jpg:1280 },
  "images/portrait-carre.jpg": { l:520, h:520, base:"images/opt/portrait-carre", w:[520], jpg:520 },
  "images/portrait-vertical.jpg": { l:700, h:933, base:"images/opt/portrait-vertical", w:[640,700], jpg:700 },
  "images/rsm.jpg": { l:560, h:536, base:"images/opt/rsm", w:[560], jpg:560 },
  "images/tem.jpg": { l:2614, h:2524, base:"images/opt/tem", w:[640,1280,2400], jpg:1280 },
  "images/xrd.jpg": { l:900, h:438, base:"images/opt/xrd", w:[640,900], jpg:900 },
};
