import { useFavoritesStore } from "../stores/favorites";

type FavoriteButtonProps = {
  /** Identifiant de la carte à mettre en favori */
  cardId: string;
};

export function FavoriteButton({ cardId }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((s) => s.favoriteIds.includes(cardId));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <button
      type="button"
      className={`favorite${isFavorite ? " is-on" : ""}`}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      onClick={() => toggleFavorite(cardId)}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
