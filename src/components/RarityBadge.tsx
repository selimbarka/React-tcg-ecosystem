import { RARITY_LABELS, type Rarity } from "../domain/card";

type RarityBadgeProps = {
  /** Rareté affichée, qui détermine la couleur du badge */
  rarity: Rarity;
  /** Texte du badge, par défaut le libellé de la rareté */
  label?: string;
};

export function RarityBadge({ rarity, label = RARITY_LABELS[rarity] }: RarityBadgeProps) {
  return <span className={`badge badge-${rarity}`}>{label}</span>;
}
