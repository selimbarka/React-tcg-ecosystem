import { Link } from "@tanstack/react-router";
import { useFavoritesStore } from "../stores/favorites";

export function FavoritesCount() {
  const count = useFavoritesStore((s) => s.favoriteIds.length);
  return (
    <Link to="/favorites" className="summary">
      ★ {count} favori{count > 1 ? "s" : ""}
    </Link>
  );
}
