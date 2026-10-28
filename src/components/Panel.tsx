import type { ReactNode } from "react";

type PanelProps = {
  /** Titre affiché en haut du panneau */
  title: string;
  /** Contenu du panneau */
  children: ReactNode;
};

export function Panel({ title, children }: PanelProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
