import { Link } from "@tanstack/react-router";
import type { Card } from "../domain/card";
import { CardTile } from "./CardTile";
import { QuantityControl } from "./QuantityControl";

type CardGridProps = {
  /** Cartes à afficher */
  cards: readonly Card[];
  /** Appelé quand on change la quantité d'une carte */
  onQuantityChange: (id: string, delta: number) => void;
  /** Appelé quand on retire une carte */
  onRemove: (id: string) => void;
};

export function CardGrid({ cards, onQuantityChange, onRemove }: CardGridProps) {
  if (cards.length === 0) {
    return <p className="hint">Aucune carte à afficher.</p>;
  }
  return (
    <div className="grid">
      {cards.map((card) => (
        <CardTile key={card.id} card={card}>
          <QuantityControl
            quantity={card.quantity}
            onChange={(delta) => onQuantityChange(card.id, delta)}
          />
          <Link to="/cards/$cardId" params={{ cardId: card.id }} className="button">
            Détails
          </Link>
          <button type="button" onClick={() => onRemove(card.id)}>Retirer</button>
        </CardTile>
      ))}
    </div>
  );
}
