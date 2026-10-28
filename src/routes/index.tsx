import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { z } from "zod";
import { useChangeQuantity, useRemoveCard } from "../api/mutations";
import { cardQueries } from "../api/queries";
import { CardGrid } from "../components/CardGrid";
import { Panel } from "../components/Panel";
import { SearchBar } from "../components/SearchBar";
import { RARITIES } from "../domain/card";

const CollectionSearchSchema = z.object({
  q: z.string().default("").catch(""),
  rarity: z.union([z.literal("toutes"), z.enum(RARITIES)])
    .default("toutes").catch("toutes"),
});

const DEFAULT_SEARCH = CollectionSearchSchema.parse({});

export const Route = createFileRoute("/")({
  validateSearch: CollectionSearchSchema,
  search: { middlewares: [stripSearchParams(DEFAULT_SEARCH)] },
  loader: ({ context }) => context.queryClient.ensureQueryData(cardQueries.list()),
  component: CollectionPage,
});

function CollectionPage() {
  const { data: cards, isRefetchError } = useSuspenseQuery(cardQueries.list());
  const { q, rarity } = Route.useSearch();
  const navigate = Route.useNavigate();
  const changeQuantity = useChangeQuantity();
  const removeCard = useRemoveCard();

  const normalizedQuery = q.trim().toLowerCase();
  const visibleCards = cards.filter(
    (card) =>
      (card.name.toLowerCase().includes(normalizedQuery) ||
        card.set.toLowerCase().includes(normalizedQuery)) &&
      (rarity === "toutes" || card.rarity === rarity)
  );

  function handleQuantityChange(id: string, delta: number) {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    changeQuantity.mutate({ id, quantity: Math.max(0, card.quantity + delta) });
  }

  return (
    <>
      {isRefetchError && (
        <p className="error">Serveur injoignable : affichage des dernières données connues.</p>
      )}
      {changeQuantity.isError && (
        <p className="error">Le serveur a refusé la modification : la quantité a été rétablie.</p>
      )}
      {removeCard.isError && (
        <p className="error">Le serveur a refusé la suppression : la carte a été conservée.</p>
      )}

      <Panel title={`Mes cartes (${visibleCards.length} / ${cards.length})`}>
        <SearchBar
          query={q}
          onQueryChange={(next) =>
            navigate({ search: (prev) => ({ ...prev, q: next }), replace: true })
          }
          rarity={rarity}
          onRarityChange={(next) =>
            navigate({ search: (prev) => ({ ...prev, rarity: next }), replace: false })
          }
        />
        <CardGrid
          cards={visibleCards}
          onQuantityChange={handleQuantityChange}
          onRemove={(id) => removeCard.mutate(id)}
        />
      </Panel>
    </>
  );
}
