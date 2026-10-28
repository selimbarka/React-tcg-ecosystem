import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";

export function Pending() {
  return <p className="hint">Chargement…</p>;
}

export function RouteError({ error }: ErrorComponentProps) {
  const router = useRouter();
  const message = error instanceof Error ? error.message : String(error);
  return (
    <div>
      <p className="error">Erreur : {message}</p>
      <button type="button" onClick={() => router.invalidate()}>Réessayer</button>
    </div>
  );
}
