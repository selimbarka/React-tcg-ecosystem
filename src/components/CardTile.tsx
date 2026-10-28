import type { ReactNode } from "react";
import { formatPrice, isRare, type Card } from "../domain/card";
import { RarityBadge } from "./RarityBadge";
import { FavoriteButton } from "./FavoriteButton";

type CardTileProps = {
  /** Carte à afficher */
  card: Card;
  /** Carte actuellement sélectionnée */
  selected?: boolean;
  /** Actions affichées en bas de la tuile */
  children?: ReactNode;
};

export function CardTile({ card, selected = false, children }: CardTileProps) {
  return (
    <article className={`card-tile rarity-${card.rarity}${selected ? " is-selected" : ""}`}>
      <div className="actions">
        <h3>{card.name}</h3>
        <FavoriteButton cardId={card.id} />
      </div>
      <RarityBadge rarity={card.rarity} />
      <p className="meta">{card.set}</p>
      <p className="price">{formatPrice(card.price)}</p>
      {isRare(card) && <p className="highlight">★ Carte rare</p>}
      {card.quantity === 0 && <p className="sold-out">Plus aucun exemplaire</p>}
      {children && <div className="actions">{children}</div>}
    </article>
  );
}
