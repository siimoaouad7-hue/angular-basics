# MyMovies — Watchlist de films

TP Angular & TypeScript : une liste de films à regarder, mise à jour automatiquement grâce aux **signals**.

## Fonctionnalités

- Afficher la liste des films (titre, genre)
- Ajouter un film (le bouton **Add** est désactivé tant que le titre est vide)
- Marquer un film comme vu / pas vu
- Supprimer un film, ou vider toute la liste
- Compteur « X / Y watched » mis à jour automatiquement
- La liste est conservée après un rafraîchissement de la page

## Notions Angular utilisées

| Notion | Où dans le code | Rôle |
|---|---|---|
| `signal` | `movies` dans `app.ts` | Contient la liste et prévient Angular à chaque changement |
| `set` / `update` | `addMovie`, `deleteMovie`, `toggleWatched`, `clearAll` | Remplacent la liste par une nouvelle, pour que le signal détecte le changement |
| `computed` | `watchedCount` | Calcule le nombre de films vus, recalculé automatiquement |
| `effect` | `constructor` | Side effects : sauvegarde dans le `localStorage` et envoi de la liste à une API de test (JSONPlaceholder) |
| `@for` / `@empty` / `@if` | `app.html` | Affichage de la liste, message si elle est vide, bouton « Clear all » |
| `[(ngModel)]` | `app.html` | Liaison des champs du formulaire |
| `[disabled]`, `[class.watched]` | `app.html` | Liaisons de propriétés |

## Lancer le projet

```bash
npm install
ng serve
```

Puis ouvrir http://localhost:4200

Pour voir les `effect` : touche **F12** → onglet **Console** (réponse de l'API) et onglet **Application → Local Storage** (liste sauvegardée).

## Tests

```bash
ng test --watch=false
```
