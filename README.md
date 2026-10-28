# Ma collection TCG - TP Module 3

Application React de gestion d'une collection de cartes TCG, reprise du module 2 avec les librairies de l'écosystème React.

Stack : Vite 8, React 19 (React Compiler), TypeScript 6, Zod 4, TanStack Query 5, TanStack Router 1, Zustand 5.

## Lancer le projet

```
npm install
npm run db:reset
npm run api
npm run dev
```

`npm run api` et `npm run dev` se lancent dans deux terminaux séparés.

## Scripts

- `npm run api` : lance json-server sur le port 3001
- `npm run dev` : lance Vite (les requêtes `/api` sont relayées vers json-server)
- `npm run db:reset` : remet `db.json` à son état d'origine
- `npm run typecheck` : vérifie les types
- `npm run lint` : lance ESLint
- `npm run build` : build de production
- `npx tsx scripts/check-db.ts [fichier]` : vérifie les cartes d'un fichier JSON avec le schéma Zod

## Fonctionnalités

- Validation des réponses de l'API avec Zod
- Lecture et cache des données avec TanStack Query
- Ajout, suppression et modification enregistrés sur le serveur (quantité en mise à jour optimiste)
- Une URL par écran : `/`, `/cards/new`, `/cards/$cardId`, `/favorites`
- Recherche et filtre de rareté conservés dans l'URL
- Préchargement des données au survol des liens
- Favoris dans un store Zustand persistant (localStorage)

## Structure

```
src/
  api/         client HTTP, requêtes et mutations
  components/  composants d'affichage
  domain/      schéma et fonctions métier des cartes
  routes/      pages de l'application
  stores/      store Zustand des favoris
scripts/       script de vérification de la base
```
