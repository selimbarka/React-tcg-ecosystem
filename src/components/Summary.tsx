import { copyCount, collectionValue, formatPrice, type Card } from "../domain/card";

type SummaryProps = {
  /** Cartes dont on calcule le résumé */
  cards: readonly Card[];
};

export function Summary({ cards }: SummaryProps) {
  return (
    <p className="summary">
      {cards.length} cartes · {copyCount(cards)} exemplaires · {formatPrice(collectionValue(cards))}
    </p>
  );
}
