import { z } from "zod";

export const RARITIES = ["commune", "peu-commune", "rare", "ultra-rare"] as const;
export const SETS = ["Set de Base", "Jungle", "Fossile"] as const;

export type Rarity = (typeof RARITIES)[number];

export const CardSchema = z.object({
  id: z.string(),
  name: z.string(),
  set: z.string(),
  rarity: z.enum(RARITIES),
  price: z.number(),
  quantity: z.number(),
});

export type Card = z.infer<typeof CardSchema>;

export type NewCard = Omit<Card, "id">;

export type RarityFilter = Rarity | "toutes";

export const RARITY_LABELS = {
  commune: "Commune",
  "peu-commune": "Peu commune",
  rare: "Rare",
  "ultra-rare": "Ultra rare",
} satisfies Record<Rarity, string>;

const priceFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export function parseRarity(value: string): Rarity | undefined {
  return RARITIES.find((rarity) => rarity === value);
}

export function isRare(card: Pick<Card, "rarity">): boolean {
  switch (card.rarity) {
    case "commune":
    case "peu-commune":
      return false;
    case "rare":
    case "ultra-rare":
      return true;
    default: {
      const unreachable: never = card.rarity;
      return unreachable;
    }
  }
}

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export function copyCount(cards: readonly Pick<Card, "quantity">[]): number {
  return cards.reduce((sum, card) => sum + card.quantity, 0);
}

export function collectionValue(cards: readonly Pick<Card, "price" | "quantity">[]): number {
  return cards.reduce((sum, card) => sum + card.price * card.quantity, 0);
}
