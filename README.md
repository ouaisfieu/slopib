# ARG Mission Engine — Mobile-first consolidated

## But
Prototype client-only pour veille citoyenne : missions asynchrones, wallet local, pièces jointes, modération, anonymisation PII, éditeur Markdown, engagement responsable.

## Quickstart
1. Cloner le repo.
2. Lancer un serveur local: `npx http-server`.
3. Ouvrir `index.html` sur mobile/desktop.
4. Créer wallet, créer mission, tester claim, upload, modération, export anonymisé.

## Structure
Voir l'arborescence dans le README principal.

## Sécurité & confidentialité
- Clés privées restent locales.
- Exports publics passent par pipeline PII.
- Notifications opt-in, pause automatique pour attention.

## Contribuer
Fork → branch → PR. Respecter les principes d'accessibilité et d'engagement responsable (ENGAGEMENT.md).

```

---

## 6. Conseils d’itération et priorités

- **Phase 1 (immediate)** : déployer, tester wallet/signature, anonymisation export, atelier pilote.  
- **Phase 2 (1–3 mois)** : OCR pour pièces jointes (Tesseract.js), P2P optionnelle (Gun.js/Yjs), tests d’accessibilité approfondis.  
- **Phase 3 (3–12 mois)** : gouvernance formelle, rapports d’impact, API plugin pour la communauté.
