import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { HttpError } from "../../api/http";
import { useChangeQuantity } from "../../api/mutations";
import { cardQueries } from "../../api/queries";
import { CardNotes } from "../../components/CardNotes";
import { CardTile } from "../../components/CardTile";
import { QuantityControl } from "../../components/QuantityControl";

export const Route = createFileRoute("/cards/$cardId")({
  loader: async ({ context: { queryClient }, params: { cardId } }) => {
    // Pas d'await : la liste (pour précédent/suivant) se charge en parallèle.
    void queryClient.prefetchQuery(cardQueries.list());
    try {
      await queryClient.ensureQueryData(cardQueries.detail(cardId));
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) throw notFound();
      throw error;
    }
  },
  notFoundComponent: () => <p className="hint">Cette carte n'existe pas.</p>,
  component: CardDetailPage,
});

function CardDetailPage() {
  const { cardId } = Route.useParams();
  const { data: card } = useSuspenseQuery(cardQueries.detail(cardId));
  const { data: cards = [] } = useQuery(cardQueries.list());
  const changeQuantity = useChangeQuantity();

  const index = cards.findIndex((c) => c.id === card.id);
  const previous = index > 0 ? cards[index - 1] : undefined;
  const next = index >= 0 ? cards[index + 1] : undefined;

  return (
    <div className="detail">
      <Link to="/">← Toute la collection</Link>

      <CardTile card={card}>
        <QuantityControl
          quantity={card.quantity}
          onChange={(delta) =>
            changeQuantity.mutate({ id: card.id, quantity: Math.max(0, card.quantity + delta) })
          }
        />
      </CardTile>
      {changeQuantity.isError && (
        <p className="error">Le serveur a refusé la modification : la quantité a été rétablie.</p>
      )}

      <CardNotes key={card.id} card={card} />

      <nav className="pager">
        {previous ? (
          <Link to="/cards/$cardId" params={{ cardId: previous.id }}>← {previous.name}</Link>
        ) : <span />}
        {next && (
          <Link to="/cards/$cardId" params={{ cardId: next.id }}>{next.name} →</Link>
        )}
      </nav>
    </div>
  );
}
