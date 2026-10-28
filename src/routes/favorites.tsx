import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { cardQueries } from "../api/queries";
import { CardTile } from "../components/CardTile";
import { Panel } from "../components/Panel";
import { useFavoritesStore } from "../stores/favorites";

export const Route = createFileRoute("/favorites")({
  loader: ({ context }) => context.queryClient.ensureQueryData(cardQueries.list()),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { data: cards } = useSuspenseQuery(cardQueries.list());
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const favorites = cards.filter((card) => favoriteIds.includes(card.id));

  return (
    <Panel title={`Mes favoris (${favorites.length})`}>
      {favorites.length === 0 ? (
        <p className="hint">Aucune carte en favori.</p>
      ) : (
        <div className="grid">
          {favorites.map((card) => (
            <CardTile key={card.id} card={card}>
              <Link to="/cards/$cardId" params={{ cardId: card.id }} className="button">
                Détails
              </Link>
            </CardTile>
          ))}
        </div>
      )}
    </Panel>
  );
}
