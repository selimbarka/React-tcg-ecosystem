import { useEffect, useRef } from "react";
import { RARITIES, RARITY_LABELS, parseRarity, type RarityFilter } from "../domain/card";

type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  rarity: RarityFilter;
  onRarityChange: (rarity: RarityFilter) => void;
};

export function SearchBar({ query, onQueryChange, rarity, onRarityChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onQueryChange("");
      } else if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onQueryChange]);

  function handleClear() {
    onQueryChange("");
    inputRef.current?.focus();
  }

  return (
    <div className="toolbar" role="search">
      <label>
        Recherche
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleClear} disabled={query === ""}>
        Effacer
      </button>
      <label>
        Rareté
        <select
          value={rarity}
          onChange={(e) => onRarityChange(parseRarity(e.target.value) ?? "toutes")}
        >
          <option value="toutes">Toutes</option>
          {RARITIES.map((r) => <option key={r} value={r}>{RARITY_LABELS[r]}</option>)}
        </select>
      </label>
    </div>
  );
}
