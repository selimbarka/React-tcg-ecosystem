import { readFileSync } from "node:fs";
import { z } from "zod";
import { CardSchema } from "../src/domain/card.ts";

const file = process.argv[2] ?? "db.json";
const db = JSON.parse(readFileSync(file, "utf-8")) as { cards: unknown[] };

let rejected = 0;
for (const card of db.cards) {
  const result = CardSchema.safeParse(card);
  if (!result.success) {
    rejected++;
    console.log(`Carte refusée : ${JSON.stringify(card)}`);
    console.log(z.prettifyError(result.error));
  }
}

console.log(`${db.cards.length - rejected} / ${db.cards.length} carte(s) valide(s) dans ${file}`);
