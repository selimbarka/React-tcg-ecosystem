import { useState } from "react";
import type { Card } from "../domain/card";
import { Panel } from "./Panel";

type CardNotesProps = {
  /** Carte dont on édite les notes */
  card: Card;
};

export function CardNotes({ card }: CardNotesProps) {
  const [note, setNote] = useState("");
  return (
    <Panel title={`Notes : ${card.name}`}>
      <div className="details">
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        <p className="hint">{note.length} caractère(s), non enregistré.</p>
      </div>
    </Panel>
  );
}
